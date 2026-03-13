import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import './app.css';
import { Toaster } from 'sonner';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-right" richColors />

    <App />
  </StrictMode>,
)
