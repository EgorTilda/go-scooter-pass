"use strict";

(function () {
  "use strict";

  var e = function e() {
    document.getElementById("modal").classList.toggle("show"), document.body.classList.toggle("show-modal");
  };
  new Swiper(".swiper", {
    navigation: {
      nextEl: ".gallery-slider__btn--next",
      prevEl: ".gallery-slider__btn--prev"
    }
  }), document.getElementById("cta-btn").addEventListener("click", e), document.getElementById("close-modal").addEventListener("click", e), document.body.addEventListener("keydown", function (t) {
    "Escape" == t.key && e();
  });
})();