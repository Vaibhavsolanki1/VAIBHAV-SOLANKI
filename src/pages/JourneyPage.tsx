import { Chapter5_Journey } from '../sections/Chapter5_Journey';
import { Chapter6_Beyond } from '../sections/Chapter6_Beyond';

export const JourneyPage = () => {
  return (
    <div className="pt-20 flex flex-col">
      {/* Chapter 5: Interactive Journey Timeline */}
      <Chapter5_Journey />

      {/* Chapter 6: Beyond Coding (Chess, F1, CP) */}
      <Chapter6_Beyond />
    </div>
  );
};

export default JourneyPage;

