// serviceWorker.js
// Example service worker registration code
// (Service worker logic should be customized based on caching strategies and other PWA needs)
const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('Service Worker registered:', registration);
          })
          .catch((error) => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  };
  
  export default registerServiceWorker;