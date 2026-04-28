import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const MobileFrame = ({ children }: Props) => (
  <div className="mx-auto min-h-screen w-full max-w-[430px] bg-slate-900 px-4 pb-8 pt-6 shadow-glow">
    {children}
  </div>
);

export default MobileFrame;
