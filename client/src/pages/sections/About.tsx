import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export function About() {
  const points = [
    'Scalable Backend Architecture',
    'Modern MERN Stack Development',
    'AI-Assisted Workflow & Code Quality',
    'Real-world ERP & Management Systems',
  ];

  return (
    <section id="about" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-4 sm:border-8 border-[#1e2024]">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
              alt="Workstation"
              className="w-full h-[220px] sm:h-[320px] md:h-[420px] lg:h-[500px] object-cover"
            />
          </div>
          <div className="mt-4 w-fit max-w-full sm:max-w-none bg-[#891989] p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl flex sm:absolute sm:mt-0 sm:-bottom-6 sm:-right-6 sm:block items-center gap-4 sm:gap-0">
            <p className="text-white font-bold text-3xl sm:text-4xl">3+</p>
            <p className="text-white/80 text-xs uppercase tracking-widest sm:mt-2 leading-snug">
              Years Experience
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2 text-left"
        >
          <p className="text-[#891989] text-xs sm:text-sm uppercase tracking-widest mb-2">My Story</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-4 sm:mb-6">
            About Me
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
            I am a{' '}
            <span className="text-white">Full Stack Web Developer and Software Engineer</span> passionate about
            building efficient, secure, and scalable software systems.
          </p>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
            With over three years of practical experience, I specialize in designing real-world systems like ERPs and
            e-commerce platforms. My focus is on robust backend development and seamless system architecture using tools
            like Django and Node.js.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
            {points.map((point, i) => (
              <div key={i} className="flex items-start gap-2 sm:gap-3 text-gray-300">
                <CheckCircle2 className="text-[#891989] shrink-0 mt-0.5" size={20} />
                <span className="text-sm font-medium leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
