import ImgMarquee from "../Components/ImgMarquee";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import UpcomingEvents from "../Components/UpcomingEvents";
import useLoaderDone from "../Components/useLoaderDone";
import homePageIcon from "../Assets/pulse-logos/pulseHomePageIcon.png";
import omopchd0 from "../Assets/omoplaceholders/omopchd0.jpg";
import omopchd1 from "../Assets/omoplaceholders/omopchd1.jpg";
import omopchd2 from "../Assets/omoplaceholders/omopchd2.jpg";
import omopchd3 from "../Assets/omoplaceholders/omopchd3.jpg";
import omopchd4 from "../Assets/omoplaceholders/omopchd4.jpg";

const GALLERY = [omopchd0, omopchd1, omopchd2, omopchd3, omopchd4];

// Half-sun rays behind the icon, matching its Philippine-sun layout: big rays
// straight up, on the diagonals and along the horizon, thin rays between.
// angle is degrees counter-clockwise from the right; length/width in SVG units.
const SUN_RAYS = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180].map((angle) => (
    angle % 45 === 0 ? { angle, length: 100, width: 10 } : { angle, length: 75, width: 4 }
));

// Pointed spike: base centred on the sun centre (0,0), tip at the given length
function rayPoints(angle, length, width) {
    const rad = angle * Math.PI / 180;
    const [dx, dy] = [Math.cos(rad), -Math.sin(rad)];
    const [px, py] = [-dy * width, dx * width];
    return `${px},${py} ${dx * length},${dy * length} ${-px},${-py}`;
}

export default function Homepage() {
    const ready = useLoaderDone();
    return(
        <div className="flex flex-col min-h-screen">

            <NavBar/>

            {/* Hero - fills the screen below the navbar (8.5rem incl. margins), so the
                photo strip starts just below the fold. Icon width is capped by
                screen width, by screen height (icon is ~1.94:1, leaving room for the
                text), and at 72rem since the source PNG is only 800px wide, then
                shrunk to 80% of that */}
            <section className="relative flex flex-col items-center justify-center min-h-[calc(100svh-8.5rem)] px-6 pb-10 overflow-x-clip">
                <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[min(80vw,45rem)] rounded-full
                                            bg-[radial-gradient(circle,rgb(248_223_56/0.6)_0%,rgb(251_114_0/0.12)_40%,transparent_70%)]"/>
                <div className={`relative w-[calc(min(90vw,calc((100svh-20rem)*1.94),72rem)*0.8)] ${ready ? "animate-hero-in" : "opacity-0"}`}>
                    {/* Sun rays - bottom centre sits on the gear, the icon's sun centre */}
                    <svg aria-hidden viewBox="-100 -100 200 100"
                         className="absolute left-1/2 -translate-x-1/2 bottom-[11%] w-[180%] aspect-2/1 origin-bottom animate-ray-breathe">
                        <defs>
                            <radialGradient id="sun-ray-fill" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="100">
                                <stop offset="0%" stopColor="var(--color-pulseYellow)"/>
                                <stop offset="45%" stopColor="#FFE066" stopOpacity="0.5"/>
                                <stop offset="100%" stopColor="var(--color-pulseYellow)" stopOpacity="0"/>
                            </radialGradient>
                        </defs>
                        {SUN_RAYS.map(({angle, length, width}) => (
                            <polygon key={angle} points={rayPoints(angle, length, width)} fill="url(#sun-ray-fill)"/>
                        ))}
                    </svg>
                    <img src={homePageIcon} alt="PULSE – Pilipino Undergraduate Leaders in Science & Engineering"
                         className="relative w-full drop-shadow-[0_0_2rem_rgb(251_114_0/0.45)]"/>
                </div>
                <p className={`relative max-w-3xl pt-6 text-xl md:text-2xl text-pulseBlue text-center ${ready ? "animate-hero-in [animation-delay:0.3s]" : "opacity-0"}`}>
                    We're PULSE! Pilipino Undergraduate Leaders of Science                          
                    and Engineering at UC San Diego.We teach the technical                          
                    skills your classes assume you already have, build                          
                    projects that give back to our campus and community,                          
                    and celebrate Pilipino identity while we do it. Whether                          
                    you're a first-year still figuring out your major or a                          
                    senior deep in research, there's a seat for you here.                          
                    Every UCSD student in any technical discipline is                          
                    welcome.
                </p>
            </section>

            <ImgMarquee imgs={GALLERY}/>

            <section id="events" className="px-6 md:px-20 py-16">
                <h2 className="text-4xl text-pulseBlue font-bold mb-8 text-left md:text-center">Upcoming Events</h2>
                <UpcomingEvents/>
            </section>

            <Footer/>
        </div>
    );
}
