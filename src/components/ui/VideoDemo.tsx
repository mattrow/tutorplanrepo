import { useEffect, useState, useRef } from 'react';

export default function VideoDemo() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // Stop observing after it comes into view
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-12 sm:py-24 bg-white" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Black glow effect */}
            <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-xl"></div>
            
            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Aspect ratio box */}
              <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
                {isInView ? (
                  <iframe
                    src="https://player.vimeo.com/video/1025936639?h=79dc34e71d&title=0&byline=0&portrait=0&autoplay=0&muted=0"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
