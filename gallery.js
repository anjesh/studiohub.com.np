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
  const lightboxPanel = lightbox?.querySelector(".lightbox-panel");

  if (!root || !lightbox || !lightboxImage || !lightboxCaption || !lightboxClose || !lightboxPanel) {
    return;
  }

  let lastTrigger = null;
  let currentGroupTriggers = [];
  let currentIndex = 0;

  const prevButton = document.createElement("button");
  prevButton.className = "lightbox-nav lightbox-nav-prev";
  prevButton.type = "button";
  prevButton.setAttribute("aria-label", "Show previous image");
  prevButton.innerHTML = "<span aria-hidden=\"true\">&larr;</span>";

  const nextButton = document.createElement("button");
  nextButton.className = "lightbox-nav lightbox-nav-next";
  nextButton.type = "button";
  nextButton.setAttribute("aria-label", "Show next image");
  nextButton.innerHTML = "<span aria-hidden=\"true\">&rarr;</span>";

  lightboxPanel.append(prevButton, nextButton);

  function setNavigationState() {
    const shouldShowNav = currentGroupTriggers.length > 1;
    prevButton.hidden = !shouldShowNav;
    nextButton.hidden = !shouldShowNav;
  }

  function showTrigger(trigger) {
    currentIndex = currentGroupTriggers.indexOf(trigger);
    lightboxImage.src = trigger.dataset.fullSrc || "";
    lightboxImage.alt = trigger.querySelector("img")?.alt || "";
    lightboxCaption.textContent = trigger.dataset.caption || "";
  }

  function openLightbox(trigger) {
    lastTrigger = trigger;
    const groupName = trigger.dataset.galleryGroup;
    currentGroupTriggers = groupName
      ? Array.from(root.querySelectorAll(`${triggerSelector}[data-gallery-group="${groupName}"]`))
      : [trigger];
    setNavigationState();
    showTrigger(trigger);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxCaption.textContent = "";
    document.body.style.overflow = "";
    currentGroupTriggers = [];
    currentIndex = 0;

    if (lastTrigger) {
      lastTrigger.focus();
    }
  }

  function moveLightbox(direction) {
    if (currentGroupTriggers.length <= 1) {
      return;
    }

    currentIndex = (currentIndex + direction + currentGroupTriggers.length) % currentGroupTriggers.length;
    showTrigger(currentGroupTriggers[currentIndex]);
  }

  root.querySelectorAll(triggerSelector).forEach((button) => {
    button.addEventListener("click", () => openLightbox(button));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  prevButton.addEventListener("click", () => moveLightbox(-1));
  nextButton.addEventListener("click", () => moveLightbox(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) {
      return;
    }

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowLeft") {
      moveLightbox(-1);
    }

    if (event.key === "ArrowRight") {
      moveLightbox(1);
    }
  });
}
