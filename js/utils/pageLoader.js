// Page Loader Utility
export class PageLoader {
  constructor() {
    this.init();
  }

  init() {
    this.initPageLoad();
  }

  initPageLoad() {
    // Loading animation for the page
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 100);
    });
  }

  // Static method to show loading spinner
  static showLoadingSpinner(element, text = 'Loading...') {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner-container';
    spinner.innerHTML = `
      <div class="loading-spinner"></div>
      <span class="loading-text">${text}</span>
    `;

    spinner.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 20px;
    `;

    // Add spinner styles if not present
    PageLoader.addSpinnerStyles();

    element.appendChild(spinner);
    return spinner;
  }

  // Static method to hide loading spinner
  static hideLoadingSpinner(spinner) {
    if (spinner && spinner.parentNode) {
      spinner.remove();
    }
  }

  // Add loading spinner styles
  static addSpinnerStyles() {
    if (!document.querySelector('#spinner-styles')) {
      const style = document.createElement('style');
      style.id = 'spinner-styles';
      style.textContent = `
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--primary-color);
          animation: spin 1s ease-in-out infinite;
        }

        .loading-text {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}