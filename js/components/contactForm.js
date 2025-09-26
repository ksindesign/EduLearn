// Contact Form Component
export class ContactForm {
  constructor() {
    this.form = document.getElementById('contactForm');
    this.init();
  }

  init() {
    if (this.form) {
      this.bindEvents();
      this.initFormEnhancements();
    }
  }

  bindEvents() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const submitButton = this.form.querySelector('button[type="submit"]');
    const formData = this.getFormData();

    // Validate form
    if (!this.validateForm(formData)) {
      this.showNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Validate email
    if (!this.validateEmail(formData.email)) {
      this.showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
      // Simulate API call (replace with actual endpoint)
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Show success message
      this.showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');

      // Reset form
      this.form.reset();
      this.clearValidationStates();

    } catch (error) {
      this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      // Reset button state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  }

  getFormData() {
    return {
      name: this.form.querySelector('#name').value,
      email: this.form.querySelector('#email').value,
      subject: this.form.querySelector('#subject').value,
      message: this.form.querySelector('#message').value
    };
  }

  validateForm(data) {
    return data.name && data.email && data.subject && data.message;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  initFormEnhancements() {
    // Form input enhancements
    const inputs = this.form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
      // Add floating label effect
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', function() {
        if (!this.value) {
          this.parentElement.classList.remove('focused');
        }
      });

      // Real-time validation feedback
      input.addEventListener('input', () => {
        this.handleInputValidation(input);
      });
    });
  }

  handleInputValidation(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error', 'success');

    if (input.type === 'email' && input.value) {
      if (this.validateEmail(input.value)) {
        formGroup.classList.add('success');
      } else {
        formGroup.classList.add('error');
      }
    } else if (input.required && input.value.trim()) {
      formGroup.classList.add('success');
    }
  }

  clearValidationStates() {
    const formGroups = this.form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
      group.classList.remove('error', 'success', 'focused');
    });
  }

  showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.contact-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `contact-notification contact-notification-${type}`;

    const iconMap = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      info: 'fa-info-circle'
    };

    const colorMap = {
      success: 'var(--success-color)',
      error: 'var(--error-color)',
      info: 'var(--primary-color)'
    };

    notification.innerHTML = `
      <div class="contact-notification-content">
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
      </div>
      <button class="contact-notification-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${colorMap[type]};
      color: white;
      padding: 15px 20px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 15px;
      max-width: 400px;
      animation: slideInRight 0.3s ease-out;
      font-family: 'Inter', sans-serif;
    `;

    // Style notification content
    const content = notification.querySelector('.contact-notification-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    `;

    // Style close button
    const closeBtn = notification.querySelector('.contact-notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 5px;
      border-radius: 3px;
      transition: background-color 0.2s ease;
    `;

    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.backgroundColor = 'transparent';
    });

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
      this.removeNotification(notification);
    }, 5000);

    // Manual close
    closeBtn.addEventListener('click', () => {
      clearTimeout(autoRemove);
      this.removeNotification(notification);
    });
  }

  removeNotification(notification) {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }
}