Cross-Browser DOM Ready Handler
===============================

A minimalist, cross-browser "DOM Ready" event handler.

Example
-------
The [test.html][testhtml] is minimal and shows a typical usage.  
But it's really very simple, much like the following code snippet:

    <!DOCTYPE html>
    <html>
      <head>
        <script type="text/javascript" src="/path/to/dom-ready.js"></script>
        <script type="text/javascript">
          // When DOM is ready, this function is called and
          // 'document' is passed to it.
          // 'this' is pointing to current scope ('window', in this case.)
          domReady(function(document) {
            ...
          });
        </script>
      </head>
      <body>
        ...
      </body>
    </html>

Sources
-------
The source code has been meticulously gathered from various authors (list follows) and compiled
in this minimal closure. Once minified, the script is merely a few hundred bytes long.

[domready][domready], by Elias Torres  
[IEContentLoaded][iecontentloaded], by Diego Perini  
[onDOMContentLoaded][ondomcontentloaded], by Ilya Kantor (Russian)  
[domassistant][domassistant], by Robert Nyman  
[DOMContentLoaded][microsoft], by Microsoft Corp.  
[domcontentloaded][domcontentloaded], by Tanny O'Haley  

Terms of Use
------------

[MIT License][mitlicense]

[mitlicense]:         http://en.wikipedia.org/wiki/MIT_License                                           "MIT License"
[testhtml]:           https://raw.github.com/fineswap/dom-ready/master/test.html                "test.html"
[domready]:           https://code.google.com/p/domready/                                                "domready at Google Code"
[iecontentloaded]:    http://javascript.nwbox.com/IEContentLoaded/                                       "IEContentLoaded by Diego Perini"
[ondomcontentloaded]: http://javascript.ru/tutorial/events/ondomcontentloaded                            "onDOMContentLoaded"
[domassistant]:       https://code.google.com/p/domassistant/                                            "domassistant at Google Code"
[microsoft]:          http://ie.microsoft.com/testdrive/HTML5/DOMContentLoaded/                          "DOMContentLoaded under IE (HTML5)"
[domcontentloaded]:   http://tanny.ica.com/ICA/TKO/tkoblog.nsf/dx/domcontentloaded-for-browsers-part-iii "domcontentloaded for browsers"
