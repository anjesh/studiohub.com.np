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
