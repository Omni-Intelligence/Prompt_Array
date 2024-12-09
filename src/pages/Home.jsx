import { HomeLayout } from "@/components/layouts/HomeLayout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { HowItWorks } from "@/components/home/HowItWorks";
import { UseCases } from "@/components/home/UseCases";
import { Community } from "@/components/home/Community";
import { Learning } from "@/components/home/Learning";
import { GetStarted } from "@/components/home/GetStarted";
import { Footer } from "@/components/home/Footer";
import { Link } from 'react-router-dom';
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
    className={`fixed top-1/2 -translate-y-1/2 ${left ? 'left-0' : 'right-0'} text-8xl text-[#9333EA]/10 font-mono animate-pulse`}
    style={{ writingMode: 'vertical-rl' }}
  >
    {left ? '['.repeat(5) : ']'.repeat(5)}
  </div>
);

const BackgroundDecorator = () => {
  const [elements, setElements] = useState([]);
  
  useEffect(() => {
    const arrayContent = [
      "AI", "GPT", "LLM", "NLP", "[]", "{}", "()", "<>",
      "0x", "=>", "fn", "let", "var", "for", "map", "if"
    ];
    
    const newElements = Array.from({ length: 40 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 30 + Math.random() * 40,
      delay: i * 0.2,
      content: arrayContent[i % arrayContent.length],
      id: i
    }));
    
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Code matrix rain effect */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%239333EA'%3E%5B%5D%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }} />

      {/* Floating array elements */}
      {elements.map((elem) => (
        <ArrayElement key={elem.id} {...elem} />
      ))}

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-[1200px] h-[1200px] bg-gradient-to-br from-[#9333EA]/10 to-transparent rounded-full opacity-30 blur-[120px] transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute right-0 bottom-0 w-[1200px] h-[1200px] bg-gradient-to-tl from-[#C084FC]/10 to-transparent rounded-full opacity-30 blur-[120px] transform translate-x-1/2 translate-y-1/2 animate-pulse" />
    </div>
  );
};

const Home = () => {
  return (
    <HomeLayout>
      <div className="relative">
        {/* Fixed Background */}
        <BackgroundDecorator />
        <BracketDecoration left={true} />
        <BracketDecoration left={false} />
        
        {/* Content */}
        <div className="relative">
          <Hero />
          <Features />
          <HowItWorks />
          <UseCases />
          {/* <Community /> */}
          <Learning />
          <GetStarted />
          <Footer>
            <Link to="/app/templates" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
              Templates
            </Link>
            <Link to="/app/pricing" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
              Pricing
            </Link>
            <Link to="/app/learn" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary">
              Learn
            </Link>
          </Footer>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;