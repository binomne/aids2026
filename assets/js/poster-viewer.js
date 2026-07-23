/* ============================================================================
   HIVnext — poster pan/zoom viewer
   Vanilla JS, no dependencies. Mouse wheel to zoom, drag to pan, pinch to
   zoom on touch, double-click/double-tap to toggle zoom, plus button
   controls and fullscreen. Works because .poster-stage is always sized to
   exactly match .poster-frame at scale 1 (see site.css), so "fit" is
   simply scale = 1, translate = 0.
   ============================================================================ */
(function () {
  "use strict";

  function initPosterViewer(opts) {
    var frame = document.querySelector(opts.frame);
    var stage = document.querySelector(opts.stage);
    var img = stage ? stage.querySelector('img') : null;
    if (!frame || !stage || !img) return;

    var scale = 1, minScale = 1, maxScale = 6, x = 0, y = 0;
    var pointers = new Map();
    var isPanning = false, lastDist = 0;
    var startX = 0, startY = 0, startTX = 0, startTY = 0;
    var lastTap = 0;

    function apply() {
      stage.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
    }

    function clamp() {
      var fw = frame.clientWidth, fh = frame.clientHeight;
      var sw = fw * scale, sh = fh * scale;
      if (sw <= fw) { x = (fw - sw) / 2; }
      else { x = Math.min(0, Math.max(fw - sw, x)); }
      if (sh <= fh) { y = (fh - sh) / 2; }
      else { y = Math.min(0, Math.max(fh - sh, y)); }
    }

    function setScale(next, cx, cy) {
      next = Math.min(maxScale, Math.max(minScale, next));
      if (cx === undefined) cx = frame.clientWidth / 2;
      if (cy === undefined) cy = frame.clientHeight / 2;
      var ratio = next / scale;
      x = cx - (cx - x) * ratio;
      y = cy - (cy - y) * ratio;
      scale = next;
      clamp();
      apply();
      updateZoomLabel();
    }

    function reset() {
      scale = minScale; x = 0; y = 0;
      clamp(); apply(); updateZoomLabel();
    }

    function updateZoomLabel() {
      var label = document.querySelector(opts.zoomLabel);
      if (label) label.textContent = Math.round(scale * 100) + '%';
    }

    // ---- Wheel zoom ----
    frame.addEventListener('wheel', function (e) {
      e.preventDefault();
      var rect = frame.getBoundingClientRect();
      setScale(scale * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX - rect.left, e.clientY - rect.top);
    }, { passive: false });

    // ---- Pointer drag + pinch ----
    frame.addEventListener('pointerdown', function (e) {
      frame.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) {
        isPanning = true;
        frame.classList.add('grabbing');
        startX = e.clientX; startY = e.clientY; startTX = x; startTY = y;
      } else if (pointers.size === 2) {
        isPanning = false;
        var pts = Array.from(pointers.values());
        lastDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      }
    });

    frame.addEventListener('pointermove', function (e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (pointers.size === 1 && isPanning) {
        x = startTX + (e.clientX - startX);
        y = startTY + (e.clientY - startY);
        clamp(); apply();
      } else if (pointers.size === 2) {
        var pts = Array.from(pointers.values());
        var dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
        var rect = frame.getBoundingClientRect();
        var midX = (pts[0].x + pts[1].x) / 2 - rect.left;
        var midY = (pts[0].y + pts[1].y) / 2 - rect.top;
        if (lastDist > 0) setScale(scale * (dist / lastDist), midX, midY);
        lastDist = dist;
      }
    });

    function endPointer(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) lastDist = 0;
      if (pointers.size === 0) { isPanning = false; frame.classList.remove('grabbing'); }
    }
    frame.addEventListener('pointerup', function (e) {
      var now = Date.now();
      if (now - lastTap < 320 && pointers.size <= 1) {
        var rect = frame.getBoundingClientRect();
        if (scale > minScale + 0.05) reset();
        else setScale(2.4, e.clientX - rect.left, e.clientY - rect.top);
      }
      lastTap = now;
      endPointer(e);
    });
    frame.addEventListener('pointercancel', endPointer);
    frame.addEventListener('pointerleave', endPointer);

    // ---- Buttons ----
    function bind(sel, fn) {
      var el = document.querySelector(sel);
      if (el) el.addEventListener('click', fn);
    }
    bind(opts.zoomIn, function () { setScale(scale * 1.35); });
    bind(opts.zoomOut, function () { setScale(scale / 1.35); });
    bind(opts.reset, reset);
    bind(opts.fullscreen, function () {
      if (!document.fullscreenElement) { (frame.requestFullscreen || function () {}).call(frame); }
      else { (document.exitFullscreen || function () {}).call(document); }
    });

    window.addEventListener('resize', function () { clamp(); apply(); });

    if (img.complete) reset(); else img.addEventListener('load', reset);
  }

  window.initPosterViewer = initPosterViewer;
})();
