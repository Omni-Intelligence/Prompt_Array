import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="flex items-center justify-center my-20">
      <div className="w-2 h-2 rounded-full bg-[#9333EA]/20" />
      <div className="w-96 h-[1px] bg-[#9333EA]/10" />
      <div className="w-3 h-3 rounded-full bg-[#9333EA]/30" />
      <div className="w-96 h-[1px] bg-[#9333EA]/10" />
      <div className="w-2 h-2 rounded-full bg-[#9333EA]/20" />
    </div>
  );
}
