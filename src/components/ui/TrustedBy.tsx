import React from 'react';
import Image from 'next/image';

export default function TrustedBy() {
  const platforms = [
    { name: 'Preply', logo: '/Preply.png' },
    { name: 'iTalki', logo: '/Italki.png' },
    { name: 'Cambly', logo: '/Cambly.png' },
    { name: 'Verbling', logo: '/Verbling.png' },
  ];

  return (
    <div className="relative w-full bg-white/10 backdrop-blur-sm border-t border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <p className="text-center text-white/60 text-sm font-satoshi-medium mb-4 sm:mb-6">
          TRUSTED BY TUTORS ON
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-12 md:gap-16">
          {platforms.map((platform) => (
            <div 
              key={platform.name}
              className="flex items-center opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src={platform.logo}
                alt={platform.name}
                width={140}
                height={70}
                className="w-[120px] sm:w-[160px] md:w-[200px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}