/*\
title: $:/plugins/flancast90/speech-to-text/modules/startup/speech-to-text.js
type: application/javascript
module-type: startup

Speech to Text handling

\*/
(function() {

    /*jslint node: true, browser: true */
    /*global $tw: false */
    "use strict";

    // Export name and synchronous status
    exports.name = "speech-to-text";
    exports.platforms = ["browser"];
    exports.after = ["startup"];
    exports.synchronous = true;

    // these functions will execute on startup
    exports.startup = function() {
        // global variable declarations
        var selectedText = "";
        
        // handle arbitrarily large blocks of text, which can cause the API
        // to fail.
        function handle_long_datum(input) {
	        var shortened_text = input.innerHTML.split(' ');
                for (var i = 0; i < shortened_text.length; i++) {
    	            var msg = new SpeechSynthesisUtterance(shortened_text[i]);
		            window.speechSynthesis.speak(msg);
                }
        }

        
        // listen for Alt+Shift+L
        document.addEventListener('keyup', function(e) {
            if ((e.altKey) && (e.shiftKey) && (e.which == 76)) {
                // get current highlighted portion
                if (window.getSelection) {
                    selectedText = window.getSelection();
                }
                // document.getSelection
                else if (document.getSelection) {
                    selectedText = document.getSelection();
                }
                // document.selection
                else if (document.selection) {
                    selectedText = document.selection.createRange().text;
                }

                // determine whether text needs to be split into manageable text blocks
                // or not. 1428 is the charcount that the API breaks at.
                if (selectedText.length >= 1428) {
                    handle_long_datum(selectedText);
                } else {
                    text_to_speech(selectedText);
                }

            }
        });


        // use the web text to speech api to read
        // the selected area, taking the selected area as an arg
        function text_to_speech(to_speech) {
            var msg = new SpeechSynthesisUtterance(to_speech);
            window.speechSynthesis.speak(msg);
        }
    };

})();
