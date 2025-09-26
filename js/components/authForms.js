// Authentication Forms Component
export class AuthForms {
  constructor() {
    this.loginForm = document.getElementById('loginForm');
    this.signupForm = document.getElementById('signupForm');
    this.init();
  }

  init() {
    this.initLoginForm();
    this.initSignupForm();
    this.initPasswordToggles();
    this.initPasswordStrength();
  }

  initLoginForm() {
    if (!this.loginForm) return;

    this.loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleLogin(e);
    });
  }

  initSignupForm() {
    if (!this.signupForm) return;

    this.signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.handleSignup(e);
    });

    // Password confirmation validation
    const password = this.signupForm.querySelector('#password');
    const confirmPassword = this.signupForm.querySelector('#confirmPassword');

    if (password && confirmPassword) {
      confirmPassword.addEventListener('input', () => {
        this.validatePasswordMatch(password.value, confirmPassword.value);
      });
    }
  }

  async handleLogin(e) {
    const form = e.target;
    const submitButton = form.querySelector('.auth-submit');
    const formData = this.getFormData(form);

    // Validate form
    if (!this.validateLoginForm(formData)) {
      this.showNotification('Please fill in all required fields.', 'error');
      return;
    }

    // Show loading state
    this.setLoadingState(submitButton, true);

    try {
      // Simulate API call
      await this.simulateLogin(formData);

      this.showNotification('Welcome back! Redirecting to dashboard...', 'success');

      // Simulate redirect
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);

    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.setLoadingState(submitButton, false);
    }
  }

  async handleSignup(e) {
    const form = e.target;
    const submitButton = form.querySelector('.auth-submit');
    const formData = this.getFormData(form);

    // Validate form
    const validation = this.validateSignupForm(formData);
    if (!validation.isValid) {
      this.showNotification(validation.message, 'error');
      return;
    }

    // Show loading state
    this.setLoadingState(submitButton, true);

    try {
      // Simulate API call
      await this.simulateSignup(formData);

      this.showNotification('Account created successfully! Welcome to EduLearn!', 'success');

      // Simulate redirect
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);

    } catch (error) {
      this.showNotification(error.message, 'error');
    } finally {
      this.setLoadingState(submitButton, false);
    }
  }

  getFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  }

  validateLoginForm(data) {
    return data.email && data.password;
  }

  validateSignupForm(data) {
    // Check required fields
    if (!data.firstName || !data.lastName || !data.email || !data.password || !data.confirmPassword || !data.role) {
      return { isValid: false, message: 'Please fill in all required fields.' };
    }

    // Check email format
    if (!this.validateEmail(data.email)) {
      return { isValid: false, message: 'Please enter a valid email address.' };
    }

    // Check password strength
    if (!this.validatePasswordStrength(data.password)) {
      return { isValid: false, message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers.' };
    }

    // Check password match
    if (data.password !== data.confirmPassword) {
      return { isValid: false, message: 'Passwords do not match.' };
    }

    // Check terms agreement
    if (!data.terms) {
      return { isValid: false, message: 'Please agree to the Terms of Service and Privacy Policy.' };
    }

    return { isValid: true };
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePasswordStrength(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  validatePasswordMatch(password, confirmPassword) {
    const confirmInput = document.getElementById('confirmPassword');
    const formGroup = confirmInput.closest('.form-group');

    formGroup.classList.remove('error', 'success');

    if (confirmPassword && password !== confirmPassword) {
      formGroup.classList.add('error');
    } else if (confirmPassword && password === confirmPassword) {
      formGroup.classList.add('success');
    }
  }

  async simulateLogin(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate different login scenarios
    if (data.email === 'demo@edulearn.com' && data.password === 'password') {
      return { success: true, user: { name: 'Demo User', email: data.email } };
    } else if (data.email === 'admin@edulearn.com') {
      throw new Error('Invalid credentials. Please check your email and password.');
    } else {
      return { success: true, user: { name: 'User', email: data.email } };
    }
  }

  async simulateSignup(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulate email already exists scenario
    if (data.email === 'taken@example.com') {
      throw new Error('An account with this email already exists.');
    }

    return { success: true, user: { name: `${data.firstName} ${data.lastName}`, email: data.email } };
  }

  setLoadingState(button, loading) {
    if (loading) {
      button.classList.add('loading');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.disabled = false;
    }
  }

  initPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const input = toggle.previousElementSibling;
        const icon = toggle.querySelector('i');

        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
      });
    });
  }

  initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;

    passwordInput.addEventListener('input', (e) => {
      this.updatePasswordStrength(e.target.value);
    });
  }

  updatePasswordStrength(password) {
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');

    if (!strengthBars.length) return;

    // Reset bars
    strengthBars.forEach(bar => {
      bar.className = 'strength-bar';
    });

    if (!password) {
      strengthText.textContent = 'Password strength';
      return;
    }

    let strength = 0;
    let strengthLabel = '';

    // Check length
    if (password.length >= 8) strength++;

    // Check for lowercase
    if (/[a-z]/.test(password)) strength++;

    // Check for uppercase
    if (/[A-Z]/.test(password)) strength++;

    // Check for numbers
    if (/\d/.test(password)) strength++;

    // Check for special characters
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;

    // Update bars and text
    switch (strength) {
      case 0:
      case 1:
        strengthBars[0].classList.add('weak');
        strengthLabel = 'Weak';
        break;
      case 2:
        strengthBars[0].classList.add('fair');
        strengthBars[1].classList.add('fair');
        strengthLabel = 'Fair';
        break;
      case 3:
        strengthBars[0].classList.add('good');
        strengthBars[1].classList.add('good');
        strengthBars[2].classList.add('good');
        strengthLabel = 'Good';
        break;
      case 4:
      case 5:
        strengthBars.forEach(bar => bar.classList.add('strong'));
        strengthLabel = 'Strong';
        break;
    }

    strengthText.textContent = `Password strength: ${strengthLabel}`;
  }

  showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.auth-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `auth-notification auth-notification-${type}`;

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
      <div class="auth-notification-content">
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
      </div>
      <button class="auth-notification-close">
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

    // Style components
    const content = notification.querySelector('.auth-notification-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
      flex: 1;
    `;

    const closeBtn = notification.querySelector('.auth-notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 5px;
      border-radius: 3px;
      transition: background-color 0.2s ease;
    `;

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