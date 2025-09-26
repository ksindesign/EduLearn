// Course Cards Component
export class CourseCards {
  constructor() {
    this.init();
  }

  init() {
    this.initEnrollmentButtons();
    this.initToastNotifications();
  }

  initEnrollmentButtons() {
    // Course enrollment tracking (mock functionality)
    document.querySelectorAll('.course-card .btn-primary').forEach((btn, index) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();

        const courseTitle = btn.closest('.course-card').querySelector('h3').textContent;
        this.showEnrollmentSuccess(courseTitle);
      });
    });
  }

  showEnrollmentSuccess(courseTitle) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--success-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      animation: slideInRight 0.5s ease;
      font-family: 'Inter', sans-serif;
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    toast.innerHTML = `<i class="fas fa-check-circle"></i> Successfully enrolled in ${courseTitle}!`;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  initToastNotifications() {
    // Add toast animations if not already present
    if (!document.querySelector('#toast-animations')) {
      const toastStyle = document.createElement('style');
      toastStyle.id = 'toast-animations';
      toastStyle.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(toastStyle);
    }
  }
}