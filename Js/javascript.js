/*
  Main JavaScript file for O'botz Nepal.

  This file controls three interactive parts of the page:
  1. The hero image slider at the top of the page.
  2. The blog card controls.
  3. The testimonial card controls.

  The code is written with safety checks, so if one section is removed from
  index.html, the rest of the page can still run without JavaScript errors.
*/

(function () {
  /*
    HERO SLIDER

    The hero slider works by adding/removing the "active" class on slides.
    CSS decides what an active slide looks like:
    - active slide: visible
    - inactive slides: hidden with opacity 0
  */

  // Find all hero slides in index.html.
  const slides = document.querySelectorAll(".hero-slide");

  // This is the empty div where JavaScript creates the indicator dots.
  const dotsContainer = document.getElementById("heroDots");

  // The full slider wrapper. Used here as a required safety check.
  const slider = document.querySelector(".hero-slider");

  // If any important slider element is missing, stop this slider code.
  if (!slides.length || !dotsContainer || !slider) {
    return;
  }

  // Tracks which slide is currently visible.
  let currentIndex = 0;

  // Controls the auto-change speed. 2000 means 2 seconds.
  const autoChangeTime = 2000;

  // Stores the setInterval ID so we can restart the timer cleanly.
  let autoplay;

  function createDots() {
    /*
      Create one dot for each slide.
      This means you can add more .hero-slide elements in HTML, and the
      indicator dots will automatically match the number of slides.
    */
    slides.forEach((_, index) => {
      const dot = document.createElement("button");

      // Use a real button for better accessibility and keyboard support.
      dot.type = "button";

      // The first dot starts active because the first slide starts active.
      dot.className = index === 0 ? "hero-dot active" : "hero-dot";

      // Store the slide number on the button for easier debugging.
      dot.dataset.index = index;

      // Clicking a dot changes to that slide and restarts the auto timer.
      dot.addEventListener("click", () => {
        showSlide(index);
        startAutoplay();
      });

      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    /*
      Keep the slider looping forever.
      If index goes before the first slide, show the last slide.
      If index goes after the last slide, show the first slide.
    */
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;

    // Add "active" only to the slide that should be visible.
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });

    // Add "active" only to the dot that matches the visible slide.
    dotsContainer.querySelectorAll(".hero-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function startAutoplay() {
    /*
      Restart the autoplay timer.
      clearInterval prevents multiple timers from stacking up after a user
      clicks an indicator dot.
    */
    clearInterval(autoplay);
    autoplay = setInterval(() => showSlide(currentIndex + 1), autoChangeTime);
  }

  // Start the hero slider when the page loads.
  createDots();
  startAutoplay();
})();

(function () {
  /*
    PROGRAM LEVEL SHOWCASE

    Rotates the level cards every 2 seconds and keeps the right-side dots in
    sync. The safety checks let the script run on pages without this section.
  */

  const showcase = document.getElementById("levelShowcase");
  const dotsContainer = document.getElementById("levelDots");

  if (!showcase || !dotsContainer) {
    return;
  }

  const slides = showcase.querySelectorAll(".level-slide");

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;
  let autoplay;
  const autoChangeTime = 2000;

  function createDots() {
    slides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = index === 0 ? "level-dot active" : "level-dot";
      dot.setAttribute("aria-label", `Show level ${index + 1}`);
      dot.innerHTML = `<span class="level-dot-circle"></span><span class="level-dot-label">Level ${index + 1}</span>`;
      dot.addEventListener("click", () => {
        showSlide(index);
        startAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    dotsContainer.querySelectorAll(".level-dot").forEach((dot, dotIndex) => {
      dot.classList.toggle("active", dotIndex === index);
    });
  }

  function startAutoplay() {
    clearInterval(autoplay);
    autoplay = setInterval(() => showSlide(currentIndex + 1), autoChangeTime);
  }

  createDots();
  startAutoplay();
})();

function scrollBlogs(direction) {
  /*
    BLOG CARD CONTROLS

    direction = 1 means the right arrow was clicked.
    direction = -1 means the left arrow was clicked.

    Instead of normal scrolling, this rotates the cards:
    - right arrow: first card moves to the end
    - left arrow: last card moves to the beginning

    This makes the button visibly work even on desktop, where three blog cards
    may already fit on screen.
  */

  const container = document.getElementById("blogContainer");
  if (!container) {
    return;
  }

  const cards = container.querySelectorAll(".blog-posts");
  if (!cards.length) {
    return;
  }

  // This class adds a tiny transition from CSS before the card order changes.
  container.classList.add("blog-list-changing");

  setTimeout(() => {
    if (direction > 0) {
      container.appendChild(container.firstElementChild);
    } else {
      container.prepend(container.lastElementChild);
    }

    container.scrollLeft = 0;
    container.classList.remove("blog-list-changing");
  }, 160);
}

function scrollTestimonials(direction) {
  /*
    TESTIMONIAL CARD CONTROLS

    This uses the same rotation idea as the blog cards, but targets the
    testimonial container and testimonial cards.
  */

  const container = document.getElementById("testimonialContainer");
  if (!container) {
    return;
  }

  const cards = container.querySelectorAll(".testimonial-card");
  if (!cards.length) {
    return;
  }

  // This class adds a short visual change before the card order updates.
  container.classList.add("testimonial-list-changing");

  setTimeout(() => {
    if (direction > 0) {
      container.appendChild(container.firstElementChild);
    } else {
      container.prepend(container.lastElementChild);
    }

    container.scrollLeft = 0;
    container.classList.remove("testimonial-list-changing");
  }, 160);
}
