// Slim full-width strip of images that glides left nonstop.
// The images are rendered twice and the track slides by -50%, so the loop is seamless.
// Each half must be wider than the screen, so short lists are repeated to fill it.
const MIN_PER_HALF = 12;

export default function ImgMarquee({imgs = []}) {
    const edgeFade = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";
    const half = Array(Math.ceil(MIN_PER_HALF / Math.max(imgs.length, 1))).fill(imgs).flat();
    return(
        <div className="w-full h-32 md:h-48 overflow-hidden motion-reduce:overflow-x-auto"
             style={{maskImage: edgeFade, WebkitMaskImage: edgeFade}}>
            <div className="flex w-max h-full animate-marquee">
                {[...half, ...half].map((img, i) => (
                    // Spacing is padding, not gap, so both halves are exactly the same width
                    <div key={i} className="h-full pr-4" aria-hidden={i >= imgs.length}>
                        <img src={img} alt={i < imgs.length ? "Pulse Gallery" : ""} className="h-full w-auto object-cover rounded-lg shadow-md"/>
                    </div>
                ))}
            </div>
        </div>
    );
}
