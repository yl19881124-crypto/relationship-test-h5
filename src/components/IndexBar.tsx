interface Props {
  label: string;
  value: number;
}

const IndexBar = ({ label, value }: Props) => (
  <div className="rounded-xl bg-slate-800/80 p-3">
    <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-2 w-full rounded-full bg-slate-700">
      <div className="h-2 rounded-full bg-gradient-to-r from-brand to-accent" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default IndexBar;
