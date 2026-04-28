interface Props {
  label: string;
  value: number;
}

const IndexBar = ({ label, value }: Props) => (
  <div className="rounded-2xl border border-white/80 bg-white/70 p-3 shadow-[0_8px_24px_rgba(139,92,246,0.12)] backdrop-blur">
    <div className="mb-2 flex items-center justify-between text-xs font-medium text-slate-500">
      <span>{label}</span>
      <span className="rounded-full bg-violet-100 px-2 py-0.5 font-semibold text-violet-600">{value}</span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-violet-100">
      <div
        className="h-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-500 to-sky-400 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default IndexBar;
