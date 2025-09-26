// Main JavaScript file - initializes all modules
// ==============================================

// Import all modules
import { Navigation } from './modules/navigation.js';
import { Animations } from './modules/animations.js';
import { ContactForm } from './components/contactForm.js';
import { CourseCards } from './components/courseCards.js';
import { AuthForms } from './components/authForms.js';
import { ErrorPage } from './components/errorPage.js';
import { ButtonEffects } from './utils/buttons.js';
import { ScrollToTop } from './utils/scrollToTop.js';
import { PageLoader } from './utils/pageLoader.js';

// Main App Class
class EduLearnApp {
  constructor() {
    this.modules = {};
    this.init();
  }

  async init() {
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initializeModules());
      } else {
        this.initializeModules();
      }

      console.log('EduLearn website loaded successfully! 🚀');
    } catch (error) {
      console.error('Error initializing EduLearn app:', error);
    }
  }

  initializeModules() {
    try {
      // Initialize core modules
      this.modules.navigation = new Navigation();
      this.modules.animations = new Animations();

      // Initialize components
      this.modules.contactForm = new ContactForm();
      this.modules.courseCards = new CourseCards();
      this.modules.authForms = new AuthForms();
      this.modules.errorPage = new ErrorPage();

      // Initialize utilities
      this.modules.buttonEffects = new ButtonEffects();
      this.modules.scrollToTop = new ScrollToTop();
      this.modules.pageLoader = new PageLoader();

      console.log('All modules initialized successfully');
    } catch (error) {
      console.error('Error initializing modules:', error);
    }
  }

  // Public method to get module instance
  getModule(moduleName) {
    return this.modules[moduleName];
  }

  // Public method to reinitialize specific module
  reinitModule(moduleName) {
    const moduleClasses = {
      navigation: Navigation,
      animations: Animations,
      contactForm: ContactForm,
      courseCards: CourseCards,
      authForms: AuthForms,
      errorPage: ErrorPage,
      buttonEffects: ButtonEffects,
      scrollToTop: ScrollToTop,
      pageLoader: PageLoader
    };

    if (moduleClasses[moduleName]) {
      this.modules[moduleName] = new moduleClasses[moduleName]();
      console.log(`Module ${moduleName} reinitialized`);
    } else {
      console.warn(`Module ${moduleName} not found`);
    }
  }
}

// Initialize the app
const app = new EduLearnApp();

// Make app globally available for debugging
window.EduLearnApp = app;

// Export for potential external use
export default EduLearnApp;