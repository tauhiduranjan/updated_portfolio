'use client';

import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

interface ResumeButtonProps {
  className?: string;
}

export default function ResumeButton({ className = '' }: ResumeButtonProps) {
  return (
    <motion.a
      href="/tauhidur_anjan_resume.pdf"
      download
      className={`inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-satoshi font-bold hover:bg-primary/90 transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FaDownload />
      <span>Download Resume</span>
    </motion.a>
  );
} 