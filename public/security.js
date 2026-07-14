// DiaMart Security — Devtools & source protection
(function () {
  "use strict";

  // ── Keyboard shortcuts ──
  document.addEventListener(
    "keydown",
    function (e) {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    },
    true,
  );

  // ── Right-click ──
  document.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
      return false;
    },
    true,
  );

  // ── Devtools dimension detection ──
  var threshold = 160;
  function checkDevtools() {
    var w = window.outerWidth - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    if (w > threshold || h > threshold) {
      document.title = "⚠ Developer tools detected";
      document.body.innerHTML =
        '<div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#08080f;color:#f7f4ff;font-family:sans-serif;text-align:center;padding:2rem">' +
        '<div><h1 style="font-size:1.5rem;margin-bottom:1rem;font-weight:600">Developer tools detected</h1>' +
        '<p style="color:#aaa4b5;max-width:400px;line-height:1.6">This action has been logged. Please close developer tools to continue using DiaMart.</p></div></div>';
    }
  }
  setInterval(checkDevtools, 2000);

  // ── Disable console log override attempts ──
  Object.defineProperty(window, "console", {
    value: console,
    writable: false,
    configurable: false,
  });
})();
