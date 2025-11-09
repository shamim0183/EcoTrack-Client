import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/ClientRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';
import AuthProvider from './provider/AuthProvider.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
        <ToastContainer />
    </AuthProvider>
  </StrictMode>
)
