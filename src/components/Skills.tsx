"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { skillsData } from "@/app/data/HeroIcons";
import Heading from "./sub/Heading";

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
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="md:pl-6"
          >
            <div className="section-kicker">
              <span className="section-rule" />
              Stack
            </div>
            <Heading text="Tools." />
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
            className="space-y-8"
          >
            {groupedSkills.map(({ category, skills }) => (
              <div key={category} className="space-y-4">
                <div className="flex items-center gap-4">
                  <h3 className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300/80">
                    {categoryTitles[category]}
                  </h3>
                  <span className="h-px w-full bg-slate-200 dark:bg-white/10" />
                  <span className="shrink-0 text-[0.68rem] font-semibold tracking-[0.16em] text-slate-400 dark:text-slate-500">
                    {String(skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
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
                      whileHover={{ y: -3, borderColor: "rgba(100,116,139,0.45)" }}
                      title={skill.name}
                      className="group flex aspect-[0.93/1] min-h-[90px] flex-col items-center justify-center gap-2 rounded-[0.95rem] border border-slate-200/80 bg-white/70 p-2.5 text-slate-900 backdrop-blur-sm transition-colors hover:border-primary/40 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 dark:hover:border-primary/40"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={28}
                        height={28}
                        className="h-7 w-7 object-contain"
                      />
                      <span className="text-[0.78rem] font-medium tracking-[0.01em] text-slate-600 transition-colors group-hover:text-slate-900 dark:text-slate-300 dark:group-hover:text-white">
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
