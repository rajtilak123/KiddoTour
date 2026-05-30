import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../hooks/useBooking.js';

const CENTRES = [
  {
    name: "Little Sprouts Academy",
    distance: "1.2 km • Downtown",
    rating: "4.9",
    tag: "Montessori",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD15Nqaw_rw-Bdmbr8I6sfRHsRfpPI0RmdPWPR3wRqvbCca9CyPCc742cRegmqlS_nXvBHnCjTTuk_stO3DksaBf4uXWOW6Pnca5zgPjyXv6I6IZRBOglZqSf7mTs587UbpLe0MxruLH7iyXH1G1wA_fcOBQIIrU0R1-Vo8Tr7RW2S3rbPdlcjM50NtUGV-pjAsR4akUSHG-eXFFy3gu8xC3kYGeX0UN8RxMHELeNQdfp5wWStVgG1BcZYoKvUuynR8y1AcaJefL1s",
    age: "0-5 yrs"
  },
  {
    name: "Nature's Path ELC",
    distance: "2.5 km • Westside",
    rating: "4.7",
    tag: "Reggio",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAON8afNNh77q3uhjk1IMwwAxmfiwg7bZUFgPcH-QdcIngzo6YuLfL4hrxujvhg0ZNMYICOdTCRsRQ5joEyZfcAOwx259fJ-wRp8wBzlru9m-Rh-wGFTZ93T7xxDvp5UxDSKsLQEFBRNDUOplbd-EsNJy-6jE1zxAuyxuzKt8IDJnBtGCJTyqJLncoXDLM77NQKEcL6Fx8lG0yNoOwNWCnOd1iTip-ZcfQUb1FoNTAzq3xhmlVTeG3ZFuvRK8LHoa_B-ITExo4gGY",
    age: "2-6 yrs"
  }
];

const CALENDAR_DAYS = [
  { type: 'empty' },
  { type: 'empty' },
  { type: 'disabled', day: 1 },
  { type: 'disabled', day: 2 },
  { type: 'available', day: 3, status: 'available', color: '#22C55E' },
  { type: 'available', day: 4, status: 'available', color: '#22C55E' },
  { type: 'disabled', day: 5 },
  { type: 'disabled', day: 6 },
  { type: 'available', day: 7, status: 'available', color: '#22C55E' },
  { type: 'available', day: 8, status: 'limited', color: '#F59E0B' },
  { type: 'available', day: 9, status: 'limited', color: '#F59E0B' },
  { type: 'available', day: 10, status: 'full-fast', color: '#EF4444' },
  { type: 'available', day: 11, status: 'full-fast', color: '#EF4444' },
  { type: 'disabled', day: 12 },
  { type: 'disabled', day: 13 },
  { type: 'available', day: 14, status: 'available', color: '#22C55E' },
];

const TIME_SLOTS = [
  { time: '09:00 AM', status: 'available', sub: '3 slots left' },
  { time: '10:30 AM', status: 'available', sub: 'Selected' },
  { time: '01:00 PM', status: 'available', sub: '4 slots left' },
  { time: '02:30 PM', status: 'full', sub: 'Full' }
];

