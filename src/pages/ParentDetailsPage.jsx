import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking.js';

const TIME_CHIPS_MORNING = ['09:00 AM', '10:30 AM', '11:00 AM'];
const TIME_CHIPS_AFTERNOON = [
  { time: '01:00 PM', disabled: true },
  { time: '02:30 PM', disabled: false },
  { time: '04:00 PM', disabled: false }
];

export default function ParentDetailsPage() {
  const navigate = useNavigate();
  const { selectedTime, setTime, formData, updateFormData } = useBooking();

  const [touched, setTouched] = useState({
    parentName: false,
    email: false,
    phone: false,
    childName: false,
    childAge: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Booking Flow - KiddoTour";
  }, []);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    // Check if phone has at least 7 digits (ignoring symbols)
    return phone.trim().replace(/[^0-9]/g, '').length >= 7;
  };

  // Run validation on fields
  const getFieldError = (name, value) => {
    if (name === 'parentName') {
      if (!value || !value.trim()) return 'Parent name is required';
    }
    if (name === 'email') {
      if (!value || !value.trim()) return 'Email is required';
      if (!validateEmail(value)) return 'Invalid email address';
    }
    if (name === 'phone') {
      if (!value || !value.trim()) return 'Phone number is required';
      if (!validatePhone(value)) return 'Phone number must be at least 7 digits';
    }
    if (name === 'childName') {
      if (!value || !value.trim()) return 'Child name is required';
    }
    if (name === 'childAge') {
      if (!value) return 'Child age is required';
    }
    return null;
  };

  // Perform validation on mount/change
  useEffect(() => {
    const newErrors = {};
    Object.keys(touched).forEach((key) => {
      const err = getFieldError(key, formData[key]);
      if (err) {
        newErrors[key] = err;
      }
    });
    setErrors(newErrors);
  }, [formData, touched]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleChange = (field, val) => {
    updateFormData(field, val);
  };

  const handleReviewBooking = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Touch all fields to trigger validation styles
    const allTouched = {
      parentName: true,
      email: true,
      phone: true,
      childName: true,
      childAge: true
    };
    setTouched(allTouched);

    const newErrors = {};
    let firstErrorField = null;

    Object.keys(allTouched).forEach((key) => {
      const err = getFieldError(key, formData[key]);
      if (err) {
        newErrors[key] = err;
        if (!firstErrorField) {
          firstErrorField = key;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Focus first error field if any
      if (firstErrorField) {
        const el = document.getElementById(firstErrorField);
        el?.focus();
      }
      return;
    }

    // If valid, navigate to confirmation
    navigate('/confirmation');
  };

  // Helper to determine border, bg, label and icon classes for form fields
  const getFieldStatus = (field) => {
    const value = formData[field];
    const hasError = errors[field];
    const isTouched = touched[field] || isSubmitted;

    if (isTouched && hasError) {
      return {
        inputClass: 'border-error/50 bg-error-container/10 focus:border-error focus:ring-error/20',
        labelClass: 'text-error peer-focus:text-error',
        icon: <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-error">error</span>
      };
    }

    if (isTouched && !hasError && value && String(value).trim()) {
      return {
        inputClass: 'border-success/50 bg-white/50 focus:border-success focus:ring-success/20',
        labelClass: 'text-success peer-focus:text-success',
        icon: <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-success">check_circle</span>
      };
    }

    return {
      inputClass: 'border-outline-variant/50 bg-white/50 focus:border-primary focus:ring-primary/20',
      labelClass: 'text-outline peer-focus:text-primary',
      icon: null
    };
  };

  return (
    <div className="mesh-bg text-on-surface font-body-md min-h-screen pb-[120px]">
      <style>{`
        body {
            background-color: #fcf8ff;
            background-image: 
                radial-gradient(at 0% 0%, hsla(253,100%,96%,1) 0, transparent 50%), 
                radial-gradient(at 50% 0%, hsla(225,100%,97%,1) 0, transparent 50%), 
                radial-gradient(at 100% 0%, hsla(277,100%,96%,1) 0, transparent 50%);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.4);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 24px 48px -12px rgba(124, 58, 237, 0.08);
        }
        
        .time-chip {
            position: relative;
            background: white;
            background-clip: padding-box;
            border: 1px solid transparent;
            transition: all 0.3s ease;
        }
        .time-chip::before {
            content: '';
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            z-index: -1;
            margin: -1px;
            border-radius: inherit;
            background: linear-gradient(135deg, #e3dfff, #efebff);
            transition: opacity 0.3s ease;
        }
        .time-chip:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(124, 58, 237, 0.08);
        }
        .time-chip:hover::before {
            background: linear-gradient(135deg, #d2bbff, #eaddff);
        }
        .time-chip.selected {
            background: linear-gradient(135deg, #f6f2ff, #efebff);
            border-color: transparent;
        }
        .time-chip.selected::before {
            background: linear-gradient(135deg, #8127cf, #630ed4);
        }

        .stepper-line {
            background-image: linear-gradient(90deg, #10B981 0%, #10B981 50%, #e3dfff 50%, #e3dfff 100%);
            background-size: 200% 100%;
            animation: fillLine 1s ease-out forwards;
        }
        @keyframes fillLine {
            from { background-position: 100% 0; }
            to { background-position: 0 0; }
        }
        
        .pulse-ring {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 0); }
        }

        .btn-glow {
            background: linear-gradient(135deg, #8127cf, #630ed4);
            box-shadow: 0 4px 14px 0 rgba(99, 14, 212, 0.25), 0 0 20px 0 rgba(124, 58, 237, 0.2);
            transition: all 0.3s ease;
        }
        .btn-glow:hover {
            box-shadow: 0 6px 20px rgba(99, 14, 212, 0.4), 0 0 24px rgba(124, 58, 237, 0.3);
            transform: translateY(-2px);
        }
        
        .fade-in-section {
            opacity: 1;
            transform: none;
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl dark:bg-surface/80 border-b border-surface-variant/50 shadow-sm">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200" onClick={() => navigate('/booking')}>
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
            <span className="font-label-md text-label-md text-on-surface-variant hidden md:block">Back</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary">child_care</span>
            <span className="font-headline-md text-headline-md font-bold text-primary">KiddoTour</span>
          </div>
          <div className="w-8 md:w-16"></div>
        </div>
      </header>

      <main className="pt-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Animated Stepper */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-between relative px-2">
            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-surface-variant rounded-full z-0"></div>
            <div className="absolute left-6 w-[66%] top-1/2 -translate-y-1/2 h-1 stepper-line rounded-full z-0"></div>
            {/* Step 1: Completed */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-mesh-bg">
              <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-transform hover:scale-110">
                <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant absolute -bottom-6 whitespace-nowrap hidden md:block">Centre</span>
            </div>
            {/* Step 2: Completed */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-mesh-bg">
              <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.4)] transition-transform hover:scale-110">
                <span className="material-symbols-outlined text-white text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant absolute -bottom-6 whitespace-nowrap hidden md:block">Date</span>
            </div>
            {/* Step 3: Active */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-mesh-bg">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center pulse-ring">
                <span className="font-label-md text-label-md text-white">3</span>
              </div>
              <span className="font-label-sm text-label-sm text-primary font-bold absolute -bottom-6 whitespace-nowrap hidden md:block">Time &amp; Details</span>
            </div>
            {/* Step 4: Pending */}
            <div className="relative z-10 flex flex-col items-center gap-3 bg-mesh-bg">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center border-2 border-surface-variant text-outline">
                <span className="font-label-md text-label-md">4</span>
              </div>
              <span className="font-label-sm text-label-sm text-outline absolute -bottom-6 whitespace-nowrap hidden md:block">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {/* Step 3: Time Slots Card */}
          <section className="glass-card rounded-2xl p-8 md:p-10 fade-in-section">
            <h2 className="font-headline-md text-headline-md mb-2 text-on-surface tracking-tight">Select a Time</h2>
            <p className="text-on-surface-variant mb-8 font-body-md text-body-md">Choose a convenient slot for your tour.</p>
            <div className="space-y-8">
              {/* Morning */}
              <div>
                <h3 className="font-headline-md text-[18px] text-on-surface mb-4 flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-primary">light_mode</span> Morning
                </h3>
                <div className="flex flex-wrap gap-4">
                  {TIME_CHIPS_MORNING.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        aria-pressed={isSelected}
                        onClick={() => setTime(time)}
                        className={`time-chip px-6 py-3 rounded-xl font-label-md text-label-md outline-none flex items-center gap-2 ${
                          isSelected ? 'selected text-primary shadow-sm' : 'text-on-surface'
                        }`}
                      >
                        {time}
                        {isSelected && <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* Afternoon */}
              <div>
                <h3 className="font-headline-md text-[18px] text-on-surface mb-4 flex items-center gap-2 font-semibold">
                  <span className="material-symbols-outlined text-primary">wb_sunny</span> Afternoon
                </h3>
                <div className="flex flex-wrap gap-4">
                  {TIME_CHIPS_AFTERNOON.map((slot) => {
                    if (slot.disabled) {
                      return (
                        <button
                          key={slot.time}
                          disabled
                          className="px-6 py-3 rounded-xl border border-outline-variant/30 bg-surface-container-lowest/50 text-outline font-label-md text-label-md outline-none cursor-not-allowed"
                        >
                          {slot.time}
                        </button>
                      );
                    }
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        aria-pressed={isSelected}
                        onClick={() => setTime(slot.time)}
                        className={`time-chip px-6 py-3 rounded-xl font-label-md text-label-md outline-none flex items-center gap-2 ${
                          isSelected ? 'selected text-primary shadow-sm' : 'text-on-surface'
                        }`}
                      >
                        {slot.time}
                        {isSelected && <span className="material-symbols-outlined text-[16px] text-primary">check_circle</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Step 4: Parent Details Form */}
          <section className="glass-card rounded-2xl p-8 md:p-10 fade-in-section">
            <h2 className="font-headline-md text-headline-md mb-2 text-on-surface tracking-tight">Your Details</h2>
            <p className="text-on-surface-variant mb-8 font-body-md text-body-md">We need a few details to confirm your booking.</p>
            <form onSubmit={handleReviewBooking} className="space-y-6">
              {/* Parent Name */}
              <div className="relative">
                <input
                  className={`peer w-full rounded-xl border px-4 pb-2 pt-6 text-on-surface focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder-transparent ${getFieldStatus('parentName').inputClass}`}
                  id="parentName"
                  placeholder="Parent Name"
                  type="text"
                  value={formData.parentName}
                  onChange={(e) => handleChange('parentName', e.target.value)}
                  onBlur={() => handleBlur('parentName')}
                />
                <label className={`absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-outline peer-focus:top-2 peer-focus:text-xs pointer-events-none ${getFieldStatus('parentName').labelClass}`} htmlFor="parentName">Parent Name</label>
                {getFieldStatus('parentName').icon}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="relative">
                  <input
                    className={`peer w-full rounded-xl border px-4 pb-2 pt-6 text-on-surface focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder-transparent ${getFieldStatus('email').inputClass}`}
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                  />
                  <label className={`absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-outline peer-focus:top-2 peer-focus:text-xs pointer-events-none ${getFieldStatus('email').labelClass}`} htmlFor="email">Email Address</label>
                  {getFieldStatus('email').icon}
                </div>
                {/* Phone */}
                <div className="relative">
                  <input
                    className={`peer w-full rounded-xl border px-4 pb-2 pt-6 text-on-surface focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder-transparent ${getFieldStatus('phone').inputClass}`}
                    id="phone"
                    placeholder="Phone Number"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                  />
                  <label className={`absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-outline peer-focus:top-2 peer-focus:text-xs pointer-events-none ${getFieldStatus('phone').labelClass}`} htmlFor="phone">Phone Number</label>
                  {getFieldStatus('phone').icon}
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent my-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Child Name */}
                <div className="relative">
                  <input
                    className={`peer w-full rounded-xl border px-4 pb-2 pt-6 text-on-surface focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder-transparent ${getFieldStatus('childName').inputClass}`}
                    id="childName"
                    placeholder="Child's Name"
                    type="text"
                    value={formData.childName}
                    onChange={(e) => handleChange('childName', e.target.value)}
                    onBlur={() => handleBlur('childName')}
                  />
                  <label className={`absolute left-4 top-2 text-xs font-medium transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-outline peer-focus:top-2 peer-focus:text-xs pointer-events-none ${getFieldStatus('childName').labelClass}`} htmlFor="childName">Child's Name</label>
                  {getFieldStatus('childName').icon}
                </div>
                {/* Child Age */}
                <div className="relative">
                  <select
                    className={`peer w-full rounded-xl border px-4 pb-2 pt-6 text-on-surface focus:bg-white focus:outline-none focus:ring-2 transition-all appearance-none ${getFieldStatus('childAge').inputClass}`}
                    id="childAge"
                    value={formData.childAge}
                    onChange={(e) => handleChange('childAge', e.target.value)}
                    onBlur={() => handleBlur('childAge')}
                  >
                    <option value="" disabled hidden></option>
                    <option value="infant">Under 1 year</option>
                    <option value="toddler">1-3 years</option>
                    <option value="preschool">3-5 years</option>
                  </select>
                  <label className={`absolute left-4 top-2 text-xs font-medium transition-all pointer-events-none ${getFieldStatus('childAge').labelClass}`} htmlFor="childAge">Age</label>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <span className="material-symbols-outlined text-outline">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* Preferred Language */}
                <div className="relative">
                  <select
                    className="peer w-full rounded-xl border border-outline-variant/50 bg-white/50 px-4 pb-2 pt-6 text-on-surface focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
                    id="language"
                    value={formData.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                  >
                    <option value="" disabled hidden></option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="absolute left-4 top-2 text-xs font-medium text-outline transition-all peer-focus:text-primary pointer-events-none" htmlFor="language">Preferred Language (Optional)</label>
                  <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                    <span className="material-symbols-outlined text-outline">expand_more</span>
                  </div>
                </div>
                {/* Special Requirements */}
                <div className="relative">
                  <textarea
                    className="peer w-full rounded-xl border border-outline-variant/50 bg-white/50 px-4 pb-2 pt-6 text-on-surface focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder-transparent resize-none h-24"
                    id="requirements"
                    placeholder="Special Requirements"
                    value={formData.requirements}
                    onChange={(e) => handleChange('requirements', e.target.value)}
                  ></textarea>
                  <label className="absolute left-4 top-2 text-xs font-medium text-outline transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary pointer-events-none" htmlFor="requirements">Special Requirements (Optional)</label>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-surface-variant/50 p-4 shadow-[0_-4px_24px_rgba(0,0,0,0.02)] z-50">
        <div className="max-w-2xl mx-auto">
          <button 
            type="button"
            onClick={handleReviewBooking}
            className="btn-glow w-full py-4 rounded-xl text-white font-label-md text-label-md flex items-center justify-center gap-2"
          >
            Review Booking <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <p className="text-center text-outline-variant font-label-sm text-label-sm mt-2">You won't be charged yet.</p>
        </div>
      </div>
    </div>
  );
}
