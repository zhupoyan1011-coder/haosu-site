/* runs in <head>: mark JS on, and play the opening only once per visit (not when reduced motion is on) */
(function (h) {
  h.classList.add('js');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) h.classList.add('reduce');
})(document.documentElement);
