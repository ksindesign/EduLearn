// Button Utilities
export class ButtonEffects {
  constructor() {
    this.init();
  }

  init() {
    this.initRippleEffect();
    this.initLoadingStates();
  }

  initRippleEffect() {
    // Button click animations - ripple effect
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation CSS if not already present
    this.addRippleStyles();
  }

  initLoadingStates() {
    // Add loading states to buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
      button.addEventListener('click', function(e) {
        if (!this.classList.contains('loading') && this.type !== 'submit') {
          this.classList.add('loading');
          this.style.pointerEvents = 'none';

          setTimeout(() => {
            this.classList.remove('loading');
            this.style.pointerEvents = '';
          }, 2000);
        }
      });
    });
  }

  addRippleStyles() {
    if (!document.querySelector('#ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
}