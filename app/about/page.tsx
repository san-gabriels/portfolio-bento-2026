"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const EXPERIENCE_DATA = [
  {
    year: "2023 - Present",
    role: "Digital Infrastructure Architect and Web Analytics Lead",
    company: "C.NEXT Digital Ecosystem",
    description: "Designing and scaling data-driven web ecosystems. Driving technical SEO strategies and advanced GA4 tracking to optimize conversion flows, while integrating AI-assisted coding practices to accelerate custom web development without compromising structural stability and brand identity.",
  },
  {
    year: "2021 - 2023",
    role: "Lead WordPress Developer",
    company: "C.NEXT Spa",
    description: "Engineered the core corporate hub from the ground up, bypassing standard builder limitations. Focused on architecting custom WordPress environments, integrating tailored plugins, and managing complex databases to ensure rock-solid backend stability and seamless data flow for daily business operations.",
  },
  {
    year: "2019 - 2021",
    role: "Technical Web Specialist and Broadcast Specialist",
    company: "ComoNExT - Innovation Hub",
    description: "Managed digital legacy systems with a strong focus on technical SEO and structural maintenance. Simultaneously directed over 35 high-stakes, broadcast-quality live events, ensuring flawless real-time technical operations and seamless VIP stakeholder coordination.",
  },
  {
    year: "2014 - 2019",
    role: "Academic Foundations: Philosophy and Digital Design",
    company: "Università degli Studi di Milano and Politecnico di Milano",
    description: "Graduated Cum Laude in Philosophy with a thesis on Information Epistemology, followed by a Master's in Cultural Enterprise Design. Forged the rigorous critical thinking and logical frameworks now directly applied to web architecture and data analytics.",
  },
];

const PARAGRAPH = "Crafting scalable web ecosystems means turning complex business challenges into measurable digital platforms. My focus is on designing data-driven web architectures rather than just building standard websites. This approach is deeply rooted in my academic background in Information Philosophy. After all, studying philosophy prepares you for existential crises, but being a developer prepares you for servers crashing on a Friday evening. Both require strict logic and absolutely no panic. Understanding the relationship between raw data, structured information, and actionable knowledge provides the rigorous framework I use for web architecture and Technical SEO. Without this big picture, development is just stumbling in the dark. y seamlessly integrating advanced AI workflows and custom coding into the process, deployment and performance are significantly accelerated. Automation handles the heavy lifting, but human critical thinking always remains at the core of every architectural decision. Finally, I bridge the gap with advanced web analytics, because a technically perfect platform is useless if you can't measure how people actually use it.";

const words = PARAGRAPH.split(" ");
const emailText = "contact@gabrielmihali.com";

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]); 
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em] mt-[0.1em] text-white">
      {children}
    </motion.span>
  );
}

