import React from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';
import { getTranslation } from '../utils/translations';

export const LandingHeroView: React.FC = () => {
  const profile = useStore(studentStore);
  const t = getTranslation(profile?.language || 'hinglish');

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-3 bg-focusBg border-2 border-focusBorder text-focusText text-sm sm:text-base font-black px-5 py-2 rounded-full uppercase tracking-wider shadow-sm hover:scale-105 transition-transform">
          <span className="flex items-center gap-1">
            <span>🚀</span>
            <span className="font-handwritten text-xl font-bold lowercase tracking-normal text-focusText">padh</span>
            <span className="font-black text-sm uppercase text-focusText font-sans">DSA</span>
            <span>VISUAL PLATFORM</span>
          </span>
          <span>•</span>
          <span>Interactive Algorithm Engine</span>
        </div>

        <h1 className="text-4xl sm:text-7xl font-black tracking-tight leading-tight">
          Master Algorithms <br />
          <span className="text-accent font-handwritten text-5xl sm:text-8xl">{t.heroTagline}</span>
        </h1>

        <p className="text-textSecondary text-lg sm:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
          {t.heroSub}
        </p>

        {/* Main Single Premium CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/onboarding"
            className="group relative inline-flex items-center justify-center gap-3.5 bg-gradient-to-r from-accent via-[#E05338] to-accent2 text-onAccent px-10 sm:px-12 py-5 rounded-2xl font-black text-xl sm:text-2xl shadow-xl shadow-accent/25 border border-accent2/50 ring-1 ring-white/30 hover:scale-105 hover:shadow-2xl hover:shadow-accent/40 active:scale-98 transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>

            <span className="tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t.heroStartBtn}</span>

            <span className="p-2.5 rounded-xl bg-white/20 border border-white/30 text-white shadow-sm group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
              </svg>
            </span>
          </a>
        </div>
      </section>

      {/* Visual Card Preview Illustration */}
      <section className="max-w-4xl mx-auto">
        <div className="bg-card border-2 border-textSecondary/20 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl hover:border-accent/40 transition-all duration-300 space-y-6">
          <div className="flex items-center justify-between border-b border-textSecondary/15 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-accent inline-block"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-accent2 inline-block"></span>
              <span className="text-sm font-mono text-textSecondary font-bold ml-2">bubble-sort-visualizer.preview</span>
            </div>
            <span className="text-xs sm:text-sm font-mono bg-focusBg text-focusText border border-focusBorder px-3 py-1 rounded-lg font-extrabold">
              Pass 1: Comparing & Swapping
            </span>
          </div>

          {/* Mock Comparison Graphic */}
          <div className="flex items-end justify-center gap-1.5 sm:gap-6 py-4 sm:py-6 border-b border-textSecondary/10">
            <div className="flex flex-col items-center gap-1.5 sm:gap-2 hover:-translate-y-1 transition-transform">
              <span className="text-[10px] sm:text-xs font-mono text-textSecondary font-bold">Index [0]</span>
              <div className="bg-bg border border-textSecondary/30 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-center font-bold text-xs sm:text-base w-20 sm:w-28 shadow-xs">
                <div className="text-xl sm:text-2xl mb-1">🥟</div>
                <div className="truncate">Samosa</div>
                <div className="text-xs sm:text-sm font-mono text-accent font-extrabold">₹15</div>
              </div>
            </div>

            <div className="text-2xl sm:text-3xl text-accent font-bold animate-pulse pb-4 sm:pb-6">
              ⇄
            </div>

            <div className="flex flex-col items-center gap-1.5 sm:gap-2 hover:-translate-y-1 transition-transform">
              <span className="text-[10px] sm:text-xs font-mono text-accent font-bold">Index [1]</span>
              <div className="bg-accent text-onAccent border border-accent p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-center font-bold text-xs sm:text-base w-20 sm:w-28 shadow-md scale-105 ring-2 ring-accent/40">
                <div className="text-xl sm:text-2xl mb-1">🍕</div>
                <div className="truncate">Pizza</div>
                <div className="text-xs sm:text-sm font-mono font-extrabold">₹250</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1.5 sm:gap-2 hover:-translate-y-1 transition-transform">
              <span className="text-[10px] sm:text-xs font-mono text-textSecondary font-bold">Index [2]</span>
              <div className="bg-bg border border-textSecondary/30 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl text-center font-bold text-xs sm:text-base w-20 sm:w-28 opacity-60">
                <div className="text-xl sm:text-2xl mb-1">☕</div>
                <div className="truncate">Chai</div>
                <div className="text-xs sm:text-sm font-mono text-textSecondary font-bold">₹10</div>
              </div>
            </div>
          </div>

          {/* Callout Quote */}
          <div className="dhyan-do-box p-5 rounded-2xl text-base font-semibold shadow-xs">
            {t.heroQuote}
          </div>
        </div>
      </section>

      {/* Why Learn With Us Features Grid */}
      <section className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl sm:text-4xl font-black text-center tracking-tight">
          {t.heroWhyTitle}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-card border border-textSecondary/20 p-6 sm:p-7 rounded-3xl space-y-3 shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300">
            <div className="text-4xl">🍿</div>
            <h3 className="font-extrabold text-2xl text-main">{t.heroFeature1Title}</h3>
            <p className="text-base text-textSecondary leading-relaxed font-medium">
              {t.heroFeature1Desc}
            </p>
          </div>

          <div className="bg-card border border-textSecondary/20 p-6 sm:p-7 rounded-3xl space-y-3 shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300">
            <div className="text-4xl">📚</div>
            <h3 className="font-extrabold text-2xl text-main">{t.heroFeature2Title}</h3>
            <p className="text-base text-textSecondary leading-relaxed font-medium">
              {t.heroFeature2Desc}
            </p>
          </div>

          <div className="bg-card border border-textSecondary/20 p-6 sm:p-7 rounded-3xl space-y-3 shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300">
            <div className="text-4xl">⚡</div>
            <h3 className="font-extrabold text-2xl text-main">{t.heroFeature3Title}</h3>
            <p className="text-base text-textSecondary leading-relaxed font-medium">
              {t.heroFeature3Desc}
            </p>
          </div>

          <div className="bg-card border border-textSecondary/20 p-6 sm:p-7 rounded-3xl space-y-3 shadow-sm hover:shadow-xl hover:border-accent/40 hover:-translate-y-1.5 transition-all duration-300">
            <div className="text-4xl">🎯</div>
            <h3 className="font-extrabold text-2xl text-main">{t.heroFeature4Title}</h3>
            <p className="text-base text-textSecondary leading-relaxed font-medium">
              {t.heroFeature4Desc}
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="max-w-3xl mx-auto text-center bg-card border-2 border-accent/30 p-8 sm:p-12 rounded-3xl space-y-6 shadow-md hover:shadow-2xl hover:border-accent transition-all duration-300">
        <h3 className="text-3xl sm:text-4xl font-black">
          {profile?.language === 'english' ? 'Ready to Start Learning?' : 'Tayyar Ho Seekhne Ke Liye?'}
        </h3>
        <p className="text-lg text-textSecondary font-medium">
          {profile?.language === 'english'
            ? 'Select your favorite topics and master algorithms on the padhDSA visual platform!'
            : 'Chalo apne favourite topics select karo aur padhDSA visual platform par algorithms master karo!'}
        </p>
        <div className="pt-2">
          <a
            href="/onboarding"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-accent via-[#E05338] to-accent2 text-onAccent px-10 py-4.5 rounded-2xl font-black text-xl shadow-xl shadow-accent/20 border border-accent2/40 ring-1 ring-white/20 hover:scale-105 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{t.heroStartBtn}</span>
            <span className="p-1.5 rounded-lg bg-white/20 text-focusBg group-hover:translate-x-1 transition-transform flex items-center justify-center">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default LandingHeroView;
