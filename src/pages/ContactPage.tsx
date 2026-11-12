import { Chapter8_Vision } from '../sections/Chapter8_Vision';
import { Contact } from '../sections/Contact';

export const ContactPage = () => {
  return (
    <div className="pt-20 flex flex-col">
      {/* Chapter 8: Future Vision */}
      <Chapter8_Vision />

      {/* Interactive Contact & Socials */}
      <Contact />
    </div>
  );
};

export default ContactPage;

