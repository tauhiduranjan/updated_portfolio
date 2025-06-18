'use client';

import React, { useState } from 'react';
import { FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaDatabase, FaMicrosoft } from 'react-icons/fa';
import { SiCplusplus, SiC, SiTypescript, SiDjango, SiFlask, SiPandas, SiNumpy, SiMysql, SiPhp, SiIntellijidea, SiEclipseide, SiUnrealengine, SiPlotly } from 'react-icons/si';

interface SkillCategory {
  name: string;
  skills: string[];
}

interface SkillsProps {
  categories: SkillCategory[];
}

const skillIconMap: Record<string, React.ReactNode> = {
  'Python': <FaPython className="text-yellow-400" />,
  'Java': <FaJava className="text-red-500" />,
  'C++': <SiCplusplus className="text-blue-400" />,
  'C/C++': <SiCplusplus className="text-blue-400" />,
  'C': <SiC className="text-blue-300" />,
  'JavaScript': <FaJs className="text-yellow-300" />,
  'TypeScript': <SiTypescript className="text-blue-500" />,
  'React': <FaReact className="text-cyan-400" />,
  'Node.js': <FaNodeJs className="text-green-500" />,
  'Flask': <SiFlask className="text-gray-200" />,
  'Django': <SiDjango className="text-green-700" />,
  'JUnit': <FaJava className="text-green-500" />,
  'PySpark': <FaPython className="text-yellow-400" />,
  'pandas': <SiPandas className="text-purple-400" />,
  'NumPy': <SiNumpy className="text-blue-300" />,
  'Matplotlib': <FaPython className="text-yellow-400" />,
  'Plotly': <SiPlotly className="text-pink-400" />,
  'SQL': <FaDatabase className="text-blue-400" />,
  'PHP': <SiPhp className="text-indigo-500" />,
  'HTML/CSS': <FaHtml5 className="text-orange-400" />,
  'HTML': <FaHtml5 className="text-orange-400" />,
  'CSS': <FaCss3Alt className="text-blue-400" />,
  'Git': <FaGitAlt className="text-orange-500" />,
  'VS Code': <FaMicrosoft className="text-blue-400" />,
  'Visual Studio': <FaMicrosoft className="text-purple-400" />,
  'PyCharm': <FaPython className="text-yellow-400" />,
  'IntelliJ': <SiIntellijidea className="text-blue-900" />,
  'IntelliJ IDEA': <SiIntellijidea className="text-blue-900" />,
  'Eclipse': <SiEclipseide className="text-purple-700" />,
  'Eclipse IDE': <SiEclipseide className="text-purple-700" />,
  'Unreal Engine': <SiUnrealengine className="text-gray-300" />,
  'Jupyter Notebook': <FaPython className="text-yellow-400" />,
  'Azure Databricks': <FaMicrosoft className="text-blue-400" />,
  'MySQL': <SiMysql className="text-blue-400" />,
};

export default function Skills({ categories }: SkillsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category, idx) => (
          <button
            key={category.name}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 rounded-md font-bold transition-colors text-sm ${activeTab === idx ? 'bg-primary text-white' : 'bg-dark-gray text-gray-300 hover:bg-primary/20'}`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {/* Skills Grid */}
      <div className="w-full max-w-4xl bg-dark-gray rounded-xl p-8 flex flex-wrap justify-center gap-4">
        {categories[activeTab].skills.map((skill, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-dark px-4 py-3 rounded-lg shadow-md min-w-[90px] hover:bg-primary/10 transition-colors"
          >
            <div className="text-3xl mb-2">
              {skillIconMap[skill] || <span className="text-gray-400">?</span>}
            </div>
            <span className="text-white text-sm font-medium text-center">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 