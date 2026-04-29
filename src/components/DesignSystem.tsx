import { ReactNode } from 'react';

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="app-shell relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden px-5 pb-10 pt-6 text-slate-700 shadow-[0_25px_70px_rgba(124,58,237,0.28)]">
    <FloatingDecor />
    <div className="relative z-10">{children}</div>
  </div>
);

export const FloatingDecor = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="float-decor left-5 top-20">✨</div>
    <div className="float-decor right-6 top-36">💜</div>
    <div className="float-decor left-10 top-[55%]">🫧</div>
    <div className="float-decor right-8 top-[70%]">⭐</div>
    <div className="bubble bubble-a" />
    <div className="bubble bubble-b" />
  </div>
);

export const GradientButton = ({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={`btn-gradient w-full rounded-2xl px-5 py-4 text-base font-black text-white ${className}`}>{children}</button>
);

export const SoftCard = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`soft-card rounded-[28px] border border-white/80 bg-white/75 p-5 backdrop-blur ${className}`}>{children}</div>
);

export const ChoiceCard = ({ selected, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) => (
  <button {...props} className={`choice-card w-full rounded-3xl border px-4 py-4 text-left transition ${selected ? 'is-selected' : ''} ${props.className ?? ''}`}>{children}</button>
);

export const ProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-xs font-semibold text-violet-600"><span>关系扫描进度 {current}/{total}</span><span>🛰️</span></div>
    <div className="h-3 rounded-full bg-violet-100 p-[2px]"><div className="h-full rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-500 to-sky-400 transition-all duration-500" style={{ width: `${(current / total) * 100}%` }} /></div>
  </div>
);

export const StickerLabel = ({ children }: { children: ReactNode }) => <p className="sticker-label">{children}</p>;
export const ResultBadge = ({ children }: { children: ReactNode }) => <p className="result-badge">{children}</p>;
export const PosterCard = ({ children }: { children: ReactNode }) => <div className="poster-shell rounded-[30px] border border-white/70 p-5 text-white shadow-[0_22px_44px_rgba(79,70,229,0.32)]">{children}</div>;
export const SectionCard = ({ title, icon, children }: { title: string; icon: string; children: ReactNode }) => (
  <section className="soft-card rounded-3xl p-5"><p className="text-xs font-semibold text-slate-400">{icon} {title}</p><div className="mt-2 text-sm leading-relaxed text-slate-700">{children}</div></section>
);
