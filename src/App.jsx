import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { BookingProvider } from './context/BookingContext.jsx';

export default function App() {
  const location = useLocation();

  return (
    <BookingProvider>
      <AnimatePresence mode="wait">
        <AppRoutes key={location.pathname} location={location} />
      </AnimatePresence>
    </BookingProvider>
  );
}

