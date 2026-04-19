"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { skillsData } from "@/app/data/HeroIcons";
import Heading from "./sub/Heading";

const Skills = () => {
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
            className="grid grid-cols-4 gap-3 sm:grid-cols-5"
          >
            {skillsData.map((skill) => (
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
                whileHover={{ y: -2 }}
                title={skill.name}
                className="flex aspect-square items-center justify-center rounded-[1.3rem] border border-slate-200/80 bg-white/70 p-4 backdrop-blur-sm transition-colors hover:border-primary/40 dark:border-white/10 dark:bg-white/5 dark:hover:border-primary/40"
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={52}
                  height={52}
                  className="h-10 w-10 object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
