'use client'
import Heading from "./sub/Heading";
import Image from "next/image";
import { skillsData } from "../app/data/HeroIcons";
import { motion } from "framer-motion";

const Skills = () => {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.2,
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24, scale: 0.92 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 260,
                damping: 20,
            }
        }
    }

    return (
        <div className="flex flex-col items-center max-w-6xl mx-auto gap-y-20 px-6 lg:px-8 py-24">
            <div className="md:pl-6 w-full">
                <Heading text={"Skills"} />
            </div>

            <motion.div
                className="md:pl-6 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                id="skills"
            >
                {skillsData.map((skill, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{
                            scale: 1.06,
                            y: -4,
                            boxShadow: "0 8px 30px rgba(96, 165, 250, 0.25)",
                            borderColor: "rgba(96, 165, 250, 0.9)",
                            backgroundColor: "#fff",
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-x-3 rounded-xl border border-blue-300 bg-zinc-100 px-4 py-3 cursor-default"
                        style={{ willChange: "transform" }}
                    >
                        <motion.div
                            className="flex-shrink-0"
                            whileHover={{ rotate: [0, -10, 10, -6, 6, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={100}
                                height={100}
                                className="h-auto w-[36px]"
                            />
                        </motion.div>

                        <p className="text-sm text-gray-600 truncate font-medium">{skill.name}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default Skills