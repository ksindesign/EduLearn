// Navigation Module
export class Navigation {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.navbar = document.querySelector('.navbar');
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    this.initMobileToggle();
    this.initSmoothScrolling();
    this.initScrollEffects();
  }

  initMobileToggle() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener('click', () => {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
      });

      // Close mobile menu when clicking on a link
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          this.hamburger.classList.remove('active');
          this.navMenu.classList.remove('active');
        });
      });
    }
  }

  initSmoothScrolling() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 70; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  initScrollEffects() {
    if (!this.navbar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Add/remove background based on scroll position
      if (scrollTop > 50) {
        this.navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        this.navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        this.navbar.style.boxShadow = 'none';
      }

      this.lastScrollTop = scrollTop;
    });
  }
}