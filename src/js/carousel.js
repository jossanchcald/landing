import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';

var splide = new Splide('.splide');
var bar = splide.root.querySelector('#my-slider-progress-bar');

splide.on('mounted move', function () {
  var end = splide.Components.Controller.getEnd() + 1;
  var rate = Math.min((splide.index + 1) / end, 1);
  bar.style.width = String(100 * rate) + '%';
});

splide.mount();