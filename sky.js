<html>
  <head>
    <meta name="color-scheme" content="light dark">
  </head>
  <body>
    <pre style="word-wrap: break-word; white-space: pre-wrap;">
      function skyCTRL() {
        var sky = document.getElementById("sky");
          if (sky.getAttribute("opacity")=="0") {
            sky.setAttribute("opacity","0.95");}
          else {
          sky.setAttribute("opacity","0");}
      }
    </pre>
    <div id="trend_notification_app" class="trend_notification_app_outer">
    <div id="trend_notification">
    <div id="trend_notification_con" class="clearfix">
    </div>
    </div>
    </div>
    <div id="UMS_TOOLTIP" style="position: absolute; cursor: pointer; z-index: 2147483647; background: transparent; top: -100000px; left: -100000px;">
    </div>
  </body>
  <umsdataelement id="UMSSendDataEventElement">
  </umsdataelement>
  <div id="tmtoolbar_manual_rating_injected" style="display: none;">init
  </div>
</html>
