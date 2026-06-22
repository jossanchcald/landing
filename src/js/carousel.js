var splide = new Splide('.splide');
var bar = splide.root.querySelector('#my-slider-progress-bar'); // ojo, en tu código original dice "my-carousel-progress-bar", no coincide con la clase del HTML

splide.on('mounted move', function () {
  var end = splide.Components.Controller.getEnd() + 1;
  var rate = Math.min((splide.index + 1) / end, 1);
  bar.style.width = String(100 * rate) + '%';
});

splide.mount();