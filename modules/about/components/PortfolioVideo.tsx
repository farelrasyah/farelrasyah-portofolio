"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

const PortfolioVideo = () => {
  const t = useTranslations("AboutPage");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`space-y-6 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Clean Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Portfolio Video</span>
        </div>
        
        <h3 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200">
          {t("video.title")}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 max-w-md mx-auto">
          {t("video.description")}
        </p>
      </div>
      
      {/* Simplified Video Container */}
      <div className="relative w-full max-w-4xl mx-auto group">
        {/* Subtle glow on hover */}
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        {/* Main container */}
        <div className="relative bg-white dark:bg-neutral-900 rounded-xl p-1 shadow-lg border border-neutral-200 dark:border-neutral-700 transition-all duration-300 group-hover:shadow-xl">
          {/* Video wrapper */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800">
            {/* Clean border accent */}
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg p-[1px]">
                <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-[calc(0.5rem-1px)]"></div>
              </div>
            </div>
            
            {/* Video iframe */}
            <iframe
              src="https://www.youtube.com/embed/cRIxnq8m6Gg?modestbranding=1&rel=0&showinfo=0"
              title="Farel Rasyah Portfolio Video"
              className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          
          {/* Minimal corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-l-2 border-t-2 border-emerald-400 dark:border-emerald-500 rounded-tl-lg opacity-0 group-hover:opacity-60 transition-all duration-300"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-r-2 border-b-2 border-teal-400 dark:border-teal-500 rounded-br-lg opacity-0 group-hover:opacity-60 transition-all duration-300"></div>
        </div>
      </div>
      
      {/* Clean Action Button */}
      <div className="text-center">
        <a
          href="https://www.youtube.com/watch?v=cRIxnq8m6Gg"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          <svg 
            className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-200" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span>{t("video.watch_on_youtube")}</span>
          <svg 
            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v8a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-4M14 4v4M16 6l-3-3-3 3" />
          </svg>
        </a>
        
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          {t("video.subtitle")}
        </p>
      </div>
    </div>
  );
};

export default PortfolioVideo;
