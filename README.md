# ScreenshotMaker

Tool for generating app store screenshots with localized text and image overlays.

![Image](/README_img.png)

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
            "template":"TemplateTablet.html",
            "images":{
                "phonescreen":"Screenshot1.png"
            },
            "localized":{
                "line":"screenshot1_line"
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
        "screenshot1_line": "English Title"
    }
}
```

template.html:
```
<div class="phonescreen"></div>
<div class="line">Placeholder Title</div>
```

Result when generating "screenshot_en_2048x2732.png"
```
<div class="phonescreen" style="background-image: url(Screenshot1.png)"></div>
<div class="line">English Title</div>
```

## Install

On top of Node.js, install Puppeteer: `npm i puppeteer`
To run: `node app.js ExampleFrame`

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
                "phonescreen":"cover"
            }
        },
        ...
    }
```