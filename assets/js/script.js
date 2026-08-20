"use strict";

// ============================================
// 1. PAGE LOADER
// ============================================
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  if (loader) {
    setTimeout(() => {
      loader.classList.add("loaded");
    }, 600);
  }
});


// ============================================
// 2. SIDEBAR TOGGLE (Mobile)
// ============================================
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });
}


// ============================================
// 3. CONTACT FORM VALIDATION
// ============================================
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  for (const input of formInputs) {
    input.addEventListener("input", () => {
      formBtn.disabled = !form.checkValidity();
    });
  }
}


// ============================================
// 4. PAGE NAVIGATION
// ============================================
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
    // Re-observe scroll animations on new tab
    setTimeout(initScrollAnimations, 100);
  });
}

// Navigate to page programmatically
function navigateToPage(pageName) {
  for (let j = 0; j < pages.length; j++) {
    if (pages[j].dataset.page === pageName) {
      pages[j].classList.add("active");
      navigationLinks[j].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[j].classList.remove("active");
      navigationLinks[j].classList.remove("active");
    }
  }
  setTimeout(initScrollAnimations, 100);
}

// Hero CTA buttons
const heroResumeBtn = document.getElementById("heroResumeBtn");
const heroContactBtn = document.getElementById("heroContactBtn");

if (heroResumeBtn) {
  heroResumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigateToPage("resume");
  });
}

if (heroContactBtn) {
  heroContactBtn.addEventListener("click", (e) => {
    e.preventDefault();
    navigateToPage("contact");
  });
}


// ============================================
// 5. TYPING ANIMATION
// ============================================
const typingElement = document.getElementById("typingText");
const typingPhrases = [
  "MERN Stack Developer",
  "CS & AI Undergraduate",
  "Competitive Programmer",
  "Codeforces Specialist",
  "Open Source Contributor",
  "Full-Stack Developer",
  "Problem Solver",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const TYPING_SPEED = 70;
const DELETING_SPEED = 35;
const PAUSE_AFTER_TYPE = 2000;
const PAUSE_AFTER_DELETE = 400;

function typeEffect() {
  if (!typingElement) return;

  const currentPhrase = typingPhrases[phraseIndex];

  if (!isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeEffect, PAUSE_AFTER_TYPE);
      return;
    }
    setTimeout(typeEffect, TYPING_SPEED);
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % typingPhrases.length;
      setTimeout(typeEffect, PAUSE_AFTER_DELETE);
      return;
    }
    setTimeout(typeEffect, DELETING_SPEED);
  }
}

setTimeout(typeEffect, 1200);


// ============================================
// 6. DARK / LIGHT THEME TOGGLE
// ============================================
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
htmlElement.setAttribute("data-theme", savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = htmlElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    htmlElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  });
}


// ============================================
// 7. SCROLL ANIMATIONS (IntersectionObserver)
// ============================================
const observerOptions = {
  root: null,
  rootMargin: "0px 0px -50px 0px",
  threshold: 0.05,
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".animate-on-scroll:not(.visible), .animate-slide-left:not(.visible), .animate-slide-right:not(.visible), .animate-scale:not(.visible)"
  );
  animatedElements.forEach((el) => scrollObserver.observe(el));
}

// Initial observation
initScrollAnimations();