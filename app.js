const categories = [
  {
    name: "Residence",
    count: 9,
    summary:
      "Private residential work across Kathmandu, Bhaktapur, Kirtipur, and Patan.",
    image: "./assets/residence/studio-hub-021.jpg",
    href: "./residence.html",
  },
  {
    name: "Hotel",
    count: 2,
    summary:
      "Hospitality projects combining exterior identity with interior spatial atmosphere.",
    image: "./assets/hotel/studio-hub-028.jpg",
    href: "./hotel.html",
  },
  {
    name: "Cafe",
    count: 1,
    summary:
      "Cafe interior work built around warm materials, daylight, and open seating rhythm.",
    image: "./assets/cafe/studio-hub-034.jpg",
    href: "./cafe.html",
  },
  {
    name: "Commercial",
    count: 2,
    summary:
      "Commercial facades and construction-focused work for urban retail and mixed-use settings.",
    image: "./assets/commercial/studio-hub-038.jpg",
    href: "./commercial.html",
  },
  {
    name: "Interior",
    count: 8,
    summary:
      "Residential and turnkey interior projects balancing drawing packages with built execution.",
    image: "./assets/interior/studio-hub-053.jpg",
    href: "./interior.html",
  },
  {
    name: "Outsourcing",
    count: 3,
    summary:
      "As-built construction drawing and modeling work for international collaborators.",
    image: "./assets/outsourcing/studio-hub-082.jpg",
    href: "./outsourcing.html",
  },
];

const categoryGrid = document.querySelector("#category-grid");

categoryGrid.innerHTML = categories
  .map(
    (category) => `
      <article class="category-card">
        <a class="category-card-link" href="${category.href}">
          <div>
            <span class="category-meta">${category.count} project${
              category.count === 1 ? "" : "s"
            }</span>
            <h3>${category.name}</h3>
            <p>${category.summary}</p>
          </div>
          <img src="${category.image}" alt="${category.name} featured project image" />
        </a>
      </article>
    `,
  )
  .join("");
