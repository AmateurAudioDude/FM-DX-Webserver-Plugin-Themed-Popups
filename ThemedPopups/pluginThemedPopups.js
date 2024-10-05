/*
    Themed Popups v1.1.1 by AAD
    https://github.com/AmateurAudioDude
*/

//////////////////////////////////////////////////

const isClickedOutsidePopup = true; // Closes popup when clicked outside

//////////////////////////////////////////////////

// Global variables for other plugins
pluginThemedPopup = true;

var styleElement = document.createElement('style');
var cssCodeThemedPopups = `
/* Themed Popups CSS */
.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-2); /* Background */
    color: var(--color-main-bright); /* Text */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    opacity: 0;
    transition: opacity 0.3s ease-in;
    z-index: 9999;
}

.popup-content {
    text-align: center;
}

.popup button {
    margin-top: 10px;
}

.popup.open {
    opacity: .99;
}
`;
styleElement.appendChild(document.createTextNode(cssCodeThemedPopups));
document.head.appendChild(styleElement);

// Function to create the alert popup
function alert(popupMessage, popupButton) {
    if (typeof popupButton === 'undefined') {
        popupButton = 'OK';
    }
    if (!popupOpened) { // Check if a popup is not already open
        popup = document.createElement('div');
        popup.classList.add('popup');
        popup.innerHTML = `<div class="popup-content">${popupMessage.replace(/\n/g, '<br>')}<button id="popup-close">${popupButton}</button></div>`;
        document.body.appendChild(popup);

        var closeButton = popup.querySelector('#popup-close');
        closeButton.addEventListener('click', closePopup);

        popup.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent event propagation
        });

        // Trigger the fade-in effect
        setTimeout(function() {
            popup.classList.add('open');
            popupOpened = true; // Set popupOpened flag to true
            blurBackground(true);
        }, 10);
    }
}

