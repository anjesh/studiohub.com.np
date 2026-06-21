function bindGalleryLightbox(options = {}) {
  const {
    rootSelector,
    triggerSelector = ".project-thumb",
    lightboxSelector = "#lightbox",
    imageSelector = "#lightbox-image",
    captionSelector = "#lightbox-caption",
    closeSelector = "#lightbox-close",
  } = options;

  const root = document.querySelector(rootSelector);
  const lightbox = document.querySelector(lightboxSelector);
  const lightboxImage = document.querySelector(imageSelector);
  const lightboxCaption = document.querySelector(captionSelector);
  const lightboxClose = document.querySelector(closeSelector);

  if (!root || !lightbox || !lightboxImage || !lightboxCaption || !lightboxClose) {
    return;
  }

  let lastTrigger = null;

  function openLightbox(trigger) {
    lastTrigger = trigger;
    lightboxImage.src = trigger.dataset.fullSrc || "";
    lightboxImage.alt = trigger.querySelector("img")?.alt || "";
    lightboxCaption.textContent = trigger.dataset.caption || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";

    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  root.querySelectorAll(triggerSelector).forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
