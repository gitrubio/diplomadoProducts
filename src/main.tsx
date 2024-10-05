import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes'

import {
  BrowserRouter as Router
} from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'animate.css';
import './index.css'

createRoot(document.getElementById('root')!).render(
  
    <Router>
    <AppRoutes/>
    </Router>
)
