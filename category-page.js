const pageShell = document.querySelector("[data-category-key]");
const categoryKey = pageShell?.dataset.categoryKey;
const category = categoryKey ? portfolioCategories[categoryKey] : null;

if (pageShell && category) {
  document.title = `${category.title} | Studio Hub Consulting`;

  const heroLabelNode = document.querySelector("[data-category-label]");
  const heroTitleNode = document.querySelector("[data-category-hero-title]");
  const heroSupportNode = document.querySelector("[data-category-hero-support]");
  const heroImageNode = document.querySelector("[data-category-hero-image]");
  const projectsRoot = document.querySelector("[data-project-root]");

  heroLabelNode.textContent = category.label;
  heroTitleNode.textContent = category.heroText;
  heroSupportNode.textContent = category.heroSupport;
  heroImageNode.src = category.heroImage;
  heroImageNode.alt = category.heroAlt;

  projectsRoot.innerHTML = `
    <div class="project-stack">
      ${category.projects
        .map((project, index) => {
          const [leadImage, ...galleryImages] = project.images;
          const galleryClass =
            galleryImages.length <= 2 ? "project-gallery compact" : "project-gallery";

          return `
            <article class="project-section">
              <div class="project-intro">
                <div class="project-meta">
                  <p class="section-label">Project ${String(index + 1).padStart(2, "0")}</p>
                  <dl>
                    <div>
                      <dt>Location</dt>
                      <dd>${project.location}</dd>
                    </div>
                    <div>
                      <dt>Date</dt>
                      <dd>${project.date}</dd>
                    </div>
                    <div>
                      <dt>Scope</dt>
                      <dd>${project.scope.join(", ")}</dd>
                    </div>
                  </dl>
                </div>
                <figure class="project-lead">
                  <img src="${leadImage}" alt="${project.title}" />
                </figure>
              </div>
              ${
                galleryImages.length
                  ? `
                    <div class="${galleryClass}">
                      ${galleryImages
                        .map(
                          (image, imageIndex) => `
                            <figure>
                              <button
                                class="project-thumb"
                                type="button"
                                data-full-src="${image}"
                                data-caption="${project.title}, ${project.location}"
                              >
                                <img src="${image}" alt="${project.title} supporting view ${imageIndex + 1}" />
                              </button>
                            </figure>
                          `,
                        )
                        .join("")}
                    </div>
                  `
                  : ""
              }
            </article>
          `;
        })
        .join("")}
    </div>
  `;

  bindGalleryLightbox({
    rootSelector: "[data-project-root]",
  });
}
