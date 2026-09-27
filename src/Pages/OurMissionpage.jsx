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
    { src: engagement, alt: "Engagement" },
    { src: learning, alt: "Learning" },
    { src: professionalism, alt: "Professionalism" },
    { src: serviceEmpower, alt: "Service & Empowerment" },
    { src: unity, alt: "Unity" },
]

const STEP_DEG = 360 / PILLARS.length;  // 72
const SWEEP_DEG = 45;                   // how far along the arc a description travels
const DURATION_MS = 700;                // gear, exit and entry all share this

export default function OurMissionpage() {
    const [step, setStep] = useState(0);
    const [prevStep, setPrevStep] = useState(null);

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
            <div  className="flex-1">
                <div className="text-left lg:text-center bg-white mt-10 mx-10 mb-5 p-5 rounded-xl shadow-sm">
                    <h1 className="text-pulseBlue font-bold text-4xl pb-5">Our Mission</h1>
                    <p className="text-xl">Pilipino Undergraduate Leaders of Science and Engineering (PULSE) at UC San Diego cultivates a community where students in science and engineering develop as technical practitioners while celebrating Pilipino identity and culture. We teach foundational skills through workshops and lab sessions, build genuine connection so no member navigates a demanding path alone, and channel those skills into projects that serve our members, our campus, and the wider Pilipino community. PULSE is open to all UCSD students, in any technical discipline. We measure our success by whether members feel at home here, thrive in their fields, and graduate with the skills, confidence, and relationships to go further than they imagined.</p>
                </div>


                <div className="flex flex-col items-center justify-center">
                    <div className="overflow-hidden h-50 w-100 md:h-75 md:w-150 lg:h-100 lg:w-200 relative">
                        <img ref={gearRef}
                        src={gearLogo}
                        alt="PULSE Pillars"
                        onClick={rotateGear}
                        style={{transform: `rotate(${rotation}deg)`}}
                        className="h-100 w-100 md:h-150 md:w-150 lg:h-200 lg:w-200 absolute bottom-0 object-cover
                                    transition-transform duration-800
                                    ease-in-out cursor-pointer
                                    "></img>
                        <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-pulseWhite to-transparent pointer-events-none"></div>
                    </div>

                    {/* Outer box clips the arc's horizontal travel; inner box is sized
                        exactly to the image so the measured origin matches it. */}
                    <div className="w-full overflow-hidden flex justify-center mb-10">
                        <div ref={descRef}
                            className="relative w-130 h-90 md:w-200 md:h-150 lg:w-250 lg:h-200"
                            style={{"--sweep": `${SWEEP_DEG}deg`}}>
                            {prevStep !== null && (
                                <img key={`out-${prevStep}`}
                                    src={PILLARS[idx(prevStep)].src}
                                    alt=""
                                    aria-hidden="true"
                                    onAnimationEnd={() => setPrevStep(null)}
                                    style={arcStyle}
                                    className="absolute inset-0 w-full h-full object-cover animate-arc-out"></img>
                            )}
                            <img key={`in-${step}`}
                                src={PILLARS[idx(step)].src}
                                alt={PILLARS[idx(step)].alt}
                                style={arcStyle}
                                className="absolute inset-0 w-full h-full object-cover animate-arc-in"></img>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </div>
    );
}
