import { Chapter4_Skills } from '../sections/Chapter4_Skills';
import { Chapter3_Achievements } from '../sections/Chapter3_Achievements';

export const SkillsPage = () => {
  return (
    <div className="pt-20 flex flex-col">
      {/* Chapter 4: Skills Matrix */}
      <Chapter4_Skills />

      {/* Chapter 3: Hackathon & Competitive Achievements */}
      <Chapter3_Achievements />
    </div>
  );
};

export default SkillsPage;

