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
              <video 
                className="w-full aspect-video object-cover"
                controls
                poster="/video-placeholder.jpg" // Optional: Add a placeholder image
              >
                <source src="https://storage.googleapis.com/web-dev-assets/video-and-source-tags/chrome.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
