# Themed Popups plugin for FM-DX Webserver

This plugin uses the website's theme for JavaScript functions `alert()`, `confirm()`, and `prompt()`.

* [Download the latest zip file](https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Themed-Popups/archive/refs/heads/main.zip)
* Transfer `ThemedPopups` folder, and `ThemedPopups.js` to FM-DX-Webserver `plugins` folder
* Restart FM-DX Webserver if required
* Login to Adminstrator Panel and enable plugin

## Formatting

`alert()`, `confirm()`, and `prompt()` are all compatible with both the plugin and browsers' native functions when used as demonstrated in `pluginThemedPopups.js`.

v1.1.1
------
* Added option to close popup when clicked outside

v1.1.0
------
* Use blurred background
* Use input focus for prompt popup
* Fixed no additional prompt popups if already open
* Check if Enter key is pressed

v1.0.0
------
* Public release
