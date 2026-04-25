import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TelemedLandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Telemedicine | Premium Rural Healthcare";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Connect with verified doctors, find medicines nearby, and get AI-powered health insights for rural communities.");
    }

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="landing-page w-full min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0a0e1a] via-[#0f1629] to-[#0a0e1a] text-slate-100 selection:bg-blue-500/30">
      
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e1a]/70 backdrop-blur-2xl border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group">
              <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              TeleHealth
            </span>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-xs sm:text-sm font-semibold text-slate-300 hover:text-white group">
                <span>🌐</span>
                <span className="hidden sm:inline text-xs">
                  {i18n.language === 'en' ? 'EN' : i18n.language === 'hi' ? 'HI' : i18n.language === 'pa' ? 'PA' : 'TA'}
                </span>
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
              
              <div className="absolute right-0 mt-2 w-36 bg-[#0f1629]/95 backdrop-blur-lg border border-blue-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
                  { code: 'ta', label: 'தமிழ்' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold transition-colors border-b border-white/5 last:border-b-0 ${
                      i18n.language === lang.code 
                        ? 'bg-blue-500/20 text-blue-300' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sign In Button */}
            <button 
              onClick={() => navigate('/login')} 
              className="px-6 py-2.5 rounded-lg font-bold bg-gradient-to-r from-blue-500 to-cyan-400 text-black hover:shadow-lg hover:shadow-blue-500/40 transition-all text-sm hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full animate-pulse" style={{ animation: 'float 6s ease-in-out infinite' }} />
        <div className="absolute bottom-10 left-5 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full" style={{ animation: 'float 8s ease-in-out infinite reverse' }} />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-blue-300 tracking-widest uppercase">Serving Rural India</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.15] mb-6 tracking-tight">
              <span className="block text-white">Expert Healthcare,</span>
              <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                Delivered to Your Village
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
              Connect with verified doctors, locate medicines nearby, and get AI-powered health insights—all optimized for low-bandwidth rural connectivity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <button 
                onClick={() => navigate('/login')}
                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-2xl hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
              >
                Get Started Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/20 text-white font-bold hover:bg-white/10 transition-all hover:border-blue-400/40 backdrop-blur-sm">
                Learn More
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-11 h-11 rounded-full border-2 border-[#0a0e1a] bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xs"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold text-slate-400">
                <span className="text-white">2,000+</span> Active Doctors
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="relative group">
              {/* Gradient Border Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600 via-cyan-500 to-teal-400 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition duration-700" />
              
              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 aspect-square lg:aspect-[4/5]">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-cyan-500/20">
                  {/* Placeholder with gradient text */}
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4 opacity-50">🏥</div>
                    <p className="text-slate-400 text-lg font-semibold">Healthcare Connected</p>
                    <p className="text-slate-500 text-sm mt-2">Telemedicine Interface Preview</p>
                  </div>
                </div>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0f1629]/95 backdrop-blur-2xl border border-blue-500/20 p-6 rounded-2xl shadow-2xl hidden md:block" style={{ animation: 'float 4s ease-in-out infinite' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/30 to-teal-400/30 flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white">98%</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Coverage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20 max-w-2xl">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Complete Healthcare
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Ecosystem</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed font-medium max-w-xl">
              Purpose-built tools designed for rural connectivity, low-bandwidth environments, and community health.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🧠',
                title: 'AI Symptom Checker',
                desc: 'Intelligent health assessment powered by medical AI, providing instant preliminary diagnosis.',
                color: 'from-blue-500/20 to-cyan-500/20'
              },
              {
                icon: '💊',
                title: 'Live Pharmacy',
                desc: 'Find available medicines at nearby pharmacies with real-time inventory tracking.',
                color: 'from-cyan-500/20 to-teal-500/20'
              },
              {
                icon: '📋',
                title: 'Health Records',
                desc: 'Secure, encrypted storage of all medical records with doctor oversight.',
                color: 'from-teal-500/20 to-emerald-500/20'
              },
              {
                icon: '📹',
                title: 'Video Consultations',
                desc: 'Connect with verified doctors via low-bandwidth optimized video calls.',
                color: 'from-indigo-500/20 to-blue-500/20'
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/[0.08] transition-all duration-300 overflow-hidden backdrop-blur-sm h-full flex flex-col"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{feature.desc}</p>
                  <button className="text-sm font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    Learn More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { number: '2,000+', label: 'Verified Doctors' },
              { number: '50,000+', label: 'Active Patients' },
              { number: '98%', label: 'Coverage' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, i) => (
              <div key={i} className="relative p-6 sm:p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300 group text-center">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-400 group-hover:text-slate-300 transition-colors">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-12 sm:p-20 text-center shadow-2xl shadow-blue-500/20">
            
            {/* Animated Background Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 opacity-50" style={{ animation: 'float 8s ease-in-out infinite' }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-black/20 blur-2xl rounded-full translate-y-1/3 -translate-x-1/4" />

            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tight text-white leading-tight">
                A Seamless Journey to Better Health
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join thousands of rural patients and healthcare providers already transforming healthcare access across India.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-10 py-4 rounded-xl bg-white text-blue-600 font-bold text-lg hover:bg-slate-100 transition-all shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  Join the Network
                </button>
                <button className="px-10 py-4 rounded-xl bg-white/20 border border-white/30 text-white font-bold text-lg hover:bg-white/30 transition-all backdrop-blur-sm hover:scale-105 active:scale-95">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-blue-950/20 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Footer Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">TeleHealth</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                Empowering rural healthcare with cutting-edge telemedicine technology and verified medical professionals.
              </p>
            </div>

            {/* Platform */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-semibold">
                <li><button className="hover:text-blue-400 transition-colors">Sign In</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Features</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Doctor Network</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Pricing</button></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-semibold">
                <li><button className="hover:text-blue-400 transition-colors">About Us</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Blog</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Careers</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Contact</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-6">Support</h4>
              <ul className="space-y-4 text-slate-400 text-sm font-semibold">
                <li className="flex items-center gap-2">
                  <span>✉️</span> help@telehealth.io
                </li>
                <li className="flex items-center gap-2">
                  <span>📞</span> +91 (800) 999-5555
                </li>
                <li><button className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                <li><button className="hover:text-blue-400 transition-colors">Terms & Conditions</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-white/5 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-semibold tracking-widest uppercase">
            <div>&copy; 2024 TeleHealth Global Health. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Twitter</a>
              <a href="#" className="hover:text-blue-400 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ===== STYLES ===== */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        
        * {
          font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.2); }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(15, 22, 41, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.4);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.6);
        }
      `}} />
    </div>
  );
};

export default TelemedLandingPage;