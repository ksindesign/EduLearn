// 404 Error Page Component
export class ErrorPage {
  constructor() {
    this.searchInput = document.getElementById('searchInput');
    this.init();
  }

  init() {
    this.initSearchFunctionality();
    this.initSearchSuggestions();
    this.initAnimations();
  }

  initSearchFunctionality() {
    if (!this.searchInput) return;

    const searchBtn = document.querySelector('.search-btn');
    const searchWrapper = document.querySelector('.search-wrapper');

    // Search button click
    if (searchBtn) {
      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.performSearch(this.searchInput.value);
      });
    }

    // Enter key press
    this.searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.performSearch(this.searchInput.value);
      }
    });

    // Search input focus effects
    this.searchInput.addEventListener('focus', () => {
      searchWrapper.classList.add('focused');
    });

    this.searchInput.addEventListener('blur', () => {
      if (!this.searchInput.value) {
        searchWrapper.classList.remove('focused');
      }
    });
  }

  performSearch(query) {
    if (!query.trim()) {
      this.showSearchNotification('Please enter a search term.', 'warning');
      return;
    }

    this.showSearchNotification(`Searching for "${query}"...`, 'info');

    // Simulate search process
    setTimeout(() => {
      // Simulate search results
      const suggestions = this.getSearchSuggestions(query);

      if (suggestions.length > 0) {
        this.showSearchResults(query, suggestions);
      } else {
        this.showSearchNotification('No results found. Try a different search term.', 'warning');
      }
    }, 1000);
  }

  getSearchSuggestions(query) {
    const courses = [
      'Web Development Bootcamp',
      'Python for Data Science',
      'UI/UX Design Masterclass',
      'JavaScript Fundamentals',
      'React Development',
      'Machine Learning Basics',
      'Digital Marketing',
      'Mobile App Development',
      'Database Design',
      'Cloud Computing'
    ];

    const lowerQuery = query.toLowerCase();
    return courses.filter(course =>
      course.toLowerCase().includes(lowerQuery)
    );
  }

  showSearchResults(query, suggestions) {
    const resultsHtml = suggestions.map(suggestion =>
      `<li><a href="index.html#courses">${suggestion}</a></li>`
    ).join('');

    const notification = document.createElement('div');
    notification.className = 'search-results-notification';
    notification.innerHTML = `
      <div class="search-results-content">
        <h4>Search Results for "${query}"</h4>
        <ul class="search-results-list">
          ${resultsHtml}
        </ul>
        <button class="view-all-btn" onclick="window.location.href='index.html#courses'">
          View All Courses
        </button>
      </div>
      <button class="search-results-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    // Style the notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: white;
      border: 2px solid var(--primary-color);
      border-radius: var(--border-radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      max-width: 350px;
      animation: slideInRight 0.3s ease-out;
      font-family: 'Inter', sans-serif;
      padding: 20px;
    `;

    // Style the content
    const content = notification.querySelector('.search-results-content');
    content.style.cssText = `
      h4 {
        color: var(--text-primary);
        margin-bottom: 15px;
        font-size: 1.1rem;
      }
    `;

    // Style the list
    const list = notification.querySelector('.search-results-list');
    list.style.cssText = `
      list-style: none;
      margin: 0 0 15px 0;
      padding: 0;
    `;

    // Style list items
    list.querySelectorAll('li').forEach(li => {
      li.style.cssText = `
        padding: 8px 0;
        border-bottom: 1px solid var(--border-color);
      `;

      const link = li.querySelector('a');
      if (link) {
        link.style.cssText = `
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
        `;

        link.addEventListener('mouseenter', () => {
          link.style.textDecoration = 'underline';
        });

        link.addEventListener('mouseleave', () => {
          link.style.textDecoration = 'none';
        });
      }
    });

    // Style the view all button
    const viewAllBtn = notification.querySelector('.view-all-btn');
    viewAllBtn.style.cssText = `
      width: 100%;
      padding: 10px;
      background: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: 500;
      transition: background 0.3s ease;
    `;

    viewAllBtn.addEventListener('mouseenter', () => {
      viewAllBtn.style.background = 'var(--primary-dark)';
    });

    viewAllBtn.addEventListener('mouseleave', () => {
      viewAllBtn.style.background = 'var(--primary-color)';
    });

    // Style close button
    const closeBtn = notification.querySelector('.search-results-close');
    closeBtn.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      color: var(--text-light);
      cursor: pointer;
      padding: 5px;
      border-radius: 3px;
      transition: all 0.2s ease;
    `;

    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'var(--border-color)';
      closeBtn.style.color = 'var(--text-primary)';
    });

    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'none';
      closeBtn.style.color = 'var(--text-light)';
    });

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 10 seconds
    const autoRemove = setTimeout(() => {
      this.removeNotification(notification);
    }, 10000);

    // Manual close
    closeBtn.addEventListener('click', () => {
      clearTimeout(autoRemove);
      this.removeNotification(notification);
    });
  }

  initSearchSuggestions() {
    // Add click handlers to suggestion links
    document.querySelectorAll('.suggestion-list a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Add a small animation effect
        const li = e.target.closest('li');
        if (li) {
          li.style.transform = 'scale(0.95)';
          setTimeout(() => {
            li.style.transform = 'scale(1)';
          }, 150);
        }
      });
    });
  }

  initAnimations() {
    // Initialize number animations
    this.animateErrorNumbers();
    this.initFloatingElements();
  }

  animateErrorNumbers() {
    const numbers = document.querySelectorAll('.error-number .four');
    numbers.forEach((number, index) => {
      // Add staggered animation delay
      number.style.animationDelay = `${index * 0.5}s`;
    });

    // Animate the zero rotation
    const zeroInner = document.querySelector('.zero-inner');
    if (zeroInner) {
      let rotation = 0;
      setInterval(() => {
        rotation += 1;
        zeroInner.style.transform = `rotate(${rotation}deg)`;
      }, 50);
    }
  }

  initFloatingElements() {
    // Add hover effects to floating books
    document.querySelectorAll('.book').forEach(book => {
      book.addEventListener('mouseenter', () => {
        book.style.transform = 'translateY(-10px) scale(1.1)';
        book.style.transition = 'all 0.3s ease';
      });

      book.addEventListener('mouseleave', () => {
        book.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Add click effect to confused student
    const studentFace = document.querySelector('.student-face');
    if (studentFace) {
      studentFace.addEventListener('click', () => {
        // Cycle through different confused expressions
        const expressions = ['🤔', '😕', '😵', '🤷‍♂️', '😅'];
        const currentIndex = expressions.indexOf(studentFace.textContent);
        const nextIndex = (currentIndex + 1) % expressions.length;

        studentFace.style.transform = 'scale(0.8)';
        setTimeout(() => {
          studentFace.textContent = expressions[nextIndex];
          studentFace.style.transform = 'scale(1)';
        }, 150);
      });
    }
  }

  showSearchNotification(message, type = 'info') {
    // Remove any existing search notifications
    const existingNotification = document.querySelector('.search-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `search-notification search-notification-${type}`;

    const iconMap = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };

    const colorMap = {
      success: 'var(--success-color)',
      error: 'var(--error-color)',
      warning: 'var(--warning-color)',
      info: 'var(--primary-color)'
    };

    notification.innerHTML = `
      <div class="search-notification-content">
        <i class="fas ${iconMap[type]}"></i>
        <span>${message}</span>
      </div>
    `;

    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${colorMap[type]};
      color: white;
      padding: 12px 20px;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow-lg);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: slideInUp 0.3s ease-out;
      font-family: 'Inter', sans-serif;
    `;

    const content = notification.querySelector('.search-notification-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      gap: 8px;
    `;

    document.body.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
      this.removeNotification(notification);
    }, 3000);
  }

  removeNotification(notification) {
    if (!notification || !notification.parentNode) return;

    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }
}

// Add slide animations if not already present
if (!document.querySelector('#error-animations')) {
  const style = document.createElement('style');
  style.id = 'error-animations';
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}