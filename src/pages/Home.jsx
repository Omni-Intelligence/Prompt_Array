import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { UseCases } from "@/components/home/UseCases";
import { Features } from "@/components/home/Features";
import { Community } from "@/components/home/Community";
import { Learning } from "@/components/home/Learning";
import { GetStarted } from "@/components/home/GetStarted";
import { HomeLayout } from "@/components/layouts/HomeLayout";
import { Footer } from "@/components/home/Footer";
import { Link } from 'react-router-dom';
import { SectionDivider } from "@/components/ui/section-divider";

const BracketDecoration = ({ left }) => (
  <div 
    className={`fixed ${left ? 'left-0' : 'right-0'} top-1/2 -translate-y-1/2 text-[40rem] font-mono text-gray-100/10 dark:text-gray-800/10 select-none pointer-events-none`}
  >
    {left ? '[' : ']'}
  </div>
);

const BackgroundDecorator = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Code matrix rain effect */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' font-size='20' fill='%239333EA'%3E%5B%5D%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }} />

      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-[1200px] h-[1200px] bg-gradient-to-br from-[#9333EA]/10 to-transparent rounded-full opacity-30 blur-[120px] transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-[1200px] h-[1200px] bg-gradient-to-tl from-[#C084FC]/10 to-transparent rounded-full opacity-30 blur-[120px] transform translate-x-1/2 translate-y-1/2" />
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
          <SectionDivider />
          <HowItWorks />
          <SectionDivider />
          <UseCases />
          <SectionDivider />
          <Learning />
          <SectionDivider />
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