export default function AboutPage() {
  const textRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 75%", "end 35%"],
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-black text-white w-full">
      <main className="flex-1 w-full max-w-[1600px] mx-auto pt-[100px] lg:pt-[120px] pb-12 px-4 min-[700px]:px-8">
        
        {/* SECTION 1: Wall of Text */}
        <section ref={textRef} className="w-full mb-32 md:mb-48">
          <p className="text-2xl md:text-4xl lg:text-[48px] font-medium leading-tight tracking-tight flex flex-wrap max-w-6xl">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (3 / words.length);
              return (
                <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </ScrollWord>
              );
            })}
          </p>
        </section>

        {/* SECTION 2: Portrait Image */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-32 md:mb-48">
          <div className="hidden md:block"></div> 
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full overflow-hidden rounded-[24px]">
            <Image
              src="/images/profile.webp"
              alt="Gabriel Mihali Portrait"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* SECTION 3: Experience */}
        <section className="w-full mb-16 md:mb-24">
          <div className="flex flex-col border-t border-white/10">
            {EXPERIENCE_DATA.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[1fr_2fr_3fr] gap-4 md:gap-8 py-8 md:py-12 border-b border-white/10"
              >
                <div className="text-white/60 text-sm md:text-base font-medium">
                  {item.year}
                </div>
                <div className="flex flex-col">
                  <span className="text-white font-medium text-xl md:text-2xl">{item.role}</span>
                  <span className="text-white/60 text-sm md:text-base mt-1">{item.company}</span>
                </div>
                <div className="text-white/60 leading-relaxed text-sm md:text-base md:pr-12">
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* SECTION 4: Infinite Marquee */}
      <section className="w-full overflow-hidden mb-32 md:mb-48">
        <div className="relative flex whitespace-nowrap">
          <motion.div
            className="flex text-[10vw] uppercase font-medium tracking-tighter"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 350 }} 
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="pr-8">DIGITAL INFRASTRUCTURE • SCALABLE WEB ECOSYSTEMS • ADVANCED GA4 ANALYTICS • CORE WEB VITALS • LOGIC-DRIVEN ARCHITECTURE • CUSTOM AI INTEGRATIONS • TECHNICAL SEO • </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Giant CTA Footer (Email + Form) */}
      <footer id="contact" className="w-full max-w-[1600px] mx-auto px-4 min-[700px]:px-8 pb-12 flex flex-col gap-12 scroll-mt-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          
          {/* Colonna Sinistra: Email con Animazione */}
          <div className="flex flex-col overflow-hidden">
            <span className="text-white/60 text-sm font-medium uppercase tracking-widest mb-4">
              Let&apos;s work together
            </span>
            
            <a
  href="mailto:contact@gabrielmihali.com"
className="group relative inline-flex overflow-hidden py-2 mb-6 text-[20px] min-[400px]:text-[26px] sm:text-4xl md:text-5xl lg:text-4xl xl:text-[44px] font-bold tracking-tighter leading-tight">
              <span className="flex">
                {emailText.split("").map((char, index) => (
                  <span
                    key={`top-email-${index}`}
                    className="transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[110%]"
                    style={{ transitionDelay: `${index * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="absolute inset-0 flex text-white/60">
                {emailText.split("").map((char, index) => (
                  <span
                    key={`bottom-email-${index}`}
                    className="transform translate-y-[110%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                    style={{ transitionDelay: `${index * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </a>

            <p className="text-white/60 max-w-md text-sm md:text-base leading-relaxed mt-4">
              Feel free to drop me a line if you prefer direct email. Otherwise, use the form to send a quick message or request my complete resume.
            </p>
          </div>

          {/* Colonna Destra: Il Form Pulito */}
          <div className="w-full max-w-xl lg:ml-auto">
            {status === "success" ? (
              <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-medium mb-2">Message sent successfully!</h3>
                <p className="text-white/60">I will get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {/* Nome & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/60 uppercase tracking-wider">Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors rounded-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-white/60 uppercase tracking-wider">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-white/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors rounded-none" 
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/60 uppercase tracking-wider">Company *</label>
                  <input 
                    type="text" 
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors rounded-none" 
                  />
                </div>

                {/* Messaggio */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm text-white/60 uppercase tracking-wider">Message *</label>
                  <textarea 
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-white/20 pb-2 text-lg focus:outline-none focus:border-white transition-colors resize-none rounded-none" 
                  />
                </div>

{/* GDPR Privacy Checkbox */}
                <div className="flex items-start gap-3 mt-2">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent accent-white cursor-pointer"
                  />
                  <label htmlFor="privacy" className="text-sm text-white/60 leading-tight cursor-pointer">
                    I have read the <a href="/privacy" target="_self" className="text-white underline hover:text-white/80 transition-colors">Privacy Policy</a> and agree to the processing of my personal data.
                  </label>
                </div>

                {/* Pulsante Submit */}
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="mt-4 w-full md:w-auto self-end bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>
                
                {status === "error" && (
                  <span className="text-red-400 text-sm text-right mt-2">Something went wrong. Please try again.</span>
                )}
              </form>
            )}
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-8 border-t border-white/10 mt-12 md:mt-24">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} ... Made with love by me!
          </div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/sandu-gabriel-mihali/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}