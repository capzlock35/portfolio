import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './index.css';
import logo from './assets/logo.png'; // <-- import your logo

// set page title
document.title = 'AWMA-QA-DEV';

// ensure there's a favicon link and set it to the imported asset
(() => {
  const head = document.getElementsByTagName('head')[0];
  let icon = head.querySelector("link[rel*='icon']");
  if (!icon) {
    icon = document.createElement('link');
    icon.rel = 'icon';
    head.appendChild(icon);
  }
  icon.type = 'image/png';
  icon.href = logo;
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
