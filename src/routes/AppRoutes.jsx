import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const LandingPage = React.lazy(() => import('../pages/LandingPage.jsx'));
const BookingSelectionPage = React.lazy(() => import('../pages/BookingSelectionPage.jsx'));
const ParentDetailsPage = React.lazy(() => import('../pages/ParentDetailsPage.jsx'));
const ConfirmationPage = React.lazy(() => import('../pages/ConfirmationPage.jsx'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage.jsx'));

export default function AppRoutes({ location }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#fcf8ff]" style={{ fontFamily: "'Plus Jakarta Sans', Inter, sans-serif" }}>
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
          <span className="text-sm font-semibold text-violet-600 tracking-wide">Loading KiddoTour...</span>
        </div>
      </div>
    }>
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<BookingSelectionPage />} />
        <Route path="/details" element={<ParentDetailsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

