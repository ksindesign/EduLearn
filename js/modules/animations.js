// Animations Module
export class Animations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initCounterAnimations();
    this.initParallaxEffect();
    this.initHoverEffects();
  }

  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, this.observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .hero-stats .stat');

    // Observe elements (CSS already handles initial hidden state)
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }

  initCounterAnimations() {
    // Animate counters when hero section is in view
    const heroStatsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stats = entry.target.querySelectorAll('.stat h3');

          stats.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/[^0-9]/g, ''));

            if (number) {
              this.animateCounter(stat, number, 2000);
            }
          });

          heroStatsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
      heroStatsObserver.observe(heroStats);
    }
  }

  animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }

      // Format numbers with commas for large values
      const formattedNumber = Math.floor(start).toLocaleString();
      element.textContent = formattedNumber + (target >= 1000 ? '+' : '');
    }, 16);
  }

  initParallaxEffect() {
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content');
      const heroImage = document.querySelector('.hero-image');

      if (heroContent && heroImage && scrolled < window.innerHeight) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate * 0.5}px)`;
        heroImage.style.transform = `translateY(${rate * 0.3}px)`;
      }
    });
  }

  initHoverEffects() {
    // Course card hover effects
    document.querySelectorAll('.course-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Feature card hover effects with icon rotation
    document.querySelectorAll('.feature-card').forEach(card => {
      const icon = card.querySelector('.feature-icon i');

      card.addEventListener('mouseenter', function() {
        if (icon) {
          icon.style.transform = 'rotate(360deg)';
          icon.style.transition = 'transform 0.5s ease';
        }
      });

      card.addEventListener('mouseleave', function() {
        if (icon) {
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });
  }

  // Dynamic typing effect utility
  static typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    const type = () => {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    };

    type();
  }
}