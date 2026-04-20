import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    document.title = "Telemedicine | Premium Rural Care";
    
    // Simple meta description update
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Reliable healthcare access for rural communities. Consult doctors, find nearby medicines, and check symptoms with AI.");
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <div className="landing-page w-full min-h-screen overflow-x-hidden font-sans bg-[#05070A] text-slate-100 selection:bg-blue-500/30">
      
      {/* 1. Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#05070A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="w-full max-w-[1440px] mx-auto px-8 py-5 flex justify-between items-center">
          <div className="text-2xl font-black flex items-center gap-2 text-white">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="tracking-tighter">{t('nav.brand')}</span>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold text-slate-300">
                <span className="text-blue-400">🌐</span>
                <span className="hidden sm:inline">{i18n.language === 'en' ? 'English' : i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'pa' ? 'ਪੰਜਾਬੀ' : 'தமிழ்'}</span>
              </button>
              
              <div className="absolute right-0 mt-3 w-40 bg-[#0F1218] border border-white/10 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] overflow-hidden">
                {[
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
                  { code: 'ta', label: 'தமிழ்' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-5 py-3 text-xs font-semibold hover:bg-blue-600/10 transition-colors ${i18n.language === lang.code ? 'text-blue-400 bg-blue-500/5' : 'text-slate-400'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => navigate('/login')} 
              className="px-6 py-2.5 rounded-xl font-bold bg-white text-black hover:bg-slate-200 transition-all shadow-xl shadow-white/5 text-sm"
            >
              {t('nav.signin')}
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative pt-48 pb-24 px-8 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/4" />

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full mb-12 border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 animate-ping" />
              {t('hero.badge')}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter">
              <span className="text-white">{t('hero.title1')}</span> <br />
              <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
                {t('hero.title2')}
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed font-medium">
              {t('hero.desc')}
            </p>
            
            <div className="flex flex-wrap gap-5">
              <button 
                onClick={() => navigate('/login')}
                className="group px-10 py-5 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/30 flex items-center gap-3"
              >
                {t('hero.getStarted')}
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button className="px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                {t('hero.learnMore')}
              </button>
            </div>
            
            <div className="mt-16 flex items-center gap-10">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-[#05070A] bg-slate-800 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-4 border-[#05070A] bg-blue-600 flex items-center justify-center font-bold text-xs">
                  +2k
                </div>
              </div>
              <div className="text-sm font-bold text-slate-400 italic">
                {t('hero.doctors')} & {t('hero.secure')}
              </div>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-teal-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 aspect-square lg:aspect-[4/5] xl:aspect-square">
                <img 
                  src="/images/hero.png" 
                  alt="Rural Healthcare Technology" 
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-8 -left-8 bg-[#0F1218]/90 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-3xl hidden md:block animate-bounce-slow">
              <div className="flex items-center gap-4">
                <div className="bg-teal-500/20 p-3 rounded-2xl">
                  <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">98%</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Village Coverage</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 3. Features Grid */}
      <section className="py-32 px-6 bg-[#080A0F] relative">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">{t('features.sectionTitle')}</h2>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">{t('features.sectionDesc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'ai', icon: '🧠', title: t('features.ai.title'), desc: t('features.ai.desc'), img: '/images/ai.png', color: 'blue' },
              { id: 'pharmacy', icon: '🏪', title: t('features.pharmacy.title'), desc: t('features.pharmacy.desc'), img: '/images/pharmacy.png', color: 'teal' },
              { id: 'records', icon: '🛡️', title: t('features.records.title'), desc: t('features.records.desc'), img: '/images/records.png', color: 'emerald' },
              { id: 'video', icon: '📹', title: t('features.video.title'), desc: t('features.video.desc'), img: '/images/telemed_rural.png', color: 'indigo' }
            ].map((f, i) => (
              <div key={i} className="group relative p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/[0.08] hover:border-blue-500/30 transition-all overflow-hidden h-full flex flex-col">
                {f.img && (
                  <div className="mb-8 rounded-2xl overflow-hidden aspect-video bg-slate-900 border border-white/5">
                    <img src={f.img} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
                <div className="text-4xl mb-6">{f.icon}</div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-base leading-relaxed font-medium mb-8 flex-grow">{f.desc}</p>
                <button className="text-sm font-bold text-blue-400 group-hover:text-blue-300 flex items-center gap-2">
                  Learn how it works
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Process (Call to Action) */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_20px_100px_rgba(37,99,235,0.3)]">
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-2xl rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-16 tracking-tighter text-white leading-[1.1]">
                {t('process.title')}
              </h2>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-12 py-6 rounded-2xl bg-white text-blue-600 font-black hover:bg-slate-100 transition-all shadow-2xl text-lg"
                >
                  Join the Health Network
                </button>
                <div className="flex flex-col justify-center text-left border-l border-white/20 pl-8 hidden sm:flex">
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Status</span>
                  <span className="text-white font-black text-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    System Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="py-24 px-8 border-t border-white/5 bg-[#030507]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-12 items-start">
          <div className="lg:col-span-2">
            <div className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              {t('nav.brand')}
            </div>
            <p className="text-lg text-slate-500 max-w-sm leading-relaxed font-medium">
              {t('footer.tagline')}
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-white uppercase text-xs tracking-widest">{t('footer.platform')}</h4>
            <ul className="space-y-6 text-slate-400 font-bold text-sm">
              <li><button onClick={() => navigate('/login')} className="hover:text-blue-400 transition-colors">{t('footer.login')}</button></li>
              <li><button className="hover:text-blue-400 transition-colors">{t('footer.about')}</button></li>
              <li><button className="hover:text-blue-400 transition-colors">{t('footer.network')}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 text-white uppercase text-xs tracking-widest">{t('footer.support')}</h4>
            <ul className="space-y-6 text-slate-400 font-bold text-sm">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📧</span> help@teleheal.org
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📞</span> +91 (800) 999-5555
              </li>
              <li className="pt-4 border-t border-white/5 opacity-50">Privacy & Terms</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold tracking-widest uppercase">
          <div>&copy; {new Date().getFullYear()} {t('nav.brand')} Global Health</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Github</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-bounce-slow {
          animation: bounce 6s infinite ease-in-out;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .tracking-tighter { letter-spacing: -0.05em; }
        .font-black { font-weight: 900; }
      `}} />

    </div>
  );
};

export default LandingPage;
