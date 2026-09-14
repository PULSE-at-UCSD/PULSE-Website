import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import { useState } from 'react'

export default function OurMissionpage() {
    const [rotation, setRotation] = useState(0);
    const [pillarIndex, setPillarIndex] = useState(0);
    const pillars = [
        "src/Assets/pillars-desc/Engagement.svg",
        "src/Assets/pillars-desc/Learning.svg",
        "src/Assets/pillars-desc/Professionalism.svg",
        "src/Assets/pillars-desc/S & E.svg",
        "src/Assets/pillars-desc/Unity.svg",
    ]


    function rotateGear() {
        setPillarIndex((pi) => (pi + 1) % pillars.length);
        setRotation((r) => (r + 72) % 7200);
    }


    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                <div className="text-pulseBlue font-bold p-15 text-center">
                    <h1 className="text-4xl pb-5">Our Mission</h1>
                    <p className="text-xl">Pilipino Undergraduate Leaders of Science and Engineering (PULSE) at UC San Diego cultivates a community where students in science and engineering develop as technical practitioners while celebrating Pilipino identity and culture. We teach foundational skills through workshops and lab sessions, build genuine connection so no member navigates a demanding path alone, and channel those skills into projects that serve our members, our campus, and the wider Pilipino community. PULSE is open to all UCSD students, in any technical discipline. We measure our success by whether members feel at home here, thrive in their fields, and graduate with the skills, confidence, and relationships to go further than they imagined.</p>
                </div>


                <div className="flex flex-col items-center justify-center">
                    <div className="overflow-hidden h-100 w-200 relative">
                        <img src="src/Assets/pulse-logos/pulseBigStarLogo.png" 
                        alt="PULSE Pillars" 
                        onClick={rotateGear} 
                        style={{transform: `rotate(${rotation}deg)`}} 
                        className="h-200 w-200 bottom-0 absolute object-cover
                                    transition-transform duration:700 
                                    ease-in-out cursor-pointer
                                    "></img>
                        <div class="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-pulseWhite to-transparent pointer-events-none"></div>
                    </div>
                    <img key={pillars[pillarIndex]} className="w-250 h-200 object-cover animate-flash-fade duration-500" src={pillars[pillarIndex]}></img>
                    {/*<p className={`p-10 m-30 text-xl transition-opacity duration-300 ease-in-out ${textShown ? 'opacity-100' : 'opacity-0'}`}>{pillars[pillarIndex]}</p>*/}
                </div>
                    
            </div>
            <Footer/>
        </div>
    );
}