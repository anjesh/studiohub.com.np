document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".nav-dropdown-toggle");

  if (!toggle) {
    return;
  }

  function closeDropdown() {
    dropdown.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openDropdown() {
    dropdown.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const isOpen = dropdown.classList.contains("is-open");

    document.querySelectorAll(".nav-dropdown.is-open").forEach((openDropdownNode) => {
      if (openDropdownNode !== dropdown) {
        const openToggle = openDropdownNode.querySelector(".nav-dropdown-toggle");
        openDropdownNode.classList.remove("is-open");
        if (openToggle) {
          openToggle.setAttribute("aria-expanded", "false");
        }
      }
    });

    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  document.addEventListener("click", (event) => {
    if (!dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDropdown();
    }
  });
});

document.querySelectorAll("a[href]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const href = link.getAttribute("href");

    if (
      !href ||
      href.startsWith("#") ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);

    if (destination.origin !== window.location.origin) {
      return;
    }

    if (
      destination.pathname === window.location.pathname &&
      destination.search === window.location.search &&
      destination.hash
    ) {
      return;
    }

    event.preventDefault();
    document.body.classList.add("page-is-leaving");
    window.setTimeout(() => {
      window.location.href = destination.href;
    }, 180);
  });
});
