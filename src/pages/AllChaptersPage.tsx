import { Hero } from '../sections/Hero';
import { Chapter1_Beginning } from '../sections/Chapter1_Beginning';
import { Chapter2_Projects } from '../sections/Chapter2_Projects';
import { Chapter3_Achievements } from '../sections/Chapter3_Achievements';
import { Chapter4_Skills } from '../sections/Chapter4_Skills';
import { Chapter5_Journey } from '../sections/Chapter5_Journey';
import { Chapter6_Beyond } from '../sections/Chapter6_Beyond';
import { Chapter7_GitHub } from '../sections/Chapter7_GitHub';
import { Chapter8_Vision } from '../sections/Chapter8_Vision';
import { Contact } from '../sections/Contact';

interface AllChaptersPageProps {
  onNavigate?: (page: string) => void;
}

export const AllChaptersPage = ({ onNavigate }: AllChaptersPageProps) => {
  return (
    <div className="flex flex-col">
      <Hero onNavigate={onNavigate} />
      <Chapter1_Beginning />
      <Chapter2_Projects />
      <Chapter3_Achievements />
      <Chapter4_Skills />
      <Chapter5_Journey />
      <Chapter6_Beyond />
      <Chapter7_GitHub />
      <Chapter8_Vision />
      <Contact />
    </div>
  );
};

export default AllChaptersPage;