// Function to create the confirm popup
function confirm(popupMessage) {
    return new Promise(function(resolve, reject) {
        var popupOpened = false; // Local variable to track popup state
        var popup; // Declare popup variable outside if block

        function closePopup(event) {
            if (popupOpened) {
                popupOpened = false; // Set popupOpened flag to false
                popup.classList.remove('open'); // Fade out
                setTimeout(function() {
                    popup.remove();
                }, 300); // Remove after fade-out transition
            }
        }

        if (!popupOpened) { // Check if a popup is not already open
            popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <div class="popup-content">${popupMessage.replace(/\n/g, '<br>')}
                    <button id="popup-confirm">OK</button>
                    <button id="popup-cancel">Cancel</button>
                </div>`;
            document.body.appendChild(popup);

            var confirmButton = popup.querySelector('#popup-confirm');
            var cancelButton = popup.querySelector('#popup-cancel');

            confirmButton.addEventListener('click', function() {
                closePopup();
                resolve(true); // Resolve the promise with true (OK clicked)
            });

            cancelButton.addEventListener('click', function() {
                closePopup();
                resolve(false); // Resolve the promise with false (Cancel clicked)
            });

            // Event listener for ESC key
            function handleEscKey(event) {
                if (event.key === 'Escape' && popupOpened) {
                    event.preventDefault(); // Prevent default behavior (e.g., closing alert)
                    closePopup();
                    resolve(false); // Resolve with false if ESC key pressed (cancel behavior)
                    document.removeEventListener('keydown', handleEscKey); // Remove event listener after use
                }
            }

            // Add ESC key event listener
            document.addEventListener('keydown', handleEscKey);

            popup.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent event propagation
            });

            // Trigger the fade-in effect
            setTimeout(function() {
                popup.classList.add('open');
                popupOpened = true; // Set popupOpened flag to true
            }, 10);
        }
    });
}

// Function to create the prompt popup
function prompt(popupMessage, defaultValue) {
        if (popupOpened) { // Exit if a popup is already open
            return;
        }
    return new Promise(function(resolve, reject) {
        if (popupPromptOpened) { // Exit if a prompt popup is already open
            return;
        }
        var popupOpened = false; // Local variable to track popup state
        var popup; // Declare popup variable outside if block

        blurBackground(true);

        function closePopup(event) {
            if (popupOpened) {
                popupOpened = false; // Set popupOpened flag to false
                popup.classList.remove('open'); // Fade out
                setTimeout(function() {
                    popup.remove();
                }, 300); // Remove after fade-out transition
            }
        }

        if (!popupOpened) { // Check if a popup is not already open
            popup = document.createElement('div');
            popup.classList.add('popup');
            popup.innerHTML = `
                <div class="popup-content">${popupMessage.replace(/\n/g, '<br>')}<br><input type="text" id="popup-input" style="padding-left: 10px; padding-right: 10px" value="${defaultValue || ''}">
                    <button id="popup-confirm">OK</button>
                    <button id="popup-cancel">Cancel</button>
                </div>`;
            document.body.appendChild(popup);

            var inputField = popup.querySelector('#popup-input');
            var confirmButton = popup.querySelector('#popup-confirm');
            var cancelButton = popup.querySelector('#popup-cancel');

            // Automatic focus
            inputField.focus();
            popupPromptOpened = true;

            confirmButton.addEventListener('click', function() {
                var value = inputField.value;
                closePopup();
                resolve(value); // Resolve the promise with the input value
                popupPromptOpened = false;
                setTimeout(function() {
                    blurBackground(false);
                }, 3);
            });

            cancelButton.addEventListener('click', function() {
                closePopup();
                resolve(null); // Resolve with null if cancelled
                popupPromptOpened = false;
                blurBackground(false);
            });

            // Event listener for ESC key
            function handleEscKey(event) {
                if (event.key === 'Escape' && popupOpened) {
                    event.preventDefault(); // Prevent default behavior (e.g., closing alert)
                    closePopup();
                    resolve(null); // Resolve with null if ESC key pressed
                    popupPromptOpened = false;
                    blurBackground(false);
                    document.removeEventListener('keydown', handleEscKey); // Remove event listener after use
                }
            }

            // Add ESC key event listener
            document.addEventListener('keydown', handleEscKey);

            // Event listener for Enter key on input field
            inputField.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    var value = inputField.value;
                    closePopup();
                    resolve(value); // Resolve the promise with the input value
                    popupPromptOpened = false;
                    blurBackground(false);
                }
            });

            popup.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent event propagation
            });

            // Trigger the fade-in effect
            setTimeout(function() {
                popup.classList.add('open');
                popupOpened = true; // Set popupOpened flag to true
            }, 10);
        }
    });
}

function blurBackground(status) {
    // Blur background
    if (status === true) {
      if (idModal) {
          idModal.style.display = 'block';
        setTimeout(function() {
          idModal.style.opacity = '1';
        }, 40);
      }
    } else {
      // Restore background
      if (idModal) {
        setTimeout(function() {
          idModal.style.display = 'none';
        }, 400);
          idModal.style.opacity = '0';
      }
    }
}

// Global variables for popup state
var popupOpened = false;
var popup;

var popupPromptOpened = false;
var idModal = document.getElementById('myModal');

// Function to close the popup
function closePopup(event) {
    event.stopPropagation(); // Prevent event propagation
    popupOpened = false; // Set popupOpened flag to false
    popup.classList.remove('open'); // Fade out
    setTimeout(function() {
        popup.remove();
        blurBackground(false);
    }, 300); // Remove after fade-out transition
}

// Event listener for ESC key to close popup
document.addEventListener('keydown', function(event) {
    if (popupOpened && (event.key === 'Escape' || event.key === 'Enter')) {
        closePopup(event);
        blurBackground(false);
    }
});

if (isClickedOutsidePopup) {
  // Event listener for clicks outside the popup to close it
  document.addEventListener('click', function(event) {
      if (popupOpened && !popup.contains(event.target)) {
          closePopup(event);
          blurBackground(false);
      }
  });
}

/*

// Alert example
alert('Alert!');
alert('Alert!', 'Close');


// Confirm example
(async function() {
    if (await confirm("Press a button")) {
        alert('OK');
    } else {
        alert('Cancel');
    }
})();


// Prompt example
(async function() {
    let userInput = await prompt('Enter text:', 'Sample text');
    if (userInput !== null) {
        alert(`Text: ${userInput}`);
    } else {
        alert('Cancel');
    }
})();

*/
