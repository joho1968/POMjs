# Changelog for POMjs
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
