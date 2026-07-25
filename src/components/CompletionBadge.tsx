import React, { useState } from 'react';
import { useStore } from '@nanostores/react';
import { studentStore } from '../stores/student';

export const CompletionBadge: React.FC = () => {
  const profile = useStore(studentStore);
  const [copied, setCopied] = useState<boolean>(false);

  const studentName = profile.name || 'Champ';
  const interestsList = profile.interests.join(', ') || 'Fun Scenarios';

  const shareText = `🎉 Maine ${studentName} ne Bubble Sort bina kisi stress ke seekha apne favourite topics (${interestsList}) ke saath! Check karo:`;
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fundsa.vercel.app';

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
        {/* Decorative Badge Seal */}
        <div className="w-24 h-24 mx-auto bg-focusBg border-2 border-focusBorder rounded-full flex items-center justify-center text-4xl shadow-md transform hover:rotate-6 transition-transform">
          🏆
        </div>

        <div className="space-y-2">
          <span className="bg-focusBg border border-focusBorder text-focusText text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            Official Completion Certificate
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-main tracking-tight">
            Mubarak Ho, <span class="text-accent font-handwritten text-4xl sm:text-5xl">{studentName}!</span>
          </h2>
          <p className="text-textSecondary text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Tumne Bubble Sort ka har single step — comparing, swapping, aur repeat passes — 
            bilkul champion ki tarah master kar liya hai!
          </p>
        </div>

        {/* Interests Pills */}
        <div className="flex flex-wrap justify-center items-center gap-2 pt-1">
          <span className="text-xs font-mono text-textSecondary">Interests Mastered:</span>
          {profile.interests.map((int, idx) => (
            <span
              key={idx}
              className="bg-bg border border-textSecondary/30 text-main text-xs font-bold px-2.5 py-1 rounded-lg"
            >
              {int}
            </span>
          ))}
        </div>

        {/* Share Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppShare}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>📲 WhatsApp Pe Share Karo</span>
          </button>

          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <span>{copied ? '✓ Link Copied!' : '🔗 Copy Share Link'}</span>
          </button>
        </div>
      </div>

      {/* Teaser Box for Next Algorithm */}
      <div className="dhyan-do-box p-6 rounded-3xl text-center space-y-2 shadow-sm">
        <div className="inline-flex items-center gap-2 font-extrabold text-sm sm:text-base">
          <span>🚀</span>
          <span>AGLA STOP: SELECTION SORT!</span>
        </div>
        <p className="text-xs sm:text-sm font-semibold leading-relaxed max-w-lg mx-auto">
          Selection Sort aayega next — jahan minimum item ko dhoondh kar sabse pehle lagate hain. Agle level ke liye ready rehna! 💪
        </p>
      </div>

      {/* Footer Navigation */}
      <div className="text-center pt-2">
        <a
          href="/"
          className="px-6 py-3 rounded-xl border border-textSecondary/30 bg-bg text-main hover:border-accent text-sm font-semibold inline-block"
        >
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
};

export default CompletionBadge;
