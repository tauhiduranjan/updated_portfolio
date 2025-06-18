'use client';

import { motion } from 'framer-motion';

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string[];
  technologies: string[];
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function Experience({ experiences }: ExperienceProps) {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative pl-8 border-l-2 border-primary/30"
        >
          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
          <div className="mb-2">
            <h3 className="font-satoshi text-xl font-black">{exp.title}</h3>
            <p className="text-primary">{exp.company}</p>
            <p className="text-sm text-gray-400">{exp.period}</p>
          </div>
          <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
            {exp.description.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {exp.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-dark rounded-full text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
} 