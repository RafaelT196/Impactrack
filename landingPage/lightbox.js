(function () {
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = lightbox.querySelector(".lightbox-content img");
  var lightboxBackdrop = lightbox.querySelector(".lightbox-backdrop");
  var lightboxClose = lightbox.querySelector(".lightbox-close");
  var items = document.querySelectorAll(".gallery-item");

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  items.forEach(function (item) {
    var img = item.querySelector("img");
    if (!img) return;

    item.addEventListener("click", function () {
      openLightbox(img.src, img.alt);
    });

    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img.src, img.alt);
      }
    });
  });

  lightboxBackdrop.addEventListener("click", closeLightbox);
  lightboxClose.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
})();
