
import TechnologyIcon from "./TechIcons";

interface ChildProp {
  value: string;
}
export function TechBox({ value }: ChildProp) {
  return (
    <div className=" h-10 border-2 border-gray-300 bg-none flex items-center justify-between px-3 rounded-md gap-2 ">
      <TechnologyIcon technology={value} /> {value}
    </div>
  );
}