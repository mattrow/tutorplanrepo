export default function VideoDemo() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Black glow effect */}
            <div className="absolute -inset-4 bg-black/20 rounded-3xl blur-xl"></div>
            
            {/* Video container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Aspect ratio box */}
              <div className="w-full relative" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src="https://player.vimeo.com/video/1025936639?h=79dc34e71d&title=0&byline=0&portrait=0&autoplay=0&muted=0"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
