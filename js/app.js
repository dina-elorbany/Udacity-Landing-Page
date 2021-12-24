"use strict";
const start = performance.now();

// -------------------------------------------------- //
/*--- Global Selections ---*/

const createFragment = document.createDocumentFragment();
const header = document.querySelector("header");
const navbar = document.querySelector("nav");
const button = document.querySelector("button");

const sectionTitles = document.querySelectorAll("h2");
const sectionEls = document.querySelectorAll("section") || [];
const sections = [];
sectionEls.forEach((el) => sections.push(el));

let timer;
let isMouseOnNavbar;
let activeSectionIndex = 0;

// -------------------------------------------------- //
/*--- Create HTML Elements ---*/

// Create Navbar Inner-Container for Applying Bootstrap
const navbarMenuContainer = document.createElement("div");

navbarMenuContainer.classList.add("container-fluid", "navbar__container");

// Create Navbar Logo, Hamburger Button, and the outer unorder list Contains Navbar Links
navbarMenuContainer.innerHTML = `
<a class="navbar-brand" href="#">Udacity 💫</a>
<button
  class="navbar-toggler"
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span class="navbar-toggler-icon">Menu</span>
</button>
<div class="collapse navbar-collapse bg-light" id="navbarSupportedContent">
  <ul id="navbar__list" class="navbar-nav ms-auto mb-2 mb-lg-0">
  </ul>
</div>`;

// Append New HTML Element to the Navbar
createFragment.appendChild(navbarMenuContainer);
navbar.appendChild(createFragment);

// Create Navbar_Menu
const navbarLinks = document.querySelector("#navbar__list");

sectionTitles.forEach((title) => {
  const li = document.createElement("li");
  // Set Navbar Links Names
  li.innerHTML = `<a class="nav-link ms-3" href="#${title.outerText
    .toLowerCase()
    .replace(" ", "")}">${title.outerText}</a>`;
  createFragment.appendChild(li);
});
navbarLinks.appendChild(createFragment);

// -------------------------------------------------- //
/*--- Functions ---*/

/*--- Helper Functions ---*/

// Hide Navbar When stop Scrolling
const hideNavbarShowBtn = () => {
  navbar.classList.add("d-none");
  button.classList.remove("d-none");
};

// Show Navbar while Scrolling
const showNavbarHideBtn = () => {
  navbar.classList.remove("d-none");
  button.classList.add("d-none");
};

// Find Which Section is in the Viewport
const findViewportSection = () => {
  const foundIndex = sections.findIndex((section, i) => {
    const bounding = section.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const isInViewport =
      bounding.bottom <= windowHeight && bounding.bottom > 100;
    if (isInViewport) {
      return i;
    }
  });
  activeSectionIndex = foundIndex > 0 ? foundIndex : 0;
};

// -------------------------------------------------- //
/*--- Mouse Events ---*/

// Click on toTop Button
button.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo(0, 0);
});

// Click on Navbar Link to Scroll to its Section
navbarLinks.addEventListener("click", (e) => {
  const target = e.target;

  // Check if only Links Clicked
  if (target.hasAttribute("href") && !target.classList.contains("active")) {
    // Smooth Scrolling
    const linkClicked = target.getAttribute("href");
    const toSection = document.querySelector(linkClicked);
    toSection.scrollIntoView({ behavior: "smooth" });

    // Add "active" class to nav-link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    target.classList.add("active");
    // Add "your-active-class" to section
    sections.forEach((section) => {
      section.removeAttribute("class");
    });
    toSection.classList.add("your-active-class");
  }

  timer = setTimeout(() => {
    hideNavbarShowBtn();
  }, 1000);
});

// Don't Hide navbar when the mouse is over it
document.addEventListener("mouseover", (e) => {
  if (
    e.clientY <= navbar.offsetHeight &&
    !navbar.classList.contains("d-none")
  ) {
    showNavbarHideBtn();
    isMouseOnNavbar = true;
  } else {
    isMouseOnNavbar = false;
  }
});

// -------------------------------------------------- //
/*--- Scroll Events ---*/

// Handle Scrolling (Show/Hide Navbar/toTop, Show/Hide, Highlight Section, and Add Active class on its Navlink)
document.addEventListener("scroll", () => {
  // Navigate Sections using Scrolling
  findViewportSection();

  // Show Navbar
  clearTimeout(timer);

  // Show Navbar and Hide toTop Button
  showNavbarHideBtn();

  // Hide Navbar and Show toTop Button
  if (window.pageYOffset > navbar.offsetHeight && !isMouseOnNavbar) {
    timer = setTimeout(() => {
      hideNavbarShowBtn();
    }, 1000);
  }

  // Clean All NavLinks from "active" Class
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((navLink) => {
    if (navLinks) {
      navLink.classList.remove("active");
    }
  });
  // Clean All Sections from "your-active-class" Class
  sections.forEach((section) => {
    if (section) {
      section.classList.remove("your-active-class");
    }
  });
  // Add "active" and "your-active-class"
  if (navLinks[activeSectionIndex]) {
    navLinks[activeSectionIndex].classList.add("active");
    sections[activeSectionIndex].classList.add("your-active-class");
  }
});

// ---------------------------------------------------- //

const end = performance.now();
console.log(end - start);
