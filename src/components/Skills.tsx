"use client";

import { motion } from "framer-motion";

import { skillsData } from "@/app/data/HeroIcons";

const categoryOrder = ["frontend", "backend", "infra", "ai"] as const;

const categoryTitles: Record<(typeof categoryOrder)[number], string> = {
  frontend: "Frontend",
  backend: "Backend",
  infra: "Infra",
  ai: "AI",
};

const Skills = () => {
  const groupedSkills = categoryOrder.map((category) => ({
    category,
    skills: skillsData.filter((skill) => skill.category === category),
  }));

  return (
    <section className="section-band section-band--sand">
      <div className="page-shell">
        <div className="grid gap-12 lg:grid-cols-[0.35fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80 mb-6">
              Stack
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.04em] text-slate-950 dark:text-white sm:text-5xl">
              Tools.
            </h2>
          </motion.div>

          <motion.div
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.04,
                },
              },
            }}
            className="space-y-10"
          >
            {groupedSkills.map(({ category, skills }) => (
              <div key={category}>
                <div className="mb-4 flex items-center gap-4">
                  <h3 className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                    {categoryTitles[category]}
                  </h3>
                  <span className="h-px w-full bg-slate-200 dark:bg-white/10" />
                  <span className="shrink-0 font-mono text-xs font-semibold text-slate-400 dark:text-slate-500">
                    {String(skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.3,
                            ease: "easeOut",
                          },
                        },
                      }}
                      whileHover={{ y: -3 }}
                      title={skill.name}
                      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200/60 bg-white/50 p-3 text-slate-900 transition-colors hover:border-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                        unoptimized
                      />
                      <span className="text-xs font-medium text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
