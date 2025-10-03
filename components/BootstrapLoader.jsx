'use client';

import { useEffect } from 'react';

export default function BootstrapLoader() {
  useEffect(() => {
    // Function to check if Bootstrap CSS is loaded
    const checkBootstrapLoaded = () => {
      // Check if bootstrap classes are available by creating a test element
      const testElement = document.createElement('div');
      testElement.className = 'container';
      testElement.style.position = 'absolute';
      testElement.style.visibility = 'hidden';
      document.body.appendChild(testElement);
      
      const computedStyle = window.getComputedStyle(testElement);
      const hasBootstrap = computedStyle.maxWidth !== 'none' && computedStyle.maxWidth !== '';
      
      document.body.removeChild(testElement);
      return hasBootstrap;
    };

    // Fallback function to load local Bootstrap
    const loadLocalBootstrap = () => {
      console.warn('CDN Bootstrap failed, loading local fallback...');
      
      // Load local Bootstrap CSS
      const localCSS = document.createElement('link');
      localCSS.rel = 'stylesheet';
      localCSS.href = '/css/bootstrap.min.css';
      localCSS.onload = () => console.log('Local Bootstrap CSS loaded');
      localCSS.onerror = () => console.error('Failed to load local Bootstrap CSS');
      document.head.appendChild(localCSS);
      
      // Load local Bootstrap Icons
      const localIcons = document.createElement('link');
      localIcons.rel = 'stylesheet';
      localIcons.href = '/css/bootstrap-icons.css';
      localIcons.onload = () => console.log('Local Bootstrap Icons loaded');
      localIcons.onerror = () => console.error('Failed to load local Bootstrap Icons');
      document.head.appendChild(localIcons);
    };

    // Check if Bootstrap loaded from CDN after a short delay
    const timeoutId = setTimeout(() => {
      if (!checkBootstrapLoaded()) {
        loadLocalBootstrap();
      }
    }, 3000); // 3 second timeout

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return null; // This component doesn't render anything
}