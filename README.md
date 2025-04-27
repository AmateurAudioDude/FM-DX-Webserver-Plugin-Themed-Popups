# Themed Popups plugin for FM-DX Webserver

This plugin uses the website's theme for JavaScript functions `alert()`, `confirm()`, and `prompt()`.

* [Download the latest zip file](https://github.com/AmateurAudioDude/FM-DX-Webserver-Plugin-Themed-Popups/archive/refs/heads/main.zip)
* Transfer `ThemedPopups` folder, and `ThemedPopups.js` to FM-DX-Webserver `plugins` folder
* Restart FM-DX Webserver if required
* Login to Adminstrator Panel and enable plugin

## Formatting

### How to use in plugins:

By default, `alert` dialogs are safely overridden.

To safely make use of `confirm` and `prompt` dialogs, here's an example of each:

```
// Confirm example
if (window.hasCustomPopup) {
    confirmAsync("Press a button");
} else {
    confirm("Press a button");
}
```

```
// Prompt example
if (window.hasCustomPopup) {
    promptAsync('Enter text:', 'Sample text');
} else {
    prompt('Enter text:', 'Sample text');
}
```

v1.1.3
------
* Popup is scrollable if browser's viewport is too small

v1.1.2
------
* Fix for FM-DX Webserver v1.3.4 compatibility issues

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
