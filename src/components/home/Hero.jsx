import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ArrayElement = ({ x, y, size, delay, content }) => (
  <div 
    className="absolute rounded-md bg-gradient-to-r from-[#9333EA]/5 to-[#C084FC]/5 backdrop-blur-sm"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: `${size}px`,
      height: `${size}px`,
      animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
      animationDelay: `${delay}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    }}
  >
    <div className="absolute inset-0 rounded-md ring-1 ring-inset ring-[#9333EA]/10 flex items-center justify-center text-[#9333EA]/30 font-mono text-sm">
      {content}
    </div>
  </div>
);

const BracketDecoration = ({ left }) => (
  <div 
    className={`absolute top-1/2 -translate-y-1/2 ${left ? 'left-0' : 'right-0'} text-8xl text-[#9333EA]/10 font-mono animate-pulse`}
    style={{ writingMode: 'vertical-rl' }}
  >
    {left ? '['.repeat(5) : ']'.repeat(5)}
  </div>
);

const StepButton = ({ number, text }) => (
  <button className="bg-white/95 backdrop-blur-sm rounded-md px-7 py-3 relative group transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#9333EA]/10">
    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-[#9333EA]/5 to-[#C084FC]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    <span className="absolute -top-3 -left-1 text-sm font-medium text-[#9333EA] tracking-wide">[{number}]</span>
    <span className="text-gray-700 text-base font-medium relative z-10">{text}</span>
    <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-[#9333EA] via-[#C084FC] to-[#9333EA] opacity-0 group-hover:opacity-100 transition-opacity" />
  </button>
);

const TypewriterText = ({ text, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);
  
  return (
    <span className="font-mono">
      {displayText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

export function Hero() {
  // Generate array elements positions with content
  const arrayContent = [
    "AI", "GPT", "LLM", "NLP", "[]", "{}", "()", "<>",
    "0x", "=>", "fn", "let", "var", "for", "map", "if"
  ];
  
  const arrayElements = Array.from({ length: 32 }, (_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 30 + Math.random() * 40,
    delay: i * 0.2,
    content: arrayContent[i % arrayContent.length]
  }));

  return (
    <div className="relative py-24">
      <div className="relative flex flex-col items-center max-w-5xl mx-auto px-4">
        {/* Main Content */}
        <div className="text-center space-y-8 mb-14">
          <h1 className="text-7xl font-bold leading-tight tracking-tight">
            <div className="bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent inline-block">
              Your AI Prompts,
            </div>
            <div className="bg-gradient-to-r from-[#9333EA] to-[#C084FC] bg-clip-text text-transparent inline-block mt-2">
              Perfectly <TypewriterText text="Arranged" delay={500} />
            </div>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-white/30 rounded-lg p-4">
            Create, organize, and share powerful AI prompts. Boost your productivity
            with our intuitive prompt management platform.
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-6 mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-xl" />
          <StepButton number="0" text="Create" />
          <StepButton number="1" text="Organize" />
          <StepButton number="2" text="Chain" />
          <StepButton number="3" text="Share" />
          <StepButton number="4" text="Iterate" />
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-5">
          <Link
            to="/get-started"
            className="group relative overflow-hidden bg-[#9333EA] text-white px-8 py-3.5 rounded-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#9333EA]/25 text-lg font-medium"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA] to-[#C084FC] opacity-0 group-hover:opacity-100 transition-all duration-300" />
            <span className="relative flex items-center gap-2">
              Get Started
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.75 6.75L19.25 12L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 12H4.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </Link>
          <Link
            to="/dashboard"
            className="group relative bg-white/95 backdrop-blur-sm text-gray-700 px-8 py-3.5 rounded-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-xl hover:shadow-[#9333EA]/10 text-lg font-medium"
          >
            <span className="relative">Go to Dashboard</span>
            <div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-[#9333EA] via-[#C084FC] to-[#9333EA] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </div>
  );
}
