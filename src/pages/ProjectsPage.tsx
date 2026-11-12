import { Chapter2_Projects } from '../sections/Chapter2_Projects';
import { Chapter7_GitHub } from '../sections/Chapter7_GitHub';

export const ProjectsPage = () => {
  return (
    <div className="pt-20 flex flex-col">
      {/* Chapter 2: Projects */}
      <Chapter2_Projects />

      {/* Chapter 7: GitHub Repos & Activity */}
      <Chapter7_GitHub />
    </div>
  );
};

export default ProjectsPage;

