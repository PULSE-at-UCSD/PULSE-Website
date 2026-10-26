import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import { useState, useRef, useLayoutEffect, useEffect, useCallback} from 'react'
import gearLogo from "../Assets/pulse-logos/pulseBigStarLogo.png"
import engagement from "../Assets/pillars-desc/Engagement.svg"
import learning from "../Assets/pillars-desc/Learning.svg"
import professionalism from "../Assets/pillars-desc/Professionalism.svg"
import serviceEmpower from "../Assets/pillars-desc/SE.svg"
import unity from "../Assets/pillars-desc/Unity.svg"

const PILLARS = [
    { src: professionalism, alt: "Professionalism" },
    { src: unity, alt: "Unity" },
    { src: learning, alt: "Learning" },
    { src: serviceEmpower, alt: "Science and Engineering" },
    { src: engagement, alt: "Engagement" },
]

// Decorative gears that turn with the main gear. dir alternates so neighbours
// turn opposite ways, like meshed gears.
// Cut off by the page edges and corners.
const EDGE_GEARS = [
    { dir: -1, className: "-top-2 -left-16 size-32 md:-top-1 md:-left-32 md:size-64" },
    { dir: 1, className: "hidden md:block -top-2 -right-24 md:size-56" },
    { dir: 1, className: "hidden md:block top-[20%] -left-14 md:size-36" },
    { dir: 1, className: "top-[30%] -right-20 size-40 md:-right-36 md:size-72" },
    { dir: -1, className: "hidden md:block top-[45%] -right-12 md:size-28" },
    { dir: -1, className: "top-[58%] -left-20 size-40 md:-left-40 md:size-80" },
    { dir: -1, className: "hidden md:block top-[78%] -right-16 md:size-40" },
    { dir: 1, className: "hidden md:block top-[82%] -left-12 md:size-32" },
    { dir: -1, className: "hidden md:block -bottom-24 -left-24 md:size-56" },
    { dir: 1, className: "-bottom-16 -right-16 size-32 md:-bottom-32 md:-right-32 md:size-64" },
]
// Fully visible, just outside the description box (which is 1.25 × --gear wide).
const SIDE_GEARS = [
    { dir: -1, className: "hidden lg:block top-[8%] right-[calc(50%+var(--gear)*0.68)] size-32" },
    { dir: 1, className: "hidden xl:block top-[45%] right-[calc(50%+var(--gear)*0.68+3rem)] size-24" },
    { dir: -1, className: "hidden xl:block top-[25%] left-[calc(50%+var(--gear)*0.68)] size-40" },
    { dir: 1, className: "hidden lg:block top-[62%] left-[calc(50%+var(--gear)*0.68+2rem)] size-28" },
]

const STEP_DEG = 360 / PILLARS.length;  // 72
const SWEEP_DEG = 45;                   // how far along the arc a description travels
const DURATION_MS = 700;                // gear, exit and entry all share this

function BorderGear({ className, dir, rotation }) {
    return (
        <img src={gearLogo}
            alt=""
            aria-hidden="true"
            style={{transform: `rotate(${rotation * dir}deg)`}}
            className={`absolute opacity-35 pointer-events-none select-none
                        transition-transform duration-800 ease-in-out ${className}`}></img>
    );
}

