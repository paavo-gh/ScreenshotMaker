# ScreenshotMaker

Tool for generating app store screenshots with localized text and image overlays.

All screenshots are defined in `content.json`. Each screenshot takes an HTML template, and a list of images and localizable pieces of text to be injected into elements with matching `class` names in the HTML template.

## Example

In content.json:
```
{
    "resolutions":[
        [ 2048, 2732 ], ...
    ],
    "screenshots":[
        {
            "template":"template1.html",
            "images":{
                "overlay1":"Screenshot1.png"
            },
            "localized":{
                "titleText":"title1"
            }
        },
        ...
    ]
}
```

localized.json:
```
{
    "en": {
        "title1": "English Title"
    }
}
```

template.html:
```
<div class="overlay1"></div>
<div class="titleText">Placeholder Title</div>
```

Result when generating "screenshot_en_2048x2732.png"
```
<div class="overlay1" style="background-image: url(Screenshot1.png)"></div>
<div class="titleText">English Title</div>
```

## Other

Modify any CSS value in `content.json`
```
"screenshots":[
    {
        "style":{
            "fill":{
                "text1":"yellow"
            },
            "fontFamily":{
                "text1":"Impact,sans-serif",
                "text2":"Impact,sans-serif"
            },
            "backgroundSize":{
                "overlay1":"cover"
            }
        },
        ...
    }
```

## Install

On top of Node.js, install Puppeteer: `npm i puppeteer`
To run: `node app.js`
