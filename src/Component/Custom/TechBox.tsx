import TechnologyIcon from "./TechIcons";

interface TechBoxProps {
  value: string;
  badge?: any;
}

export function TechBox({ value, badge }: TechBoxProps) {
  return (
    <div className="h-10 border-2 border-gray-300 bg-none flex items-center justify-between px-3 rounded-md gap-2 relative">
      <TechnologyIcon technology={value} />
      <span>{value}</span>
      {badge && (
        <span className="absolute top-0 right-0 -mt-4 -mr-3 px-2 py-1  text-black rounded-full">{badge}</span>
      )}
    </div>
  );
}
