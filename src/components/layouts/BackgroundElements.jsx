// Static array content and positions
const ARRAY_CONTENT = [
  "AI", "GPT", "LLM", "NLP", "[]", "{}", "()", "<>",
  "0x", "=>", "fn", "let", "var", "for", "map", "if"
];

// Create three sets of positions at different vertical offsets
const createPositionSet = (yOffset) => [
  { x: 5, y: 15 + yOffset, rotation: 15 }, { x: 85, y: 20 + yOffset, rotation: 45 }, 
  { x: 15, y: 75 + yOffset, rotation: -30 }, { x: 90, y: 65 + yOffset, rotation: 20 },
  { x: 10, y: 45 + yOffset, rotation: -15 }, { x: 80, y: 40 + yOffset, rotation: 35 }, 
  { x: 25, y: 85 + yOffset, rotation: 25 }, { x: 75, y: 80 + yOffset, rotation: -25 },
  { x: 20, y: 30 + yOffset, rotation: -20 }, { x: 70, y: 25 + yOffset, rotation: 15 }, 
  { x: 30, y: 60 + yOffset, rotation: 40 }, { x: 65, y: 70 + yOffset, rotation: -35 },
  { x: 40, y: 15 + yOffset, rotation: -45 }, { x: 60, y: 85 + yOffset, rotation: 30 }, 
  { x: 35, y: 40 + yOffset, rotation: 10 }, { x: 55, y: 55 + yOffset, rotation: -10 }
].map((pos, i) => ({
  ...pos,
  size: 35 + (i % 3) * 10,
  content: ARRAY_CONTENT[i % ARRAY_CONTENT.length]
}));

// Create three sets of positions at different sections of the page
const POSITIONS = [
  ...createPositionSet(0),    // Top section
  ...createPositionSet(100),  // Middle section
  ...createPositionSet(200)   // Bottom section
];

const ArrayElement = ({ x, y, size, rotation, content }) => (
  <div 
    className="absolute rounded-md bg-gradient-to-r from-[#9333EA]/5 to-[#C084FC]/5 backdrop-blur-sm"
    style={{
      left: `${x}%`,
      top: `${y}vh`,  // Use vh instead of % to position relative to viewport height
      width: `${size}px`,
      height: `${size}px`,
      transform: `rotate(${rotation}deg)`,
    }}
  >
    <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-[#9333EA]/10 flex items-center justify-center text-[#9333EA]/30 font-mono text-sm">
      {content}
    </div>
  </div>
);

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      {POSITIONS.map((elem, index) => (
        <ArrayElement key={index} {...elem} />
      ))}
    </div>
  );
};
