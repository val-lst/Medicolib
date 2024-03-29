import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import AdminRouter from './pages/admin/AdminRouter';
import PublicRouter from './pages/public/PublicRouter';
import AuthGuard from './pages/users/Authentification/AuthGuard';
import Error from './utils/Error';
import DoctorRouter from './pages/Doctor/DoctorRouter';
import AuthGuardDoctor from './pages/users/Authentification/AuthGuardDoctor';
import AuthGuardPatient from './pages/users/Authentification/AuthGuardPatient';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <AuthGuardDoctor>
              <PublicRouter />
          </AuthGuardDoctor>} 
        />
        <Route path="/patient/*" element={
          <AuthGuard>
            <AuthGuardDoctor>
              <AdminRouter />
            </AuthGuardDoctor>
          </AuthGuard>} />
        <Route path="/doctor/*" element={
          <AuthGuard>
            <AuthGuardPatient>
              <DoctorRouter />
            </AuthGuardPatient>
          </AuthGuard>} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
