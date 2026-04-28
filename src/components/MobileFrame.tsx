import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MobileFrame = ({ children }: Props) => (
  <div className="relative mx-auto min-h-screen w-full max-w-[430px] overflow-hidden bg-gradient-to-b from-[#fff6ff] via-[#fcfbff] to-[#f3f8ff] px-5 pb-10 pt-6 text-slate-700 shadow-[0_20px_60px_rgba(124,58,237,0.2)]">
    <div className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-300/40 blur-3xl" />
    <div className="pointer-events-none absolute top-28 -right-20 h-60 w-60 rounded-full bg-sky-300/35 blur-3xl" />
    <div className="pointer-events-none absolute bottom-8 left-10 h-24 w-24 rounded-full bg-pink-200/35 blur-2xl" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default MobileFrame;
