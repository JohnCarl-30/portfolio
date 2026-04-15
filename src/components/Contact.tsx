'use client'
import Heading from "./sub/Heading";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast.success("Message sent! John will get back to you soon.");
        setIsSubmitting(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <section id="contact" className="py-24 px-6 lg:px-8 max-w-6xl mx-auto w-full">
            <div className="md:pl-6 mb-12">
                <Heading text={"Contact Me"} />
            </div>

            <div className="md:pl-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-6"
                >
                    <h2 className="text-2xl font-semibold text-foreground">Let&apos;s work together</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        Have a project in mind or just want to say hi? Feel free to reach out. 
                        I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>
                    
                    <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="font-medium text-foreground">Email:</span>
                            <a href="mailto:contact@example.com" className="hover:text-blue-500 transition-colors">johncarl.santos@example.com</a>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="font-medium text-foreground">Location:</span>
                            <span>Manila, Philippines</span>
                        </div>
                    </div>
                </motion.div>

                <motion.form 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                            <Input id="name" name="name" placeholder="Your Name" required />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                            <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                        <Input id="subject" name="subject" placeholder="Project Inquiry" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                        <Textarea id="message" name="message" placeholder="Tell me about your project..." className="min-h-[150px]" required />
                    </div>
                    <Button 
                        disabled={isSubmitting}
                        className="w-full sm:w-max mt-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 disabled:opacity-50"
                    >
                        {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
