interface Props {
  label: string;
  value: number;
  dark?: boolean;
}

const IndexBar = ({ label, value, dark = false }: Props) => (
  <div
    className={`rounded-2xl border p-3 shadow-[0_8px_24px_rgba(139,92,246,0.12)] backdrop-blur ${
      dark ? 'border-white/20 bg-white/10' : 'border-white/80 bg-white/70'
    }`}
  >
    <div className={`mb-2 flex items-center justify-between text-xs font-medium ${dark ? 'text-white/80' : 'text-slate-500'}`}>
      <span>{label}</span>
      <span className={`rounded-full px-2 py-0.5 font-semibold ${dark ? 'bg-white/20 text-white' : 'bg-violet-100 text-violet-600'}`}>
        {value}
      </span>
    </div>
    <div className={`h-2.5 w-full overflow-hidden rounded-full ${dark ? 'bg-white/20' : 'bg-violet-100'}`}>
      <div
        className="h-2.5 rounded-full bg-gradient-to-r from-fuchsia-400 via-violet-500 to-sky-400 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);

export default IndexBar;
