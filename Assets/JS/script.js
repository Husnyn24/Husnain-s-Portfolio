const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Frontend Developer.", "Web Designer.", "UI/UX Enthusiast."];
const typingDelay = 100;
const erasingDelay = 60;
const newTextDelay = 1500;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
document.addEventListener('DOMContentLoaded', () => {

  // 1. Image Click Zoom Toggle
  const aboutImage = document.getElementById('aboutImage');
  if (aboutImage) {
    aboutImage.addEventListener('click', function () {
      this.classList.toggle('zoom-image');
    });
  }

  // 2. Facts Counter Animation on Scroll
  const counters = document.querySelectorAll('.fact-number');
  let counterAnimated = false;

  const startCounter = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count) + (target === 100 ? '%' : '+');
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target + (target === 100 ? '%' : '+');
        }
      };
      updateCount();
    });
  };

  // 3. Skills Progress Bar Fill on Scroll
  const progressBars = document.querySelectorAll('.progress-bar');
  let skillsAnimated = false;

  const animateSkills = () => {
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    });
  };
  

  // Scroll Trigger Event Listener
  window.addEventListener('scroll', () => {
    const factsSection = document.querySelector('.facts-container');
    const skillsSection = document.querySelector('.skills-section');

    if (factsSection && !counterAnimated) {
      const pos = factsSection.getBoundingClientRect().top;
      if (pos < window.innerHeight - 100) {
        startCounter();
        counterAnimated = true;
      }
    }

    if (skillsSection && !skillsAnimated) {
      const pos = skillsSection.getBoundingClientRect().top;
      if (pos < window.innerHeight - 100) {
        animateSkills();
        skillsAnimated = true;
      }
    }
  });

});
document.addEventListener('DOMContentLoaded', () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  let skillsAnimated = false;

  const animateSkills = () => {
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth; // Width ko 0% se target (e.g. 95%) par animate karega
    });
  };

  window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection && !skillsAnimated) {
      const pos = skillsSection.getBoundingClientRect().top;
      if (pos < window.innerHeight - 100) {
        animateSkills();
        skillsAnimated = true; // Taakay scroll par baar baar na chale
      }
    }
  });
});
// Portfolio Filter Script
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
// Testimonial Slider Functionality (4 Slides Auto Loop)
let slideIndex = 0;
const slides = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  if (slides.length === 0) return;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));

  slideIndex = index;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;

  slides[slideIndex].classList.add('active');
  dots[slideIndex].classList.add('active');
}

function currentSlide(index) {
  showSlide(index);
}

// Auto transition every 4 seconds
setInterval(() => {
  if (slides.length > 0) {
    showSlide(slideIndex + 1);
  }
}, 4000);