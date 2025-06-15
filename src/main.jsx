import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './variaveis.css';
import 'normalize.css';
import './index.css';
import App from './App.jsx';
// </StrictMode>
// <StrictMode>

createRoot(document.getElementById('root')).render(<App />);
