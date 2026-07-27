import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';
import CategoryIcon from './CategoryIcon';

export const CompletionBadge: React.FC = () => {
  const profile = useStore(studentStore);
  const [copied, setCopied] = useState<boolean>(false);

  const studentName = profile.name || 'Student';

  // Official & Professional Certificate Share Message
  const shareText = `🏆 Official Achievement Unlocked! I, ${studentName}, have successfully completed & mastered the Bubble Sort Algorithm Module on the DSA 101 Visual Platform! 🚀 Verify & explore interactive algorithms:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://dsa101.vercel.app';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Celebration Card */}
      <div className="bg-card border-2 border-focusBorder rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-6 relative overflow-hidden">
        {/* Premium Trophy Seal Vector SVG */}
        <div className="w-24 h-24 mx-auto bg-focusBg border-2 border-focusBorder rounded-full flex items-center justify-center shadow-md transform hover:rotate-6 transition-transform">
          <svg className="w-12 h-12 text-accent fill-current" viewBox="0 0 24 24">
            <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0011 15.9V18H8v2h8v-2h-3v-2.1c2.12-.41 3.76-2.07 4.39-4.24C19.08 11.35 21 9.27 21 6.7V5c0-1.1-.9-2-2-2zM5 7.7V7h2v3.1c-1.15-.36-2-1.43-2-2.4zm14 0c0 .97-.85 2.04-2 2.4V7h2v.7z" />
          </svg>
        </div>

        <div className="space-y-2">
          <span className="bg-focusBg border border-focusBorder text-focusText text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Official Completion Certificate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-main tracking-tight">
            Congratulations, <span className="text-accent font-handwritten text-4xl sm:text-5xl">{studentName}!</span>
          </h2>
          <p className="text-textSecondary text-sm sm:text-base max-w-md mx-auto leading-relaxed font-medium">
            You have successfully mastered the Bubble Sort Algorithm — including adjacent comparisons, swapping mechanics, and pass-settlement criteria!
          </p>
        </div>

        {/* Share Action Buttons with Premium Vector SVG Icons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Official WhatsApp Vector Button */}
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#25D366] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2.5 hover:bg-[#20bd5a] hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.84 9.84 0 0 0 12.04 2zm5.8 14.28c-.24.68-1.42 1.3-1.95 1.38-.49.08-1.12.12-3.6-0.91-3.17-1.31-5.21-4.52-5.37-4.73-.16-.21-1.3-1.73-1.3-3.3 0-1.57.82-2.34 1.11-2.66.29-.32.64-.4.85-.4.21 0 .42.01.6.01.2 0 .46-.07.72.55.27.64.91 2.23.99 2.39.08.16.13.35.03.56-.1.21-.16.34-.32.53-.16.19-.34.42-.49.56-.16.16-.33.34-.14.66.19.32.84 1.38 1.8 2.24 1.24 1.1 2.28 1.45 2.6 1.6.32.16.51.13.7-.08.19-.21.82-.96 1.04-1.28.22-.32.44-.27.74-.16.3.11 1.9.9 2.23 1.06.33.16.55.24.63.38.08.14.08.82-.16 1.5z" />
            </svg>
            <span>Share Achievement on WhatsApp</span>
          </button>

          {/* Premium Copy Link Vector Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl border-2 border-textSecondary/30 bg-card text-main hover:border-accent hover:shadow-md text-sm font-extrabold transition-all flex items-center justify-center gap-2.5 hover:-translate-y-0.5"
          >
            {copied ? (
              <>
                <svg className="w-5 h-5 fill-none stroke-accent stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-accent font-black">Link Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Copy Share Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Teaser Box for Next Algorithm */}
      <div className="dhyan-do-box p-6 rounded-3xl text-center space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-2 font-extrabold text-sm sm:text-base">
          <CategoryIcon name="rocket" className="w-5 h-5 text-accent inline-block" />
          <span>NEXT STOP: SELECTION SORT!</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold leading-relaxed max-w-lg mx-auto text-main/80">
          Selection Sort is coming up next — where the minimum element is iteratively selected and placed at the beginning. Get ready for the next level!
        </p>
      </div>

      {/* Footer Navigation */}
      <div className="text-center pt-2">
        <a
          href="/"
          className="px-6 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-semibold inline-block transition-all hover:-translate-y-0.5"
        >
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default CompletionBadge;
