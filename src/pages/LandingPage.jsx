import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const centresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const providersRef = useRef(null);

  useEffect(() => {
    document.title = "KiddoTour - Find Your Child's Perfect Preschool";
  }, []);

  useEffect(() => {
    if (location.state?.scrollTo) {
      const target = location.state.scrollTo;
      const scrollOptions = { behavior: 'smooth' };
      
      // Give a tiny timeout to make sure refs are rendered/positioned
      const timer = setTimeout(() => {
        if (target === 'centres') {
          centresRef.current?.scrollIntoView(scrollOptions);
        } else if (target === 'how-it-works') {
          howItWorksRef.current?.scrollIntoView(scrollOptions);
        } else if (target === 'providers') {
          providersRef.current?.scrollIntoView(scrollOptions);
        }
      }, 100);

      // Clear route state to prevent repeating scroll
      navigate(location.pathname, { replace: true, state: {} });
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  const handleNavClick = (section, e) => {
    e.preventDefault();
    if (section === 'centres') {
      centresRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'how-it-works') {
      howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'providers') {
      providersRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-on-background font-body-md text-body-md antialiased min-h-screen flex flex-col animate-mesh pb-20 md:pb-0">
      <style>{`
        body {
            background-color: #fcf8ff;
            background-image:
                radial-gradient(at 0% 0%, hsla(264, 84%, 58%, 0.1) 0, transparent 50%),
                radial-gradient(at 50% 100%, hsla(264, 84%, 58%, 0.1) 0, transparent 50%),
                radial-gradient(at 100% 0%, hsla(271, 81%, 56%, 0.1) 0, transparent 50%);
            background-size: 200% 200%;
            background-attachment: fixed;
            min-height: max(884px, 100dvh);
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 8px 32px rgba(124, 58, 237, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
            border-radius: 24px;
        }

        .gradient-text {
            background: linear-gradient(135deg, #7c3aed, #c026d3, #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
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

        .bento-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
        }

        .bento-item-large { grid-column: span 2; grid-row: span 2; }
        .bento-item-wide { grid-column: span 2; grid-row: span 1; }
        .bento-item-tall { grid-column: span 1; grid-row: span 2; }
        .bento-item-small { grid-column: span 1; grid-row: span 1; }

        @media (max-width: 1024px) {
            .bento-grid { grid-template-columns: repeat(2, 1fr); }
            .bento-item-large { grid-column: span 2; }
            .bento-item-wide { grid-column: span 2; }
            .bento-item-tall { grid-column: span 1; }
        }

        @media (max-width: 640px) {
            .bento-grid { grid-template-columns: 1fr; }
            .bento-item-large, .bento-item-wide, .bento-item-tall, .bento-item-small { grid-column: span 1; grid-row: auto; }
        }

        .fade-in-section {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-white/40 shadow-[0_2px_10px_rgba(124,58,237,0.02)] transition-all">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
            <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">KiddoTour</span>
          </div>
          <nav className="hidden md:flex gap-8 items-center">
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#centres" onClick={(e) => handleNavClick('centres', e)}>Centres</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#how-it-works" onClick={(e) => handleNavClick('how-it-works', e)}>How it Works</a>
            <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors" href="#providers" onClick={(e) => handleNavClick('providers', e)}>For Providers</a>
          </nav>
          <button 
            onClick={() => navigate('/booking')}
            className="hidden md:flex btn-primary text-white font-label-md text-label-md px-6 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-transform"
          >
            Book Tour
          </button>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full flex flex-col gap-stack-xl">
        {/* Hero Section */}
        <section className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative mt-8 fade-in-section" style={{ animationDelay: '0.1s' }}>
          <div className="flex-1 flex flex-col gap-6 z-10 text-center lg:text-left items-center lg:items-start">
            <h1 className="font-display text-display text-on-surface leading-[1.1] tracking-tight">
              Find Your Child's <br className="hidden lg:block" />
              <span className="gradient-text font-extrabold">Perfect Preschool</span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Discover, compare, and book tours at premium early learning centres in your area. Smart booking, instant confirmation, total peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/booking')}
                className="btn-primary text-white font-label-md text-label-md px-8 py-4 rounded-full flex justify-center items-center gap-2 w-full sm:w-auto active:scale-95 transition-transform"
              >
                Start Exploring
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
              <button 
                onClick={(e) => handleNavClick('how-it-works', e)}
                className="glass-card text-on-surface font-label-md text-label-md px-8 py-4 rounded-full hover:bg-white/90 transition-colors flex justify-center items-center w-full sm:w-auto active:scale-95"
              >
                How it works
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[500px] flex justify-center items-center mt-12 lg:mt-0">
            {/* Floating Stats Cards */}
            <div className="absolute z-20 left-4 md:-left-12 top-0 md:top-1/4 glass-card p-4 flex items-center gap-4 animate-float-slow hover:scale-105 transition-transform cursor-default shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-secondary font-bold">domain</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-on-surface font-extrabold">500+</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">Premium Centres</p>
              </div>
            </div>
            <div className="absolute z-20 right-4 md:-right-8 top-1/3 md:top-1/2 glass-card p-4 flex items-center gap-4 animate-float-medium hover:scale-105 transition-transform cursor-default shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-primary font-bold">check_circle</span>
              </div>
              <div>
                <p className="font-headline-md text-headline-md text-on-surface font-extrabold">98%</p>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">Tour Completion</p>
              </div>
            </div>
            <div className="absolute z-20 left-10 md:left-1/4 bottom-0 md:-bottom-8 glass-card p-4 flex items-center gap-4 animate-float-fast hover:scale-105 transition-transform cursor-default shadow-xl">
              <div className="flex -space-x-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-surface-container-highest border-2 border-white shadow-sm"></div>
                <div className="w-10 h-10 rounded-full bg-surface-variant border-2 border-white shadow-sm"></div>
                <div className="w-10 h-10 rounded-full bg-surface-dim border-2 border-white flex items-center justify-center text-xs font-bold text-on-surface shadow-sm">+10k</div>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">Happy Families</p>
              </div>
            </div>
            {/* Main Illustration Placeholder */}
            <div className="absolute inset-4 md:inset-0 rounded-[32px] overflow-hidden glass-card p-3 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <div role="img" aria-label="Bright preschool classroom with natural lighting, child-sized wooden furniture, and Montessori learning toys" className="w-full h-full rounded-[24px] bg-surface-container-high bg-cover bg-center relative" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuL18p4EUFh8IqEROBWqumoijbBPI2Bkt1b3RdqzmzqjbmtrqYptzNtoxjJA3kEXhbcovn8kZ6EE41MT8qNYzRsPpwmfftdlyHuyI_6dCcvwuZJqqLHSOaSh8c2FTfSf606gPEvDdQnnWDO62NBgpzsQnY1w8jiVSy6sco86T-3tEoAi59Ba0H3bQhW6w1peRX9VEWvDKMF-TRyVPFPcmWdqDVDCl5cHAwpmuo8gPThCjM_HEZXYnbX_o_YJ3d5z1kIzHvf3O8SPQ')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[24px]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Logos */}
        <section className="flex flex-col items-center gap-8 py-12 fade-in-section" style={{ animationDelay: '0.2s' }}>
          <p className="font-label-sm text-label-sm text-outline uppercase tracking-widest font-semibold">Trusted by leading early education providers</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-headline-md text-headline-md font-extrabold text-on-surface-variant">Montessori</span>
            <span className="font-headline-md text-headline-md font-extrabold text-on-surface-variant">Reggio</span>
            <span className="font-headline-md text-headline-md font-extrabold text-on-surface-variant">Waldorf</span>
            <span className="font-headline-md text-headline-md font-extrabold text-on-surface-variant">EarlyYears</span>
          </div>
        </section>

        {/* AI Match Section */}
        <section className="w-full relative py-8 fade-in-section" style={{ animationDelay: '0.3s' }}>
          <div className="glass-card rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative border-primary/30 shadow-lg">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full"></div>
            <div className="flex-1 z-10 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary font-label-sm text-label-sm px-4 py-2 rounded-full w-max border border-primary/20 shadow-sm">
                <span className="material-symbols-outlined text-sm">auto_awesome</span> New AI Match Feature
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold leading-tight">Find the perfect fit<br />with Kiddo AI Match</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Answer a few quick questions about your child's personality, learning style, and your family's needs. Our AI analyzes hundreds of local centres to find your ideal match in seconds.</p>
              <button 
                onClick={() => navigate('/booking')}
                className="btn-primary text-white font-label-md text-label-md px-8 py-4 rounded-full flex justify-center items-center gap-2 w-max mt-2 active:scale-95 transition-transform"
              >
                Take the Match Quiz
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
            <div className="flex-1 w-full z-10 relative">
              {/* Success Match Indicator */}
              <div className="absolute -top-4 -right-4 z-20 bg-white/95 backdrop-blur-sm border border-green-200 shadow-xl rounded-2xl p-4 flex items-center gap-3 animate-float-medium">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-600">verified</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-green-600 uppercase tracking-wide">Confidence Score</p>
                  <p className="font-headline-md text-headline-md font-bold text-on-surface">99% Match</p>
                </div>
              </div>
              <div className="glass-card p-6 border-white/80 shadow-2xl bg-white/80 relative overflow-hidden rounded-[24px]">
                <div className="flex items-center gap-4 mb-6">
                  <div aria-label="Kiddo AI avatar" className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-inner">K</div>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-on-surface">Kiddo AI Assistant</p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      Matching Engine Active
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-sm w-4/5 text-sm text-on-surface border border-outline-variant/30 shadow-sm">
                    Hi! I'm ready to find the best preschool for your little one. What age group are we looking for?
                  </div>
                  <div className="bg-primary p-4 rounded-2xl rounded-tr-sm w-3/4 self-end text-sm text-white shadow-md">
                    Looking for a program for my 3-year-old daughter. She loves art and being outdoors!
                  </div>
                  {/* Recommendation Preview */}
                  <div className="bg-surface-container-lowest p-4 rounded-2xl border border-primary/20 shadow-sm w-full mt-2 flex gap-3 items-start">
                    <div role="img" aria-label="Creative Minds Academy preschool classroom preview" className="w-10 h-10 rounded-lg bg-surface-container-highest shrink-0 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlQxe-Q1sR6-5ODslNS15Vsyor9gZQC8QhHD_FIWmktdeUzp4S1cPfySRDV9K5zaL4JulSYKiFeraGPN0j_hqzyrA2lSQrZCaIDH7oDYcM9T-r-8yeZM6c0cpZj2De6Y72gRQa1HdNP2J3RjhKbQSYH4nk6uG4efG5qRkn_qC8P6ZweaAb8oorriZWkA6jtUf7t3r6d0QvFkZSYOZd8oyOkuXsy80TFMJemmaUdfBKGR6TP0z1VZXZkTdf-NUY_nkXc1EnzooJg48')" }}></div>
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">Top Recommendation</p>
                      <p className="font-label-md font-bold text-on-surface">Creative Minds Academy</p>
                      <p className="text-xs text-on-surface-variant mt-1">Excellent art program &amp; nature trails.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section ref={howItWorksRef} id="how-it-works" className="flex flex-col gap-12 mt-12 fade-in-section" style={{ animationDelay: '0.4s' }}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 font-extrabold tracking-tight">Everything you need to find the right fit</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">We've streamlined the preschool discovery process so you can focus on what matters most.</p>
          </div>
          <div className="bento-grid">
            {/* Smart Tour Booking (Large) */}
            <div className="bento-item-large glass-card p-8 flex flex-col gap-6 relative overflow-hidden group border border-white/60 hover:border-primary/30 transition-all hover:shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl group-hover:bg-primary-container/20 transition-colors duration-500"></div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
              </div>
              <div className="mt-auto z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">Smart Tour Booking</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Schedule tours instantly at your convenience. No more endless phone tag or waiting for callbacks.</p>
              </div>
            </div>
            {/* Real-Time Availability (Wide) */}
            <div className="bento-item-wide glass-card p-8 flex items-center gap-6 group hover:bg-white/80 transition-all hover:shadow-lg border border-white/60 hover:border-secondary/30">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/20 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary text-2xl">event_available</span>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2 font-bold">Real-Time Availability</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">See exactly which centres have immediate openings for your child's age group.</p>
              </div>
            </div>
            {/* Instant Confirmation (Small) */}
            <div className="bento-item-small glass-card p-6 flex flex-col gap-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 border border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#22C55E]/20 to-[#22C55E]/5 border border-[#22C55E]/20 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#22C55E]">check_circle</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-1 text-lg font-bold">Instant Confirmation</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">Get notified immediately when your tour is booked.</p>
              </div>
            </div>
            {/* Parent Dashboard (Small) */}
            <div className="bento-item-small glass-card p-6 flex flex-col gap-4 group hover:-translate-y-2 hover:shadow-lg transition-all duration-300 border border-white/60">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#38BDF8]/20 to-[#38BDF8]/5 border border-[#38BDF8]/20 flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[#38BDF8]">space_dashboard</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface mb-1 text-lg font-bold">Parent Dashboard</h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant leading-relaxed">Manage all your tours and waitlists in one place.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Centres */}
        <section ref={centresRef} id="centres" className="flex flex-col gap-8 mt-12 fade-in-section" style={{ animationDelay: '0.5s' }}>
          <div className="flex justify-between items-end">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2 font-extrabold tracking-tight">Featured Centres</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Top-rated early learning environments near you.</p>
            </div>
            <button className="hidden md:flex text-primary font-label-md text-label-md items-center gap-1 hover:underline font-bold transition-all hover:gap-2" onClick={(e) => handleNavClick('centres', e)}>
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Centre Card 1 */}
            <div className="glass-card overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] transition-all duration-300 border border-white/80 bg-white/40" onClick={() => navigate('/booking')}>
              <div className="h-56 relative overflow-hidden bg-surface-container-high rounded-t-[24px] m-2">
                <div role="img" aria-label="Sunshine Early Learning preschool building exterior with safety-enclosed play yard" className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcAfPNjsiKWdAR8v4Pw6Cs6NInyDbg9mPy4B8OXpWVy1UZepYwgozEk0hnsGA-QBSyL4gEPjHZkygMwcaH2JPJoabOyHS1L_psrBpgpuX89uX7wblVISDJ2CwipN35dNubnk1tBIr5jLh0TgvFpBFbAY9iN5kHg3QARnbjUQI__K1wybLJWuL_WS2zlnVafY7Vjc7cHlWo__smu0_x7RhiWJRwawHgG9kn0tZfNqOJ_U277z3E_bFoBa53_cRq2CLnFDToicvXGEU')" }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg">
                  <span className="material-symbols-outlined text-sm text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.9
                </div>
                <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-md text-white font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg border border-white/20">
                  <span className="material-symbols-outlined text-sm">360</span> Virtual Tour
                </div>
                {/* Instant Booking Badge */}
                <div className="absolute bottom-4 right-4 bg-[#22C55E]/95 backdrop-blur-md text-white font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg border border-white/20">
                  <span className="material-symbols-outlined text-sm">flash_on</span> Instant Booking
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl font-bold group-hover:text-primary transition-colors">Sunshine Early Learning</h3>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 1.2 miles away
                  </p>
                </div>
                <div className="flex gap-2 mt-auto flex-wrap">
                  <span className="bg-[#38BDF8]/15 text-[#0284C7] border border-[#38BDF8]/30 font-label-sm text-label-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">Ages 0-5</span>
                  <span className="bg-[#22C55E]/15 text-[#166534] border border-[#22C55E]/30 font-label-sm text-label-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">Immediate Openings</span>
                </div>
                <button className="w-full btn-primary text-white font-label-md text-label-md py-3.5 rounded-xl mt-4 font-bold tracking-wide active:scale-[0.98] transition-transform shadow-md hover:shadow-xl">
                  Book Tour
                </button>
              </div>
            </div>
            {/* Centre Card 2 */}
            <div className="glass-card overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] transition-all duration-300 border border-white/80 bg-white/40" onClick={() => navigate('/booking')}>
              <div className="h-56 relative overflow-hidden bg-surface-container-high rounded-t-[24px] m-2">
                <div role="img" aria-label="Maple Tree Montessori classroom with neat wooden educational shelves" className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBAzVzOQ9qOwyiM_T_wH15_MAvDB1xvOvH4wiS6tOvqL9LICUGkTxRJK8d2DvY5GwyCl9gJzcKrQmBiFXtbktJYDBFwRXZqyaje332S8B6YeWz0Qe6MRXOs0KqUChS-HGCaHhFYReWy64HWzhfIF93TOwWlpgAPbpM8JXKo_xLRPkWXSBsNh97PUw7XKoGTXA0N96uhjKljxyCW13d76GzxEKxkHd0QVe9REEJiNehVCjVxfY3iDzeOJRai5FTBnbOZjgiBE0FifL0')" }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg">
                  <span className="material-symbols-outlined text-sm text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl font-bold group-hover:text-primary transition-colors">Maple Tree Montessori</h3>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 2.5 miles away
                  </p>
                </div>
                <div className="flex gap-2 mt-auto flex-wrap">
                  <span className="bg-[#38BDF8]/15 text-[#0284C7] border border-[#38BDF8]/30 font-label-sm text-label-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">Ages 2-6</span>
                  <span className="bg-[#F59E0B]/15 text-[#B45309] border border-[#F59E0B]/30 font-label-sm text-label-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">Waitlist Available</span>
                </div>
                <button className="w-full bg-surface-container-lowest border border-primary/20 text-primary font-label-md text-label-md py-3.5 rounded-xl mt-4 font-bold tracking-wide hover:bg-primary/5 active:scale-[0.98] transition-all shadow-sm">
                  View Details
                </button>
              </div>
            </div>
            {/* Centre Card 3 */}
            <div className="glass-card overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] transition-all duration-300 border border-white/80 hidden md:flex bg-white/40" onClick={() => navigate('/booking')}>
              <div className="h-56 relative overflow-hidden bg-surface-container-high rounded-t-[24px] m-2">
                <div role="img" aria-label="Creative Minds Academy preschool art classroom with easels and paintings" className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlQxe-Q1sR6-5ODslNS15Vsyor9gZQC8QhHD_FIWmktdeUzp4S1cPfySRDV9K5zaL4JulSYKiFeraGPN0j_hqzyrA2lSQrZCaIDH7oDYcM9T-r-8yeZM6c0cpZj2De6Y72gRQa1HdNP2J3RjhKbQSYH4nk6uG4efG5qRkn_qC8P6ZweaAb8oorriZWkA6jtUf7t3r6d0QvFkZSYOZd8oyOkuXsy80TFMJemmaUdfBKGR6TP0z1VZXZkTdf-NUY_nkXc1EnzooJg48')" }}>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg">
                  <span className="material-symbols-outlined text-sm text-[#F59E0B]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 5.0
                </div>
                <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-md text-white font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg border border-white/20">
                  <span className="material-symbols-outlined text-sm">360</span> Virtual Tour
                </div>
                {/* Instant Booking Badge */}
                <div className="absolute bottom-4 right-4 bg-[#22C55E]/95 backdrop-blur-md text-white font-label-sm text-label-sm px-3 py-1.5 rounded-full flex items-center gap-1 font-bold shadow-lg border border-white/20">
                  <span className="material-symbols-outlined text-sm">flash_on</span> Instant Booking
                </div>
              </div>
              <div className="p-6 flex flex-col gap-4 flex-grow">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-md text-headline-md text-on-surface text-xl font-bold group-hover:text-primary transition-colors">Creative Minds Academy</h3>
                  </div>
                  <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-sm">location_on</span> 3.1 miles away
                  </p>
                </div>
                <div className="flex gap-2 mt-auto flex-wrap">
                  <span className="bg-[#38BDF8]/15 text-[#0284C7] border border-[#38BDF8]/30 font-label-sm text-label-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">Ages 1-5</span>
                  <span className="bg-[#22C55E]/15 text-[#166534] border border-[#22C55E]/30 font-label-sm text-label-sm px-3 py-1.5 rounded-lg font-semibold shadow-sm">2 Spots Left</span>
                </div>
                <button className="w-full btn-primary text-white font-label-md text-label-md py-3.5 rounded-xl mt-4 font-bold tracking-wide active:scale-[0.98] transition-transform shadow-md hover:shadow-xl">
                  Book Tour
                </button>
              </div>
            </div>
          </div>
          <button onClick={() => navigate('/booking')} className="md:hidden text-primary font-label-md text-label-md w-full py-4 glass-card font-bold border border-primary/20 hover:bg-white/80 active:scale-95 transition-all">
            View all centres
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer ref={providersRef} id="providers" className="w-full py-stack-xl bg-surface-container-lowest/50 backdrop-blur-xl border-t border-white/40 mt-auto pb-32 md:pb-stack-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="flex flex-col gap-4">
            <span className="font-headline-md text-headline-md font-extrabold text-primary tracking-tight">KiddoTour</span>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm font-medium">Premium Preschool Discovery.</p>
          </div>
          <div className="flex flex-col gap-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#centres" onClick={(e) => handleNavClick('centres', e)}>Find a Centre</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#how-it-works" onClick={(e) => handleNavClick('how-it-works', e)}>How it Works</a>
          </div>
          <div className="flex flex-col gap-2">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Privacy Policy</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors font-medium" href="#">Terms of Service</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-label-sm text-label-sm text-on-surface-variant font-medium">© 2026 KiddoTour.</p>
          </div>
        </div>
      </footer>

      {/* Bottom Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-[0_-4px_24px_rgba(124,58,237,0.08)] pb-safe pt-2 px-6">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <a className="flex flex-col items-center gap-1 p-2 text-primary group relative" href="#explore" onClick={(e) => e.preventDefault()}>
            <div className="absolute inset-0 bg-primary/10 rounded-xl scale-110 opacity-100 transition-all duration-300"></div>
            <span className="material-symbols-outlined z-10" style={{ fontVariationSettings: "'FILL' 1" }}>explore</span>
            <span className="text-[10px] font-bold z-10">Discover</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 text-on-surface-variant hover:text-primary transition-colors group relative" href="#saved" onClick={(e) => e.preventDefault()}>
            <div className="absolute inset-0 bg-primary/10 rounded-xl scale-50 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"></div>
            <span className="material-symbols-outlined z-10">favorite</span>
            <span className="text-[10px] font-medium z-10 group-hover:font-bold">Saved</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 text-on-surface-variant hover:text-primary transition-colors group relative" href="#tours" onClick={(e) => { e.preventDefault(); navigate('/booking'); }}>
            <div className="absolute inset-0 bg-primary/10 rounded-xl scale-50 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"></div>
            <span className="material-symbols-outlined z-10">calendar_month</span>
            <span className="text-[10px] font-medium z-10 group-hover:font-bold">Tours</span>
          </a>
          <a className="flex flex-col items-center gap-1 p-2 text-on-surface-variant hover:text-primary transition-colors group relative" href="#profile" onClick={(e) => e.preventDefault()}>
            <div className="absolute inset-0 bg-primary/10 rounded-xl scale-50 opacity-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300"></div>
            <span className="material-symbols-outlined z-10">person</span>
            <span className="text-[10px] font-medium z-10 group-hover:font-bold">Profile</span>
          </a>
        </div>
        <div className="h-4"></div> {/* Safe area padding */}
      </nav>
    </div>
  );
}
