# Changelog for POMjs
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4] - 2023-07-25

### Added
- Added Slovenian (sl) translation (#6); thank you Gregor Godler
- Added missing Hungarian (hu) translation (#5) in meta description

### Changed
- Some minor typeface (font) changes to play better with iOS/macOS browsers
- Some minor UI changes to make password strength indicator more clear

## [1.1.3] - 2023-06-05

### Added
- Added Hungarian (hu) translation (#5); thank you Mihaly Balassy

## [1.1.2] - 2023-02-21

### Added
- Added Luxembourgish (lb) translation (#2); thank you Alain Fontaine
- Added French (fr) translation (#3); thank you Alain Fontaine
- Added Finnish (fi) translation (PR#3); thank you Thomas Raehalme

## [1.1.1] - 2023-01-23

### Added
- Added Dutch translation (#1); thank you Jeroen van de Leur

## [1.1.0] - 2022-10-24

### Changed
- Moved loading of the javascript file to `<head>` with `defer` attribute to be more adherent to standards.

### Added
- Added `CHANGELOG.md` :blush:
- Added links to "demo" sites using POMjs
- Added `autofocus` attribute to password generation `button`, this allows <kbd>Space></kbd> and <kbd>Enter</kbd> keys to be used to immediately generate passwords.
- Added HTML "outline" to the password generation button when it has focus to make it more obvious that is has focus
- Added automatic password generation (configurable) when parameters are changed, default is enabled.

### Removed
- Removed incorrect debug output (it would be logged even if debugging was disabled)

## [1.0.0] - 2022-10-21
- Initial release
