var loadJS = function (url, loaded) {
  var scr = document.createElement('script');
  scr.type = 'text/javascript';
  scr.src = url;
  if (window.navigator.userAgent.indexOf('MSIE') > -1) {
    scr.onload = scr.onreadystatechange = function () {
      if (this.readyState === "loaded" || this.readyState === "complete") {
        if (loaded) { loaded(); }
      }
      scr.onload = scr.onreadystatechange = null;
    };
  } else {
    scr.onload = loaded;
  }
  document.getElementsByTagName('head')[0].appendChild(scr);
},
  baseurl = 'http://waxolunist.github.io/console-bookmarklet/lib';

loadJS(baseurl + '/js/jquery-2.0.0.min.js', function () {
  $('head').append('<link href="' + baseurl +
                   '/jquery-ui/css/console/jquery-ui-1.10.2.custom.min.css"' +
                   'type="text/css" rel="stylesheet">');
  $('head').append('<link rel="stylesheet" href="' + baseurl + '/console.css" type="text/css" />');
  loadJS(baseurl + '/jquery-ui/js/jquery-ui-1.10.2.custom.min.js', function () {
    loadJS(baseurl + '/jquery-ui/js/jquery.ui.touch-punch.min.js', function () {
      function appendElement(message, styleClass) {
        var codeElement = $(document.createElement('code'));
        if (styleClass) {
          codeElement.addClass(styleClass);
        }
        codeElement.text(message);
        $('#debug pre').append(codeElement);
      }

      function pipeConsole() {
        if (typeof console !== 'undefined' && typeof console.log !== 'undefined') {
          console.oerror = console.error;
          console.owarn = console.warn;
          console.oinfo = console.info;
          console.odebug = console.debug;
          console.olog = console.log;
          
          console.error = function (message) {
            console.oerror(message);
            appendElement(message, 'error');
          };
          console.warn = function (message) {
            console.owarn(message);
            appendElement(message, 'warn');
          };
          console.info = function (message) {
            console.oinfo(message);
            appendElement(message, 'info');
          };
          console.debug = function (message) {
            console.odebug(message);
            appendElement(message, 'debug');
          };
          console.log = function (message) {
            console.olog(message);
            appendElement(message, 'log');
          };
        }
      }

      var dialogElement = $(document.createElement('div')),
        preElement = $(document.createElement('pre')),
        d;
      dialogElement.attr('id', 'debug');
      dialogElement.attr('title', 'Console output');
      dialogElement.append(preElement);
      $('body').append(dialogElement);
     
      d = $('#debug').dialog({
        modal: false,
        autoOpen: false,
        height: 200,
        width: '14em',
        position: "left bottom",
        'open': function () { $('.ui-widget-overlay').wrap('<div class="debug"></div>'); }
      });
      d.parent('.ui-dialog').wrap('<div class="debug"></div>');
      d.dialog('open');

      pipeConsole();
    });
  });
});

