/*!
 * DOM Ready v1.0.5
 * https://github.com/noordawod/dom-ready
 *
 * Copyright (C) 2013-2014 Noor Dawod.
 * All rights reserved.
 *
 * Released under the MIT license
 * http://en.wikipedia.org/wiki/MIT_License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

;var domReady = (function(window, FALSE) {
  'use strict';

  var DOCUMENT = 'document',
      ELEMENT = 'Element',
      DOSCROLL = 'doScroll',
      CALL = 'call',
      DOMCONTENTLOADED = 'DOMContentLoaded',
      ONREADYSTATECHANGE = 'onreadystatechange',
      LOAD = 'load',
      ONLOAD = 'on' + LOAD,
      ADDEVENTLISTENER = 'addEventListener',
      REMOVEEVENTLISTENER = 'removeEventListener',
      ATTACHEVENT = 'attachEvent',
      DETACHEVENT = 'detachEvent',

      document = window[DOCUMENT],
      domReady = FALSE,
      windowOnLoad,
      callbacksList = [],

      // Fire the callbacks that were queued.
      fireCallbacks = function(callback) {
        if(!domReady) {
          domReady = !FALSE;

          // Update the document, just in case.
          document = window[DOCUMENT];

          // Call old onload handler for old browsers.
          if('function' === typeof windowOnLoad)
            windowOnLoad = windowOnLoad[CALL](window, document, window);

          // Call the list of callbacks, each in its own scope.
          // If a callback returns FALSE, stop firing the rest of the callbacks.
          while(FALSE !== windowOnLoad && !!(callback = callbacksList.shift()))
            windowOnLoad = callback[0][CALL](callback[1], document, window);

          // GC.
          callbacksList = null;
        }
      },

      // Trick by Diego Perini
      // http://javascript.nwbox.com/IEContentLoaded/
      tryScroll = function() {
        if(!domReady)
          try {
            document[DOCUMENT + ELEMENT][DOSCROLL]('left');
            fireCallbacks();
          } catch (e) {
            setTimeout(tryScroll, 50);
          }
      },

      // Main handler.
      handler = function(callback) {
        if(domReady)
          // DOM already ran once; just run the callback immediately.
          callback[CALL](this);
        else {
          // When first handler is added, attach the cross-browser DOM ready handler.
          if(!callbacksList.length)
            // Mature browsers.
            if(document[ADDEVENTLISTENER])
              document[ADDEVENTLISTENER](DOMCONTENTLOADED, function() {
                document[REMOVEEVENTLISTENER](DOMCONTENTLOADED, handler, FALSE);
                fireCallbacks();
              }, FALSE);

            // Internet Explorer.
            else if(document[ATTACHEVENT]) {
              // IE supports onreadystatechange event.
              document[ATTACHEVENT](ONREADYSTATECHANGE, function() {
                if('complete' === document.readyState) {
                  document[DETACHEVENT](ONREADYSTATECHANGE, handler);
                  fireCallbacks();
                }
              });

              // Very reliable when not inside a frame.
              if(document[DOCUMENT + ELEMENT][DOSCROLL] && window === window.top)
                tryScroll();

            // Old browsers.
            } else if(window[ADDEVENTLISTENER])
              window[ADDEVENTLISTENER](LOAD, function() {
                window[REMOVEEVENTLISTENER](LOAD, handler, FALSE);
                fireCallbacks();
              }, FALSE);
            else if(window[ATTACHEVENT])
              window[ATTACHEVENT](ONLOAD, function() {
                window[DETACHEVENT](ONLOAD, handler);
                fireCallbacks();
              });

            // Historic browsers.
            else {
              windowOnLoad = window[ONLOAD];
              window[ONLOAD] = fireCallbacks;
            }

          // Queue the callback along with its scope.
          callbacksList.push([callback, this]);
        }
      };

  // Expose main handler to global scope.
  return handler;
})(window, !1);
