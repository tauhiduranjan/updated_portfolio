"use client";

import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaMusic, FaVolumeUp } from 'react-icons/fa';

const tracks = [
  {
    title: '170 bpm c min',
    file: '/170 bpm c min.wav',
  },
  {
    title: '95 bpm practice',
    file: '/95 bpm practice.wav',
  },
  {
    title: 'b maj 152',
    file: '/b maj 152.wav',
  },
];

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTrackChange = (idx: number) => {
    setCurrentTrack(idx);
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-dark-gray border-t border-dark flex flex-col sm:flex-row items-center px-4 py-2 z-50 shadow-2xl">
      <div className="flex items-center mr-4 mb-2 sm:mb-0">
        <FaMusic className="text-primary text-2xl mr-3" />
        <button
          onClick={togglePlay}
          className="bg-primary text-white rounded-full p-2 hover:bg-accent transition-colors"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <span className="text-white font-medium ml-2">{tracks[currentTrack].title}</span>
      </div>
      <div className="flex flex-1 flex-col sm:flex-row items-center gap-2 w-full max-w-lg">
        {/* Progress Bar */}
        <span className="text-xs text-gray-400 w-10 text-right">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full mx-2 accent-primary h-1"
        />
        <span className="text-xs text-gray-400 w-10">{formatTime(duration)}</span>
      </div>
      {/* Volume */}
      <div className="flex items-center ml-4">
        <FaVolumeUp className="text-gray-300 mr-2" />
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="accent-primary h-1"
        />
      </div>
      {/* Track Switcher */}
      <div className="flex gap-2 ml-4">
        {tracks.map((track, idx) => (
          <button
            key={track.file}
            onClick={() => handleTrackChange(idx)}
            className={`px-2 py-1 rounded text-xs font-bold ${currentTrack === idx ? 'bg-primary text-white' : 'bg-dark text-gray-300 hover:bg-primary/20'}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentTrack].file}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        preload="none"
      />
    </div>
  );
} 