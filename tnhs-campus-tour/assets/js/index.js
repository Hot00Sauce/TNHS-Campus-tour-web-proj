document.addEventListener('DOMContentLoaded', () => {
  const slides = document.getElementById('slides');
  const dots = document.getElementById('dots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const testimonials = [];
  let currentIndex = 0;

  // Fetch testimonials from JSON file
  fetch('/data/testimonials.json')
    .then(response => response.json())
    .then(data => {
      testimonials.push(...data);
      renderTestimonials();
      createDots();
    })
    .catch(error => console.error('Error fetching testimonials:', error));

  function renderTestimonials() {
    slides.innerHTML = '';
    testimonials.forEach((testimonial, index) => {
      const slide = document.createElement('div');
      slide.classList.add('testimonial-slide');
      slide.style.display = index === currentIndex ? 'block' : 'none';
      slide.innerHTML = `
        <p>${testimonial.quote}</p>
        <h4>${testimonial.author}</h4>
      `;
      slides.appendChild(slide);
    });
  }

  function createDots() {
    dots.innerHTML = '';
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('aria-label', `Testimonial ${index + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
      });
      dots.appendChild(dot);
    });
  }

  function updateCarousel() {
    const slides = document.querySelectorAll('.testimonial-slide');
    slides.forEach((slide, index) => {
      slide.style.display = index === currentIndex ? 'block' : 'none';
    });
    const dotButtons = document.querySelectorAll('.dot');
    dotButtons.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonials.length - 1;
    updateCarousel();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < testimonials.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
  });

  // Initial render
  if (testimonials.length > 0) {
    renderTestimonials();
  }
});