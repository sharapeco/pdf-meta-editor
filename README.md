# PDF Meta Editor

<p align="center">
  <img alt="" src="electron/resources/iconset/256x256.png" width="256" height="256">
</p>

A simple GUI editor for PDF metadata using [ExifTool](https://exiftool.org/).

![Screenshot](docs/images/screenshot.jpg)

## Getting Started

This editor requires ExifTool. You can install ExifTool with some package managers.

```shell-session
# Ubuntu, etc.
sudo apt install exiftool

# macOS
brew install exiftool

# Windows
choco install exiftool
```

To build, it uses npm, just type following command.

```shell-session
npm run build
```

## Development

```shell-session
npm run dev
```
