"use client";

import Image from "next/image";
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
            transition={{ duration: 0.35 }}
          >
            <p className="section-eyebrow">Stack</p>
            <h2 className="section-title">Tools.</h2>
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
                  <h3 className="shrink-0 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {categoryTitles[category]}
                  </h3>
                  <span className="h-px w-full bg-border" />
                  <span className="shrink-0 font-mono text-xs font-semibold text-muted-foreground/70">
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
                      className="card-surface group flex flex-col items-center justify-center gap-2 rounded-xl p-3 text-foreground transition-colors hover:border-primary/40"
                    >
                      <Image
                        src={skill.icon}
                        alt={skill.name}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                      />
                      <span className="text-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
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
