import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContext from './context/AuthContext.jsx';
import { router } from './routes/ClientRoutes.jsx';
import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <RouterProvider router={router}/>
        <ToastContainer />
    </AuthContext>
  </StrictMode>
)
