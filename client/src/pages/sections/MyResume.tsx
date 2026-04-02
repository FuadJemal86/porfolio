export function MyResume() {
  const skillGroups = [
    {
      title: 'Backend',
      skills: ['Django', 'Node.js', 'REST APIs', 'Auth Systems', 'Docker', 'CI/CD'],
    },
    { title: 'Frontend', skills: ['React.js', 'Tailwind', 'Formik', 'Dynamic UI'] },
    { title: 'Databases', skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Prisma'] },
  ];

  return (
    <section id="resume" className="py-14 sm:py-20 md:py-24 bg-[#212428] border-t border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-[#891989] text-xs sm:text-sm uppercase tracking-widest mb-2">3+ Years of Experience</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-300 mb-10 sm:mb-16">My Resume</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
          {skillGroups.map((group, i) => (
            <div
              key={i}
              className="text-left bg-[#1e2024] p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-xl"
            >
              <h3 className="text-[#891989] text-lg sm:text-xl font-bold mb-4 sm:mb-6 border-b border-gray-800 pb-2">
                {group.title}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-gray-300 text-sm sm:text-base">
                    <div className="w-2 h-2 shrink-0 rounded-full bg-[#891989]" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