export default function OurMissionpage() {
    const [step, setStep] = useState(0);
    const [prevStep, setPrevStep] = useState(null);
    // Hint label and wiggle show until the visitor clicks for themselves.
    const [hasInteracted, setHasInteracted] = useState(false);

    const gearRef = useRef(null);
    const descRef = useRef(null);
    const [origin, setOrigin] = useState({ x: 500, y: -400 });

    const rotation = step * STEP_DEG;
    const idx = (s) => ((s % PILLARS.length) + PILLARS.length) % PILLARS.length;

    // The descriptions arc about the gear's centre, so measure where that centre
    // actually is rather than deriving it from the layout's height classes.
    useLayoutEffect(() => {
        const measure = () => {
            const gear = gearRef.current;
            const desc = descRef.current;
            if (!gear || !desc) return;
            // The gear is square and spins about its own centre, so its bounding
            // box centre is its real centre even mid-rotation.
            const g = gear.getBoundingClientRect();
            const d = desc.getBoundingClientRect();
            setOrigin({
                x: g.left + g.width / 2 - d.left,
                y: g.top + g.height / 2 - d.top,
            });
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(document.body);
        return () => observer.disconnect();
    }, []);

    const rotateGear = useCallback(() => {
        setPrevStep(step);
        setStep((s) => s + 1);
    }, [step])

    const handleGearClick = () => {
        setHasInteracted(true);
        rotateGear();
    };

    // Always turn forward to reach the chosen pillar, so the gear never spins back.
    const goToPillar = (target) => {
        setHasInteracted(true);
        const delta = (target - idx(step) + PILLARS.length) % PILLARS.length;
        if (delta === 0) return;
        setPrevStep(step);
        setStep(step + delta);
    };

    // Warm the cache so a description is ready before it arcs in;
    // otherwise the browser briefly draws (and rotates) its alt text.
    useEffect(() => {
        PILLARS.forEach(({ src }) => {
            const img = new Image();
            img.src = src;
            img.decode?.().catch(() => {});
        });
    }, []);

    useEffect(() => {
        if (PILLARS.length === 0) {
            return;
        }
        const intervalID = setInterval(() => rotateGear(), 10000);
        return () => {
            clearInterval(intervalID);
        };
    }, [rotateGear])


    const arcStyle = {
        transformOrigin: `${origin.x}px ${origin.y}px`,
        animationDuration: `${DURATION_MS}ms`,
    };

    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1 relative isolate">
                <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    {EDGE_GEARS.map((g, i) => <BorderGear key={i} {...g} rotation={rotation}/>)}
                </div>
                <div className="text-left lg:text-center bg-white mt-10 mx-10 mb-5 p-5 rounded-xl shadow-sm">
                    <h1 className="text-pulseBlue font-bold text-4xl pb-5">Our Mission</h1>
                    <p className="text-xl">Pilipino Undergraduate Leaders of Science and Engineering (PULSE) at UC San Diego cultivates a community where students in science and engineering develop as technical practitioners while celebrating Pilipino identity and culture. We teach foundational skills through workshops and lab sessions, build genuine connection so no member navigates a demanding path alone, and channel those skills into projects that serve our members, our campus, and the wider Pilipino community. PULSE is open to all UCSD students, in any technical discipline. We measure our success by whether members feel at home here, thrive in their fields, and graduate with the skills, confidence, and relationships to go further than they imagined.</p>
                </div>


                {/* --gear is the gear's diameter: scales with screen width, capped by
                    screen height so the half-gear + description fit on short screens. */}
                <div className="relative isolate flex flex-col items-center justify-center [--gear:min(90vw,65svh,50rem)]">
                    <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
                        {SIDE_GEARS.map((g, i) => <BorderGear key={i} {...g} rotation={rotation}/>)}
                    </div>
                    {/* Fades with opacity only so its space stays and the layout doesn't jump. */}
                    <p aria-hidden="true"
                        className={`mb-3 rounded-full bg-white px-4 py-1 text-pulseBlue font-semibold shadow-sm
                                    transition-opacity duration-500 ${hasInteracted ? "opacity-0" : "opacity-100"}`}>
                        <span className="pointer-fine:hidden">Tap</span>
                        <span className="hidden pointer-fine:inline">Click</span> the gear to explore our pillars
                    </p>
                    {/* Top edge masked so the gear fades into the background pattern */}
                    <div className="overflow-hidden w-(--gear) h-[calc(var(--gear)/2)] relative mask-[linear-gradient(to_bottom,transparent,black_3rem)]">
                        <button ref={gearRef}
                        type="button"
                        aria-label="Show next pillar"
                        onClick={handleGearClick}
                        style={{transform: `rotate(${rotation}deg)`}}
                        className={`size-(--gear) absolute bottom-0 rounded-full cursor-pointer
                                    transition-[transform,scale,filter] duration-800 ease-in-out
                                    hover:scale-105 hover:drop-shadow-[0_0_20px_var(--color-pulseYellow)] active:scale-95
                                    focus-visible:outline-4 focus-visible:outline-pulseBlue
                                    ${hasInteracted ? "" : "animate-gear-nudge"}`}>
                            <img src={gearLogo} alt="" className="size-full"></img>
                        </button>                    </div>

                    <div className="flex gap-1 justify-center my-3">
                        {PILLARS.map((p, i) => {
                            const active = i === idx(step);
                            return (
                                <button key={p.alt}
                                    type="button"
                                    aria-label={p.alt}
                                    aria-current={active}
                                    onClick={() => goToPillar(i)}
                                    className="group size-7 flex items-center justify-center cursor-pointer rounded-full
                                                focus-visible:outline-2 focus-visible:outline-pulseBlue">
                                    <span className={`size-3 rounded-full transition-all duration-300
                                        ${active ? "bg-pulseBlue scale-125" : "bg-pulseBlue/30 group-hover:bg-pulseBlue/60"}`}></span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Outer box clips the arc's horizontal travel; inner box is sized
                        exactly to the image so the measured origin matches it. */}
                    <div className="w-full overflow-hidden flex justify-center mb-10">
                        <div ref={descRef}
                            className="relative w-[min(100%,calc(var(--gear)*1.25))] aspect-[1968/1418]"
                            style={{"--sweep": `${SWEEP_DEG}deg`}}>
                            {prevStep !== null && (
                                <img key={`out-${prevStep}`}
                                    src={PILLARS[idx(prevStep)].src}
                                    alt=""
                                    aria-hidden="true"
                                    onAnimationEnd={() => setPrevStep(null)}
                                    style={arcStyle}
                                    className="absolute inset-0 w-full h-full object-contain animate-arc-out"></img>
                            )}
                            <img key={`in-${step}`}
                                src={PILLARS[idx(step)].src}
                                alt={PILLARS[idx(step)].alt}
                                style={arcStyle}
                                // step only ever increases, so 0 means first render: show it in place.
                                className={`absolute inset-0 w-full h-full object-contain ${step === 0 ? "" : "animate-arc-in"}`}></img>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}
