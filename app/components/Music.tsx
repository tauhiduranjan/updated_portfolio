'use client';

import React from 'react';

export default function Music() {
  return (
    <div className="w-full flex justify-center">
      <iframe
        width="100%"
        height="450"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tauhidz&color=%233B82F6&auto_play=false&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        className="rounded-lg shadow-lg max-w-3xl"
        style={{ background: '#181E2A' }}
      ></iframe>
    </div>
  );
} 