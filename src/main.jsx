import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from "react-router-dom";
import router from './Routes/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <div className="bg-gray-50 min-h-screen">
      <RouterProvider router={router} />
    </div>

  </StrictMode>,
);