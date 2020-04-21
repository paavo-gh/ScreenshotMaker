# ScreenshotMaker

Tool for generating app store screenshots with localized text and image overlays.

![Image](/README_img.png)

All screenshots are defined in `content.json`. Each screenshot takes an HTML template, and a list of images and localizable pieces of text to be injected into elements with matching `class` names in the HTML template.

## Example

In content.json:
```
{
   "content": [
      {
         "resolutions": [
            [ 1242, 2688 ]
         ],
         "screenshots": [
            {
               "template": "Template.html",
                "images":{
                    "phonescreen":"Screenshot1.png"
                },
               "localized": {
                  "line1": "screenshot1_line"
               }
            }
         ]
      }
   ]
}
```

localized.json:
```
{
    "en": {
        "screenshot1_line": "English Title"
    }
}
```

Template.html:
```
<div class="phonescreen"></div>
<div class="line">Placeholder Title</div>
```

Result when generating "screenshot_en_1242x2688.png"
```
<div class="phonescreen" style="background-image: url(Screenshot1.png)"></div>
<div class="line">English Title</div>
```

## Install

On top of Node.js, install Puppeteer: `npm i puppeteer`
To run: `node app.js ExampleFrame`

## Other Features

### Localized Images

Use localized images with `{lang}`-tag which gets replaced by the language code you specify in `localized.json`
```
    "images": {
       "phonescreen":"Screenshot1_{lang}.png"
    },
```

### Presets

Presets allow defining attributes in one place and using them in multiple screenshots.
With presets the first example could be written as follows:

```
{
   "presets": {
      "screenshot1": {
         "images":{
             "phonescreen":"Screenshot1.png"
         },
         "localized": {
             "line1": "screenshot1_line"
         }
      }
   },
   "content": [
      {
         "resolutions": [
            [ 1242, 2688 ]
         ],
         "screenshots": [
            {
               "template": "Template.html",
               "preset": "screenshot1"
            }
         ]
      }
   ]
}
```

### Customize any CSS

Modify any CSS value in `content.json`
```
"screenshots": [
    {
        "style": {
            "fill": {
                "text1":"yellow"
            },
            "fontFamily": {
                "text1":"Impact,sans-serif",
                "text2":"Impact,sans-serif"
            },
            "backgroundSize": {
                "phonescreen":"cover"
            }
        },
        ...
    }
```