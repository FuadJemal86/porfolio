import { Phone, Mail, MapPin, Facebook, Linkedin, Github } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  return (
    <section id="contact" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[#ff014f] text-xs sm:text-sm uppercase tracking-widest mb-2">Contact</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300">Contact With Me</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-gradient-to-br from-[#1e2024] to-[#23272b] p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl"
          >
            <div className="rounded-xl overflow-hidden mb-6 sm:mb-8">
              <img
                src="https://images.unsplash.com/photo-1516387792267-308f2538eda7?w=600&q=80"
                alt="Contact"
                className="w-full h-40 sm:h-52 object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-300 mb-2">Fuad Jemal</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm">
              Full Stack Developer
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              I am available for freelance work. Connect with me via phone or email.
            </p>

            <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
              <div className="flex items-center gap-3 sm:gap-4 text-gray-400 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-[#1a1c20] shadow-xl flex items-center justify-center text-[#ff014f]">
                  <Phone size={18} className="sm:w-5 sm:h-5" />
                </div>
                <a href="tel:+251902920301" className="text-sm sm:text-base break-all">
                  +251 902920301
                </a>
              </div>
              <div className="flex items-center gap-3 sm:gap-4 text-gray-400 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-[#1a1c20] shadow-xl flex items-center justify-center text-[#ff014f]">
                  <Mail size={18} className="sm:w-5 sm:h-5" />
                </div>
                <a href="mailto:fuad.jemal.mail@gmail.com" className="text-sm sm:text-base break-all">
                  fuad.jemal.mail@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3 sm:gap-4 text-gray-400 text-sm sm:text-base">
                <div className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 rounded-lg bg-[#1a1c20] shadow-xl flex items-center justify-center text-[#ff014f] mt-0.5">
                  <MapPin size={18} className="sm:w-5 sm:h-5" />
                </div>
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>

            <p className="text-gray-400 text-xs uppercase tracking-widest mb-3 sm:mb-4">Find me in</p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {[<Facebook key="f" />, <Linkedin key="l" />, <Github key="g" />].map((icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-[#1e2024] shadow-xl flex items-center justify-center text-white hover:text-[#ff014f] hover:-translate-y-1 transition-all"
                >
                  {icon}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-gradient-to-br from-[#1e2024] to-[#23272b] p-5 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-2xl min-w-0"
          >
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="sm:col-span-1">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">
                  Your Name
                </label>
                <input
                  type="text"
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#ff014f] outline-none transition-all shadow-inner"
                />
              </div>
              <div className="sm:col-span-1">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#ff014f] outline-none transition-all shadow-inner"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">Email</label>
                <input
                  type="email"
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#ff014f] outline-none transition-all shadow-inner"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">Subject</label>
                <input
                  type="text"
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#ff014f] outline-none transition-all shadow-inner"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-gray-400 text-xs uppercase font-semibold mb-2 sm:mb-3 block">Message</label>
                <textarea
                  rows={5}
                  className="w-full min-w-0 box-border bg-[#191b1e] border-2 border-[#191b1e] rounded-lg p-3 sm:p-4 text-white text-sm sm:text-base focus:border-[#ff014f] outline-none transition-all shadow-inner resize-y min-h-[120px] sm:min-h-[150px]"
                />
              </div>
              <button
                type="submit"
                className="sm:col-span-2 py-3 sm:py-4 rounded-lg bg-[#1e2024] shadow-2xl text-[#ff014f] text-sm sm:text-base font-bold uppercase tracking-widest hover:bg-[#ff014f] hover:text-white transition-all duration-300 mt-2"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
