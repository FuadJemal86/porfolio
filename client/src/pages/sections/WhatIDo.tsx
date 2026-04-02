import { Server, Layout, Database, Search, ShieldCheck, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const services = [
  { icon: <Server />, title: 'Backend Development', desc: 'Expertise in Django and Node.js for robust, scalable server-side logic.' },
  { icon: <Layout />, title: 'Frontend Development', desc: 'Building responsive, dynamic UIs with React.js and modern CSS frameworks.' },
  { icon: <Database />, title: 'System Architecture', desc: 'Designing complex database schemas with MySQL, PostgreSQL, and MongoDB.' },
  { icon: <Search />, title: 'Data Scraping', desc: 'Automated tools for collecting and processing structured data from the web.' },
  { icon: <Layers />, title: 'ERP Systems', desc: 'Developing custom management platforms for business operations and tracking.' },
  { icon: <ShieldCheck />, title: 'Security & Auth', desc: 'Implementing JWT, RBAC, and secure API integration protocols.' },
];

export function WhatIDo() {
  return (
    <section id="services" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-[#891989] text-xs sm:text-sm uppercase tracking-widest mb-2">Features</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300">What I Do</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#1e2024] to-[#23272b] shadow-2xl group hover:from-[#891989] hover:to-[#891989] transition-all duration-500"
            >
              <div className="text-[#891989] group-hover:text-white mb-4 sm:mb-6 transition-colors [&_svg]:shrink-0">
                {React.cloneElement(service.icon, { className: 'w-8 h-8 sm:w-10 sm:h-10' })}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-300 group-hover:text-white mb-3 sm:mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 group-hover:text-white/80 text-sm sm:text-base leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