export default function BookingSelectionPage() {
  const navigate = useNavigate();
  const { selectedCentre, selectedDate, selectedTime, setCentre, setDate, setTime } = useBooking();

  useEffect(() => {
    document.title = "KiddoTour - Booking Flow";
  }, []);

  const handleNavbarLink = (section) => {
    navigate('/', { state: { scrollTo: section } });
  };

  return (
    <div className="bg-mesh text-on-background min-h-screen font-body-md text-body-md antialiased pt-28 pb-32 md:pb-32 selection:bg-primary/20 selection:text-primary">
      <style>{`
        body {
            background-color: #fcf8ff;
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(124, 58, 237, 0.04) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(56, 189, 248, 0.04) 0%, transparent 50%),
                radial-gradient(circle at 50% 80%, rgba(210, 187, 255, 0.06) 0%, transparent 50%);
            background-attachment: fixed;
            min-height: max(884px, 100dvh);
        }

        .glass-panel {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 4px 24px -4px rgba(99, 14, 212, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.2);
        }

        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        .hover-scale-luxury {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hover-scale-luxury:hover {
            transform: translateY(-4px) scale(1.01);
            box-shadow: 0 12px 32px -8px rgba(99, 14, 212, 0.12);
        }

        .pop-animation {
            animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes pop {
            0% { transform: scale(0.95); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
      `}</style>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl dark:bg-surface/70 border-b border-white/40 dark:border-white/10 shadow-[0_4px_32px_-4px_rgba(124,58,237,0.04)]">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-unit cursor-pointer hover:opacity-80 transition-opacity duration-300" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
            <span className="font-headline-md text-headline-md font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">KiddoTour</span>
          </div>
          <nav className="hidden md:flex items-center gap-stack-lg">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={() => handleNavbarLink('centres')}>Explore</a>
            <div className="flex flex-col items-center">
              <a className="font-label-md text-label-md text-primary font-bold transition-transform cursor-pointer" onClick={() => handleNavbarLink('centres')}>Bookings</a>
              <div className="w-1 h-1 bg-primary rounded-full mt-1"></div>
            </div>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={() => handleNavbarLink('how-it-works')}>Saved</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" onClick={() => handleNavbarLink('providers')}>Profile</a>
          </nav>
          <button 
            onClick={() => navigate('/booking')}
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-secondary to-primary text-on-primary font-label-md text-label-md rounded-full shadow-[0_8px_16px_-4px_rgba(99,14,212,0.3)] hover:shadow-[0_12px_24px_-4px_rgba(99,14,212,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            Book Tour
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        {/* Booking Header & Stepper */}
        <section className="mb-stack-xl flex flex-col items-center text-center relative">
          <div className="absolute right-0 top-0 hidden md:block">
            <div className="w-16 h-16 rounded-full border-4 border-surface-container-high flex items-center justify-center relative shadow-sm bg-white">
              <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path className="text-surface-container-high" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="50, 100" strokeWidth="3"></path>
              </svg>
              <span className="font-label-md text-label-md text-primary font-bold">50%</span>
            </div>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm tracking-tight">Book a Tour</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-2xl">Discover and schedule visits to premium early childhood centres.</p>
          
          {/* Luxury Stepper */}
          <div className="flex items-center w-full max-w-3xl">
            {/* Step 1: Completed */}
            <div className="flex items-center relative flex-1">
              <div className="w-10 h-10 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-label-md text-label-md z-10 shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-500">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-max font-label-sm text-label-sm text-[#22C55E] font-bold tracking-wide">Select Centre</div>
              <div className="h-1 bg-[#22C55E] flex-1 mx-3 rounded-full shadow-[0_0_12px_rgba(34,197,94,0.4)] transition-all duration-500"></div>
            </div>
            {/* Step 2: Active/Current */}
            <div className="flex items-center relative flex-1">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-on-primary flex items-center justify-center font-label-md text-label-md z-10 shadow-[0_0_30px_rgba(124,58,237,0.6)] ring-4 ring-primary/30 transition-all duration-500 scale-110">
                2
              </div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-max font-label-sm text-label-sm text-primary font-bold tracking-wide">Date &amp; Time</div>
              <div className="h-1 bg-surface-variant flex-1 mx-3 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-transparent w-1/2 rounded-full"></div>
              </div>
            </div>
            {/* Step 3: Inactive */}
            <div className="flex items-center relative">
              <div className="w-10 h-10 rounded-full bg-surface-variant text-outline flex items-center justify-center font-label-md text-label-md z-10 border border-outline-variant/50">
                3
              </div>
              <div className="absolute top-14 left-1/2 -translate-x-1/2 w-max font-label-sm text-label-sm text-outline tracking-wide">Details</div>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout for Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-16">
          {/* Left Column: Step 1 - Select Centre */}
          <div className="lg:col-span-5 flex flex-col gap-stack-md">
            {/* Search & Filters */}
            <div className="glass-panel rounded-[2rem] p-6 relative z-10 hover-scale-luxury">
              <div className="relative group mb-5">
                <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors text-[22px]">search</span>
                <input className="w-full bg-white/50 backdrop-blur-md border border-outline-variant/50 text-on-surface font-body-md text-body-md rounded-2xl py-4 pl-14 pr-4 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-outline/60 shadow-sm" placeholder="Search areas or centre names..." type="text"/>
              </div>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                <button className="shrink-0 px-5 py-2 rounded-full bg-[#38BDF8]/10 text-[#0284C7] font-label-sm text-label-sm font-semibold border border-[#38BDF8]/20 hover:bg-[#38BDF8]/20 transition-colors">Near Me</button>
                <button className="shrink-0 px-5 py-2 rounded-full bg-white/50 hover:bg-white text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/50 transition-all shadow-sm hover:border-primary/30">Montessori</button>
                <button className="shrink-0 px-5 py-2 rounded-full bg-white/50 hover:bg-white text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/50 transition-all shadow-sm hover:border-primary/30">Infant Care</button>
              </div>
            </div>

            {/* Centre Cards List */}
            <div className="flex flex-col gap-5 max-h-[600px] overflow-y-auto no-scrollbar pr-2 pb-8">
              {CENTRES.map((centre) => {
                const isActive = selectedCentre === centre.name;
                return (
                  <div
                    key={centre.name}
                    role="button"
                    aria-pressed={isActive}
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setCentre(centre.name); } }}
                    onClick={() => setCentre(centre.name)}
                    className={`glass-panel rounded-[2rem] p-5 cursor-pointer relative overflow-hidden group hover-scale-luxury ${
                      isActive 
                        ? 'border-primary/40 ring-2 ring-primary/20 bg-white/80 shadow-[0_8px_24px_-8px_rgba(99,14,212,0.15)]' 
                        : 'hover:border-outline/30 bg-white/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08)] opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 transition-transform duration-700 group-hover:scale-[2]"></div>
                    {isActive && (
                      <div className="absolute top-4 right-4 text-[#22C55E] bg-[#22C55E]/10 rounded-full p-1 shadow-sm">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                    )}
                    <div className="flex gap-5">
                      <div className="w-28 h-28 rounded-2xl bg-surface-variant overflow-hidden shrink-0 shadow-inner relative">
                        <img alt={centre.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={centre.img}/>
                        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-white text-[12px]">child_care</span>
                          <span className="text-white text-[10px] font-bold">{centre.age}</span>
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 justify-center py-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-headline-md text-headline-md !text-[19px] !line-height-[26px] text-on-surface transition-colors ${isActive ? 'text-primary' : 'group-hover:text-primary'}`}>{centre.name}</h3>
                        </div>
                        <p className="font-body-md text-body-md !text-[14px] text-on-surface-variant mb-3 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-outline">location_on</span>
                          {centre.distance}
                        </p>
                        <div className="flex gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#38BDF8]/10 text-[#0284C7] font-label-sm text-label-sm font-bold border border-[#38BDF8]/20">
                            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {centre.rating}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#22C55E]/10 text-[#16A34A] font-label-sm text-label-sm font-bold border border-[#22C55E]/20">
                            {centre.tag}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Step 2 - Calendar & Time */}
          <div className="lg:col-span-7 flex flex-col gap-stack-md">
            <div className="glass-panel rounded-[2rem] p-8 md:p-10 relative z-20 shadow-[0_8px_32px_-8px_rgba(99,14,212,0.08)] bg-white/80 backdrop-blur-2xl border-white">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-8 flex items-center gap-3 text-2xl">
                <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
                Select Tour Date
              </h2>
              {/* Luxury Calendar UI */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-headline-md text-headline-md text-on-surface !text-xl font-bold tracking-tight">October 2026</h3>
                  <div className="flex gap-3">
                    <button aria-label="Previous month" className="w-10 h-10 rounded-full bg-white border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container-low hover:border-primary/30 text-on-surface transition-all shadow-sm hover:shadow" onClick={(e) => e.preventDefault()}>
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button aria-label="Next month" className="w-10 h-10 rounded-full bg-white border border-outline-variant/50 flex items-center justify-center hover:bg-surface-container-low hover:border-primary/30 text-on-surface transition-all shadow-sm hover:shadow" onClick={(e) => e.preventDefault()}>
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
                {/* Days of week */}
                <div className="grid grid-cols-7 gap-3 mb-6">
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">S</div>
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">M</div>
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">T</div>
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">W</div>
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">T</div>
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">F</div>
                  <div className="text-center font-label-sm text-label-sm text-outline font-bold tracking-wider">S</div>
                </div>
                {/* Dates Grid */}
                <div className="grid grid-cols-7 gap-3">
                  {CALENDAR_DAYS.map((cell, idx) => {
                    if (cell.type === 'empty') {
                      return <div key={`empty-${idx}`}></div>;
                    }
                    if (cell.type === 'disabled') {
                      return (
                        <div key={`disabled-${cell.day}`} className="aspect-square flex items-center justify-center rounded-2xl text-outline-variant/50 font-body-lg text-body-lg cursor-not-allowed">
                          {cell.day}
                        </div>
                      );
                    }
                    
                    const isSelected = selectedDate === String(cell.day);
                    return (
                      <button
                        key={`avail-${cell.day}`}
                        aria-pressed={isSelected}
                        onClick={() => setDate(String(cell.day))}
                        className={`aspect-square flex flex-col items-center justify-center rounded-2xl transition-all relative group ${
                          isSelected
                            ? 'bg-gradient-to-br from-[#8127cf] to-[#630ed4] text-white font-bold shadow-[0_8px_24px_-4px_rgba(99,14,212,0.6)] scale-105 z-10 pop-animation border border-[#8127cf]/50'
                            : 'hover:bg-white hover:shadow-md text-on-surface font-medium border border-transparent hover:border-outline-variant/30'
                        }`}
                      >
                        {cell.day}
                        <span 
                          className={`w-1.5 h-1.5 rounded-full mt-1 ${
                            isSelected ? 'bg-white' : 'opacity-70 group-hover:opacity-100'
                          }`}
                          style={isSelected ? {} : { backgroundColor: cell.color }}
                        ></span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex justify-center gap-6 mt-8 pt-6 border-t border-outline-variant/20">
                  <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant font-medium">
                    <span className="w-2.5 h-2.5 bg-[#22C55E] rounded-full shadow-sm"></span> Available
                  </div>
                  <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant font-medium">
                    <span className="w-2.5 h-2.5 bg-[#F59E0B] rounded-full shadow-sm"></span> Limited
                  </div>
                  <div className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant font-medium">
                    <span className="w-2.5 h-2.5 bg-[#EF4444] rounded-full shadow-sm"></span> Filling Fast
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="mt-10 pt-10 border-t border-outline-variant/30">
                <h3 className="font-headline-md text-headline-md text-on-surface !text-lg mb-6 font-semibold">Available Times for Oct {selectedDate}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    const isFull = slot.status === 'full';
                    if (isFull) {
                      return (
                        <button
                          key={slot.time}
                          disabled
                          className="py-3.5 px-2 rounded-2xl bg-surface-container-low border border-outline-variant/30 text-outline font-label-md text-label-md opacity-50 cursor-not-allowed flex flex-col items-center justify-center gap-1"
                        >
                          <span className="line-through">{slot.time}</span>
                          <span className="text-[10px] font-normal">{slot.sub}</span>
                        </button>
                      );
                    }

                    return (
                      <button
                        key={slot.time}
                        aria-pressed={isSelected}
                        onClick={() => setTime(slot.time)}
                        className={`py-3.5 px-2 rounded-2xl flex flex-col items-center justify-center gap-1 group ${
                          isSelected
                            ? 'border-2 border-primary bg-primary/5 text-primary font-label-md text-label-md font-bold shadow-[0_4px_16px_-4px_rgba(99,14,212,0.15)] transition-all transform scale-[1.02]'
                            : 'py-3.5 px-2 rounded-2xl bg-white border border-outline-variant/50 text-on-surface-variant font-label-md text-label-md hover:border-primary/50 hover:text-primary hover:shadow-md transition-all'
                        }`}
                      >
                        <span>{slot.time}</span>
                        <span className={`text-[10px] ${isSelected ? 'font-medium opacity-80' : 'text-outline group-hover:text-primary/70 font-normal'}`}>
                          {isSelected ? 'Selected' : slot.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center mt-8 px-4">
              <button 
                onClick={() => navigate('/')}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors py-3 px-6 rounded-full hover:bg-surface-container-low border border-transparent hover:border-outline-variant/30"
              >
                Back
              </button>
              <button 
                onClick={() => navigate('/details')}
                className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-secondary to-primary text-white font-label-md text-label-md font-bold rounded-full shadow-[0_8px_24px_-4px_rgba(99,14,212,0.4)] hover:shadow-[0_12px_32px_-4px_rgba(99,14,212,0.6)] hover:-translate-y-1 transition-all duration-300 group"
              >
                Continue to Details
                <span className="material-symbols-outlined ml-3 text-[22px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="fixed bottom-0 w-full z-50 md:hidden bg-white/90 backdrop-blur-2xl dark:bg-inverse-surface/90 border-t border-outline-variant/20 shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.08)]">
        <div className="flex justify-around items-center h-20 safe-bottom pb-2 px-2">
          <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary active:bg-surface-container-high transition-colors p-2 rounded-xl w-16 group" href="#explore" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">search</span>
            <span className="font-label-sm text-label-sm text-[11px]">Explore</span>
          </a>
          <a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim transition-transform duration-300 p-2 rounded-xl w-16" href="#bookings" onClick={(e) => e.preventDefault()}>
            <div className="bg-primary/10 w-12 h-8 flex items-center justify-center rounded-full mb-1">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>event_available</span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-[11px]">Bookings</span>
          </a>
          <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary active:bg-surface-container-high transition-colors p-2 rounded-xl w-16 group" href="#saved" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">favorite</span>
            <span className="font-label-sm text-label-sm text-[11px]">Saved</span>
          </a>
          <a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary active:bg-surface-container-high transition-colors p-2 rounded-xl w-16 group" href="#profile" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform">person</span>
            <span className="font-label-sm text-label-sm text-[11px]">Profile</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
