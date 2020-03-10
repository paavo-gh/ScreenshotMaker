const puppeteer = require('puppeteer');
const path = require('path');

const languages = require('./localized.json');
const content = require('./content.json');

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
        await page.goto(`file://${path.join(__dirname, data.screenshots[index].template)}`);

        // Languages
        for (let langCode in languages) {
        
          // Change the template
          await page.evaluate((screenshot, localizedText) => {

            // Localize
            for (let textClass in screenshot.localized) {
              Array.from(document.getElementsByClassName(textClass))
                .forEach(el => el.textContent = localizedText[screenshot.localized[textClass]]);
            }
            
            // Set images
            for (let imageClass in screenshot.images) {
              Array.from(document.getElementsByClassName(imageClass))
                .forEach(el => el.style.backgroundImage = `url(${screenshot.images[imageClass]})`);
            }
          
          }, data.screenshots[index], languages[langCode]);

          // Save screenshot
          await page.screenshot({path: `screenshot_${langCode}_${resolution[0]}x${resolution[1]}_${parseInt(index)+1}.png`});
        }
      }
    }
  }

  await browser.close();
})();