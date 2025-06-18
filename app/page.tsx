import React from 'react';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaSoundcloud } from 'react-icons/fa';
import ProjectCard from './components/ProjectCard';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Music from './components/Music';
import NavLink from './components/NavLink';
import ResumeButton from './components/ResumeButton';

const projects = [
  {
    title: "BuffaLiving",
    description: "A student-focused housing marketplace allowing users to list, search, and filter properties efficiently, used by over 100 students. Features include interactive map-based property view, advanced search filters, real-time chat, and discussion forums.",
    technologies: ["React", "PHP", "MySQL", "JavaScript", "HTML", "CSS"],
    githubLink: "https://github.com/cse442-at-ub/fa24-semesterproject-noproblems-1",
    liveLink: "https://github.com/cse442-at-ub/fa24-semesterproject-noproblems-1",
    image: "/images/project1.jpg"
  },
  {
    title: "Twitter Clone",
    description: "A real-time social media web app with tweet posting, liking, retweeting, and commenting features. Includes user profile creation with support for profile pictures, bios, and customizable settings.",
    technologies: ["JavaScript", "React", "Firebase", "Node.js"],
    githubLink: "https://github.com/tauhiduranjan/Twitter-Clone-Headstarter",
    liveLink: "https://github.com/tauhiduranjan/Twitter-Clone-Headstarter",
    image: "/twitter-icon-free-png.png"
  },
  {
    title: "Punchline",
    description: "A Letterboxd-style social platform for gamers, allowing users to log, rate, and review video games. Designed with HCI and psychology principles to maximize usability and engagement.",
    technologies: ["Figma", "React", "HTML"],
    githubLink: "https://github.com/CSE370HCI/punchline",
    liveLink: "https://github.com/CSE370HCI/punchline",
    image: "/images/Screenshot 2025-06-16 223949.png"
  }
];

const experiences = [
  {
    title: "Global Technology Intern",
    company: "AXA XL",
    period: "June 2024 - August 2024",
    description: [
      "Developed ETL pipelines in PySpark and Databricks to migrate data from on-premises to Azure cloud",
      "Collaborated with team members to ensure data accuracy and utilized Power BI and Excel to identify 40% of missing premiums, creating data visualizations that provided actionable insights for stakeholders",
      "Analyzed and optimized key datasets to identify expansion opportunities in the US sector, supporting strategic decision-making and business growth initiatives"
    ],
    technologies: ["Python", "PySpark", "Databricks", "Azure", "Power BI", "Excel", "Matplotlib", "Pandas", "SQL"]
  },
  {
    title: "Software Engineering Fellow",
    company: "Headstarter",
    period: "June 2023 - July 2023",
    description: [
      "Developed multiple full-stack web applications using technologies such as React JS, Node JS, and Flask, collaborating in teams of 3 to build solutions like a resume parser with keyword matching, a multi-API dashboard for weather and news data, and a Twitter-like platform with machine-learning-based recommendations",
      "Leveraged cloud services and machine learning by utilizing Google Firebase for data storage, OpenAI for data summarization, and HuggingFace NLP models for a recommendation system, enhancing user experience and optimizing application functionalities",
      "Gained expertise in Software Engineering and Data Structures while refining communication skills to effectively convey technical concepts, ensuring smooth collaboration and successful project delivery"
    ],
    technologies: ["React", "Node.js", "Flask", "Firebase", "OpenAI", "HuggingFace"]
  }
];

const skillCategories = [
  {
    name: "Programming Languages",
    skills: ["Python", "Java", "C/C++", "SQL", "PHP", "JavaScript", "HTML/CSS"]
  },
  {
    name: "Frameworks & Libraries",
    skills: ["React", "Node.js", "Flask", "Django", "JUnit", "PySpark", "pandas", "NumPy", "Matplotlib", "Plotly"]
  },
  {
    name: "Developer Tools",
    skills: ["Git", "VS Code", "Visual Studio", "PyCharm", "IntelliJ", "Eclipse", "Unreal Engine", "Jupyter Notebook", "Azure Databricks"]
  }
];

const tracks = [
  {
    title: "Your Track Title",
    description: "Describe your track here. What genre is it? What inspired it?",
    soundcloudUrl: "https://soundcloud.com/yourusername/track",
    image: "/images/track1.jpg"
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-sm z-50 border-b border-dark-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="font-satoshi text-xl font-black text-white">Tauhidur Anjan</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-baseline space-x-8">
                <NavLink href="#about">About</NavLink>
                <NavLink href="#projects">Projects</NavLink>
                <NavLink href="#experience">Experience</NavLink>
                <NavLink href="#skills">Skills</NavLink>
              </div>
              <ResumeButton className="ml-4" />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="font-satoshi text-5xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Computer Science</span>
              <br />
              <span className="text-white">Student & Developer</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Computer Science student at University at Buffalo, passionate about full-stack development, data engineering, and music production.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex space-x-6">
                <a href="https://github.com/tauhiduranjan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                  <FaGithub size={24} />
                </a>
                <a href="https://linkedin.com/in/tauhidur-anjan" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                  <FaLinkedin size={24} />
                </a>
              </div>
              <ResumeButton />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Experience</h2>
          <Experience experiences={experiences} />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Skills</h2>
          <Skills categories={skillCategories} />
        </div>
      </section>

      {/* Music Section */}
      <section id="music" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="section-title text-center">Music</h2>
          <Music />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-dark-gray border-t border-dark-gray">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 font-inter text-sm">
            © {new Date().getFullYear()} Tauhidur Anjan. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
} 