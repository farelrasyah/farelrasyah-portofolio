"use client";

import { useTranslations } from "next-intl";

const PortfolioVideo = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
          {t("video.title")}
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">
          {t("video.description")}
        </p>
      </div>
      
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800">
          <iframe
            src="https://www.youtube.com/embed/cRIxnq8m6Gg"
            title="Farel Rasyah Portfolio Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-neutral-300 dark:border-neutral-600 rounded-tl-lg"></div>
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-neutral-300 dark:border-neutral-600 rounded-tr-lg"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-neutral-300 dark:border-neutral-600 rounded-bl-lg"></div>
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-neutral-300 dark:border-neutral-600 rounded-br-lg"></div>
      </div>
      
      <div className="text-center">
        <a
          href="https://www.youtube.com/watch?v=cRIxnq8m6Gg"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors duration-200"
        >
          <svg 
            className="w-4 h-4" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          {t("video.watch_on_youtube")}
        </a>
      </div>
    </div>
  );
};

export default PortfolioVideo;
