[![License](https://img.shields.io/badge/License-GPL_v2-blue.svg?style=flat-square)](LICENSE)
[![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://en.wikipedia.org/wiki/JavaScript)

# POMjs

**POMjs** is a random password generator in HTML and pure Javascript. It can be customized by modifying the sources. There's really nothing magic going on here, but it works and is somewhat responsive. The goal was to make something small, useful, and reasonably free from dependencies.

## Parts

**POMjs** uses a "minified" version of [normalize.css](https://necolas.github.io/normalize.css) to reset the DOM to reasonable settings :blush:

**POMjs** includes no externally loaded resources and contains no tracking code or cookie management.

## Installation

Download the distribution or clone the repo. Files and folders should be placed in your web root, or another folder accessible to your web server. All references to `CSS` and `Javascript` use relative paths.

There may be references to "Öppet Moln" ("Open Cloud"), which is a Swedish site run by the author of **POMjs**, [oppetmoln.se](https://oppetmoln.se), to promote open source solutions for general use. You can, of course, delete such references.

I'd appreciate a mention on whatever website you use this one, and a link to the original repo, but it's not required.

## Usage

* From a visitor perspective, simply enable the desired string sequences, and possibly adjust the password length. Click on the <kbd>Enter</kbd> button or use the <kbd>Enter</kbd> key when the button has focus.
* The generated password is displayed at the bottom of the box, along with a strength indicator.
* The slider can also be used to change the number of characters in the generated password, as can the input field to the right of the slider.
* The HTML should have proper `tabindex` attributes for easier keyboard navigation.
* To copy the generated password to the clipboard, click on the password.
* "Dark mode" (browser setting) should be honored.

## Changes

Please see [CHANGELOG.md](CHANGELOG.md) for a list of changes.

## Customization

The original Javascript source is in `password-om.js`. The `index.html` file includes `password-om.min.js`. So I suggest you make your customizations in the "unminified" .js file and then create a new `password-om.min.js` file. If you do not have access to a "minification tool", you can simply copy an "unminified" version of `password-om.js` to `password-om.min.js`, it's really not that big of a difference.

Most parameters/settings can be changed in the `.js` file.

### Variables (in .js file)

| Name                      | Default              | Comment                                    |
| ------------------------- | -------------------- | ------------------------------------------ |
| POM_strUppercase          | Auto-generated A-Z   | Change if needed, used by default          |
| POM_strLowercase          | Auto-generated a-z   | Change if needed, used by default          |
| POM_strDigits             | Auto-generated 0-9   | Change if needed, used by default          |
| POM_strSpecialOne         | -.\_#$@%!            | Change if needed, used by default          |
| POM_strSpecialTwo         | "+(){}[]?&,\*<>\|:;^ | Change if needed, **not** used by default  |
| POM_strUppercase_Default  | true                 | Enables POM_strUppercase by default        |
| POM_strLowercase_Default  | true                 | Enables POM_strLowercase by default        |
| POM_strDigits_Default     | true                 | Enables POM_strDigits by default           |
| POM_strSpecialOne_Default | true                 | Enables POM_strSpecialOne by default       |
| POM_strSpecialTwo_Default | **false**            | Enables POM_strSpecialTwo by default       |
| POM_mkPasswordOnLoad      | true                 | Generate password on first page load       |
| POM_changeIsClick         | true                 | Generate password when parameters are changed |
| POM_minLength             | 16                   | Minimum (and default) password length      |
| POM_maxLength             | 256                  | Maxmium password length                    |
| POM_sliderStep            | 8                    | 1 - ..                                     |
| POM_debug                 | false                | Emit "debug" output with console.log()     |

### CSS

Most of the styling is done via CSS. I have tried to make it reasonably responsive, and I have tested with it with various browsers.

Please note that `index.html` makes use of `password-om.min.css` by default. 

### Translation

The (very) few strings can be translated. The distribution contains strings in English (default), Swedish, German, Dutch, Finnish, French, and Luxembourgish. The code attempts to guess the language from the **navigator.language** properties. If they do not exist, or cannot be interpreted, the fallback language used is English.

The "string setup" is done in the `POM_initialSetup()` function.

If you would like to contribute to the translation, please open an issue and post the language and the translated strings, please include how/if you would like to be mentioned in the credits.

## Credits

Thanks to **Peter Hampf** (hello `O/T-Track` :metal:) for the German translation :blush:
Thanks to **Jeroen van de Leur** for the Dutch translation :blush:
Thanks to **Alain Fontaine** for the French and Luxembourgish translations :blush:
Thanks to **Thomas Raehalme** for the Finnish translations :blush:
Thanks to **Mihaly Balassy** for the Hungarian translations :blush:
Thanks to **Gregor Godler** for the Slovenian translations :blush:
Thanks for **Sarah Bailey** for assistance in "debugging" use on iOS/macOS :blush:

The "cloud icon" comes from [Streamline](https://streamlinehq.com)

**POMjs** was written by Joaquim Homrighausen while converting caffeine into code :coffee:

## License

**POMjs** is licensed under the GPLv2 license. See the [`LICENSE`](LICENSE) file for more details.

Copyright 2022, 2023 Joaquim Homrighausen.

### Demo

You can see POMjs in action, and more or less unmodified, on the following links:

* Öppet Moln ("Open Cloud"); [password.oppetmoln.se](https://password.oppetmoln.se)
* WebbPlatsen i Sverige AB; [password.webbplatsen.se](https://password.webbplatsen.se)

### External references

These links are not here for any sort of endorsement or marketing, they're purely for informational purposes :sunglasses:

* WebbPlatsen; [webbplatsen.se](https://webbplatsen.se)
* Öppet Moln ("Open Cloud"); [oppetmoln.se](https://oppetmoln.se)
* me; [joho.se](https://joho.se) and [github.com/joho1968](https://github.com/joho1968)
* POMjs repo; [github.com/joho1968/POMjs](https://github.com/joho1968/POMjs)
* normalize.css repo; [github.com/necolas/normalize.css](https://github.com/necolas/normalize.css)
* Streamline, Icons and Illustrations; [streamlinehq.com](https://streamlinehq.com)
