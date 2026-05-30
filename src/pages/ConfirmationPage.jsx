import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking.js';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const { selectedCentre, selectedDate, selectedTime, formData, resetBooking } = useBooking();
  
  // Generate a random booking ID once on mount
  const [bookingId] = useState(() => {
    return `#KT-${Math.floor(1000 + Math.random() * 9000)}-VL`;
  });

  useEffect(() => {
    document.title = "KiddoTour - Tour Successfully Scheduled";
  }, []);

  const getEndTime = (startTime) => {
    if (startTime === '09:00 AM') return '10:00 AM';
    if (startTime === '10:30 AM') return '11:30 AM';
    if (startTime === '11:00 AM') return '12:00 PM';
    if (startTime === '01:00 PM') return '02:00 PM';
    if (startTime === '02:30 PM') return '03:30 PM';
    if (startTime === '04:00 PM') return '05:00 PM';
    return '11:30 AM';
  };

  const getPreschoolAddress = (centre) => {
    if (centre === "Little Sprouts Academy") {
      return "123 Montessori Boulevard, Downtown";
    }
    if (centre === "Nature's Path ELC") {
      return "456 Westside Nature Trail, Westside";
    }
    return "123 Education Lane, Learningville";
  };

  const getFormattedDate = (day) => {
    // Add ordinal suffix
    let suffix = 'th';
    const dayNum = parseInt(day, 10);
    if (dayNum === 1 || dayNum === 21 || dayNum === 31) suffix = 'st';
    else if (dayNum === 2 || dayNum === 22) suffix = 'nd';
    else if (dayNum === 3 || dayNum === 23) suffix = 'rd';

    return `October ${day}${suffix}, 2026`;
  };

  const handleBackToHome = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col mesh-bg relative overflow-x-hidden font-body-md">
      <style>{`
        body {
            background-color: #fcf8ff;
            background-image: 
                radial-gradient(at 80% 0%, hsla(271,78%,85%,0.6) 0px, transparent 50%),
                radial-gradient(at 20% 100%, hsla(271,78%,85%,0.6) 0px, transparent 50%);
            min-height: max(884px, 100dvh);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 12px 40px 0 rgba(138, 43, 226, 0.08), inset 0 1px 0 rgba(255,255,255,0.9);
        }

        .btn-primary-gradient {
            background: linear-gradient(135deg, #8A2BE2 0%, #630ed4 100%);
            box-shadow: 0 8px 20px 0 rgba(138, 43, 226, 0.3);
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-primary-gradient:hover {
            box-shadow: 0 10px 25px 0 rgba(138, 43, 226, 0.4);
            transform: translateY(-2px);
        }

        .success-glow {
            box-shadow: 0 0 60px 20px rgba(138, 43, 226, 0.2);
        }

        .animate-pop-in {
            opacity: 1;
            transform: none;
        }

        .animate-card-in {
            opacity: 1;
            transform: none;
        }

        .confetti-particle {
            position: absolute;
            width: 8px;
            height: 16px;
            border-radius: 4px;
            background-color: #8A2BE2;
            animation: confetti-fall 3s ease-out infinite;
            opacity: 0;
        }
        .c1 { top: -20px; left: 10%; background-color: #22C55E; animation-delay: 0.1s; transform: rotate(15deg); }
        .c2 { top: -10px; left: 30%; background-color: #ffb784; animation-delay: 0.5s; width: 6px; height: 12px; transform: rotate(-25deg); }
        .c3 { top: -30px; left: 60%; background-color: #8A2BE2; animation-delay: 0.2s; width: 10px; height: 20px; transform: rotate(45deg); }
        .c4 { top: -15px; left: 80%; background-color: #38bdf8; animation-delay: 0.7s; transform: rotate(-15deg); }
        .c5 { top: -10px; left: 90%; background-color: #f43f5e; animation-delay: 0.4s; width: 6px; height: 12px; transform: rotate(35deg); }
        .c6 { top: -20px; left: 5%; background-color: #fbbf24; animation-delay: 0.8s; transform: rotate(-45deg); }
        .c7 { top: -40px; left: 45%; background-color: #a855f7; animation-delay: 0.3s; width: 8px; height: 16px; transform: rotate(10deg); }
        .c8 { top: -25px; left: 70%; background-color: #10b981; animation-delay: 0.6s; width: 12px; height: 12px; border-radius: 50%; transform: rotate(0deg); }

        @keyframes confetti-fall {
            0% { transform: translateY(-50px) rotate(0deg) scale(1); opacity: 1; }
            50% { opacity: 1; }
            100% { transform: translateY(200px) rotate(360deg) scale(0.5); opacity: 0; }
        }
        
        .press-effect:active {
            transform: scale(0.97);
            transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      <main className="flex-grow flex items-center justify-center py-stack-xl px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="max-w-2xl w-full mx-auto flex flex-col items-center">
          {/* Success Animation/Icon Area */}
          <div className="mb-stack-md relative animate-pop-in mt-8">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center success-glow relative z-10 border-2 border-electric-purple/20 shadow-xl">
              <span className="material-symbols-outlined text-[64px] text-[#8A2BE2]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            {/* Confetti */}
            <div className="absolute -inset-20 z-20 pointer-events-none overflow-visible">
              <div className="confetti-particle c1"></div>
              <div className="confetti-particle c2"></div>
              <div className="confetti-particle c3"></div>
              <div className="confetti-particle c4"></div>
              <div className="confetti-particle c5"></div>
              <div className="confetti-particle c6"></div>
              <div className="confetti-particle c7"></div>
              <div className="confetti-particle c8"></div>
            </div>
            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-2 border-electric-purple/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] z-0"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-electric-purple/10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] z-0" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Headline */}
          <div className="text-center mb-stack-lg animate-pop-in">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-stack-xs text-electric-purple font-extrabold tracking-tight">
              Tour Successfully Scheduled
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
              We've sent a confirmation email with all the details. We look forward to showing you around!
            </p>
          </div>

          {/* Summary Card */}
          <div className="glass-card w-full rounded-2xl p-8 mb-stack-lg relative overflow-hidden animate-card-in">
            {/* Decorative Top Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-electric-purple via-secondary-container to-tertiary-fixed-dim"></div>
            <div className="flex flex-col space-y-6">
              {/* Header Section inside card */}
              <div className="flex justify-between items-start border-b border-outline-variant/30 pb-6">
                <div>
                  <p className="font-label-sm text-label-sm text-electric-purple uppercase tracking-widest mb-1">Booking ID</p>
                  <p className="font-headline-md text-headline-md text-on-surface font-extrabold tracking-tight">{bookingId}</p>
                </div>
                <div className="bg-green-50 px-3 py-1.5 rounded-full flex items-center border border-green-200 shadow-sm">
                  <span className="material-symbols-outlined text-[16px] text-green-600 mr-1.5" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="font-label-sm text-label-sm text-green-700">Confirmed</span>
                </div>
              </div>
              
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Centre Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-electric-purple/10 flex items-center justify-center flex-shrink-0 shadow-sm border border-electric-purple/20">
                    <span className="material-symbols-outlined text-electric-purple">school</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Preschool</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">{selectedCentre}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">{getPreschoolAddress(selectedCentre)}</p>
                  </div>
                </div>
                
                {/* Date & Time Info */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-electric-purple/10 flex items-center justify-center flex-shrink-0 shadow-sm border border-electric-purple/20">
                    <span className="material-symbols-outlined text-electric-purple">event</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Date &amp; Time</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">{getFormattedDate(selectedDate)}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">{selectedTime} - {getEndTime(selectedTime)} (EST)</p>
                  </div>
                </div>
                
                {/* Parent Info */}
                <div className="flex items-start space-x-4 md:col-span-2">
                  <div className="w-12 h-12 rounded-xl bg-electric-purple/10 flex items-center justify-center flex-shrink-0 shadow-sm border border-electric-purple/20">
                    <span className="material-symbols-outlined text-electric-purple">person</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1">Visitor Details</p>
                    <p className="font-body-md text-body-md text-on-surface font-semibold">
                      {formData.parentName} {formData.childName ? `& child ${formData.childName}` : ''}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant text-sm mt-1">{formData.email} • {formData.phone}</p>
                  </div>
                </div>
              </div>
              
              {/* Extra Features Section */}
              <div className="pt-6 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Map Preview */}
                <div className="rounded-xl overflow-hidden border border-outline-variant/30 h-28 relative shadow-inner bg-surface-container-low">
                  <div role="img" aria-label="Decorative street map" className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')] bg-cover bg-center grayscale"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-electric-purple/30 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-electric-purple text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
                    <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                  </div>
                </div>
                {/* QR Code Pass */}
                <div className="flex items-center space-x-4 p-4 bg-white/80 rounded-xl border border-electric-purple/20 shadow-sm">
                  <img alt="KiddoTour booking scan pass QR code for reception scan-in" className="w-[72px] h-[72px] rounded-lg bg-white p-1.5 shadow-sm border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChRdEIZCzhxZtulJoCEh12cP6sQhaVmvE6dwzNbO8CkbZ6A2Zg1qvL18pG5qLsSYj-bQ3kHoCt2ozVGdtgUhXNL6n4Sob22EiNpBFCqoDFXSgh2KjOCSnUV1DrDef77PDzJLiZWxC0_jYov5K5QNSsqyCloh37KSdsfD3UASPezNm4F0gRiYNfQtwuZS6pWLMmvJg0IHHK8pFLrrPMYNlRu3Aec_yr1GRWcIynVDUai8YYdF1fksVmQSNZjG0ryzJATkTBp8lZDsw"/>
                  <div>
                    <p className="font-label-md text-on-surface font-bold mb-0.5">Your Booking Pass</p>
                    <p className="font-body-md text-on-surface-variant text-xs leading-tight">Ready to scan at reception.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="w-full max-w-lg flex flex-col space-y-4 animate-card-in" style={{ animationDelay: '0.2s' }}>
            <button className="btn-primary-gradient w-full py-4 rounded-xl flex justify-center items-center font-label-md text-label-md text-white text-lg press-effect" onClick={(e) => e.preventDefault()}>
              <span className="material-symbols-outlined mr-2">calendar_add_on</span>
              Add to Calendar
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="w-full py-3 rounded-xl border border-electric-purple/30 bg-white/70 backdrop-blur-sm hover:bg-white transition-colors flex justify-center items-center font-label-md text-label-md text-electric-purple shadow-sm press-effect" onClick={(e) => e.preventDefault()}>
                <span className="material-symbols-outlined mr-2 text-[20px]">qr_code_scanner</span>
                Save QR
              </button>
              <button className="w-full py-3 rounded-xl border border-electric-purple/30 bg-white/70 backdrop-blur-sm hover:bg-white transition-colors flex justify-center items-center font-label-md text-label-md text-electric-purple shadow-sm press-effect" onClick={(e) => e.preventDefault()}>
                <span className="material-symbols-outlined mr-2 text-[20px]">ios_share</span>
                Share Booking
              </button>
              <button className="w-full py-3 rounded-xl border border-outline-variant bg-white hover:bg-surface-container-low transition-colors flex justify-center items-center font-label-md text-label-md text-on-surface shadow-sm press-effect" onClick={(e) => e.preventDefault()}>
                <span className="material-symbols-outlined mr-2 text-[20px]">download</span>
                Download PDF
              </button>
              <button className="w-full py-3 rounded-xl border border-outline-variant bg-white hover:bg-surface-container-low transition-colors flex justify-center items-center font-label-md text-label-md text-on-surface shadow-sm press-effect transition-transform" onClick={handleBackToHome}>
                <span className="material-symbols-outlined mr-2 text-[20px]">home</span>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
