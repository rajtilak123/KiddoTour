import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Page Not Found - KiddoTour";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      backgroundColor: '#fcf8ff',
      backgroundImage: 'radial-gradient(at 0% 0%, hsla(264, 84%, 58%, 0.1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(271, 81%, 56%, 0.1) 0, transparent 50%)',
      fontFamily: "'Plus Jakarta Sans', Inter, sans-serif"
    }}>
      <style>{`
        .glass-card {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 12px 40px 0 rgba(138, 43, 226, 0.08);
        }
        .btn-primary {
            background: linear-gradient(135deg, #7c3aed 0%, #6366f1 100%);
            box-shadow: 0 4px 20px 0 rgba(124, 58, 237, 0.25);
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-primary:hover {
            box-shadow: 0 8px 30px 0 rgba(124, 58, 237, 0.35);
            transform: translateY(-2px);
        }
      `}</style>
      
      <div className="max-w-md w-full glass-card p-8 rounded-3xl text-center border-white/60">
        <div className="w-20 h-20 rounded-full bg-violet-50 flex items-center justify-center mx-auto mb-6 border border-violet-100 shadow-sm">
          <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
        </div>
        <h1 className="text-6xl font-extrabold text-primary mb-4 tracking-tighter">404</h1>
        <h2 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">Oops! Page not found</h2>
        <p className="text-slate-500 mb-8 text-sm leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <button
          onClick={() => navigate('/')}
          className="btn-primary w-full py-3.5 text-white font-bold rounded-xl active:scale-95 transition-transform text-sm"
        >
          Back to Safety (Home)
        </button>
      </div>
    </div>
  );
}
