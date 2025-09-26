// Scroll to Top Utility
export class ScrollToTop {
  constructor() {
    this.scrollButton = null;
    this.init();
  }

  init() {
    this.createButton();
    this.bindEvents();
  }

  createButton() {
    this.scrollButton = document.createElement('button');
    this.scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    this.scrollButton.className = 'scroll-to-top';
    this.scrollButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--primary-color);
      color: white;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      opacity: 0;
      transform: translateY(100px);
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    document.body.appendChild(this.scrollButton);
  }

  bindEvents() {
    // Click event
    this.scrollButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Show/hide on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        this.scrollButton.style.opacity = '1';
        this.scrollButton.style.transform = 'translateY(0)';
      } else {
        this.scrollButton.style.opacity = '0';
        this.scrollButton.style.transform = 'translateY(100px)';
      }
    });

    // Hover effect
    this.scrollButton.addEventListener('mouseenter', () => {
      this.scrollButton.style.transform = 'translateY(0) scale(1.1)';
    });

    this.scrollButton.addEventListener('mouseleave', () => {
      const isVisible = window.pageYOffset > 300;
      this.scrollButton.style.transform = isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(1)';
    });
  }
}