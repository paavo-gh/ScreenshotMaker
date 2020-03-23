const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs')

var rootDir = process.argv[2];
if (rootDir === undefined)
{
  console.log('Usage: node app.js directory-name');
  process.exit();
}

function getFile(fileName)
{
  var filePath = path.resolve(rootDir, fileName);
  if (fs.existsSync(filePath))
    return filePath;
  console.log('File does not exist: ' + filePath);
  process.exit();
}

const languages = require(getFile('localized.json'));
const content = require(getFile('content.json'));

var saveDir = path.join(rootDir, 'Screenshots');
if (!fs.existsSync(saveDir))
  fs.mkdirSync(saveDir);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Resolution sets (aspect ratios)
  for (let data of content) {

    // Resolutions
    for (let resolution of data.resolutions) {
      
      await page.setViewport({width: resolution[0], height: resolution[1]});

      // Screenshots
      for (let index in data.screenshots) {
        await page.goto(`file://${getFile(data.screenshots[index].template)}`);

        // Languages
        for (let langCode in languages) {
        
          // Change the template
          await page.evaluate((screenshot, localizedText, langCode) => {

            // Localize
            for (let textClass in screenshot.localized) {
              for (let el of document.getElementsByClassName(textClass))
                el.textContent = localizedText[screenshot.localized[textClass]];
            }
            
            // Set images
            for (let imageClass in screenshot.images) {
              for (let el of document.getElementsByClassName(imageClass))
                el.style.backgroundImage = `url(${screenshot.images[imageClass]})`.replace('{lang}', langCode);
            }

            // Set custom style attributes
            for (let styleName in screenshot.style) {
              for (let elementClass in screenshot.style[styleName]) {
                for (let el of document.getElementsByClassName(elementClass))
                  el.style[styleName] = screenshot.style[styleName][elementClass];
              }
            }
          
          }, data.screenshots[index], languages[langCode], langCode);

          // Save screenshot
          var fileName = path.join(saveDir, `screenshot_${langCode}_${resolution[0]}x${resolution[1]}_${parseInt(index)+1}.png`);
          console.log('Saving ' + fileName);
          await page.screenshot({path: fileName});
        }
      }
    }
  }

  await browser.close();
})();