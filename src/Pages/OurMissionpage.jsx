import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import { useState } from 'react'

export default function OurMissionpage() {
    const [rotation, setRotation] = useState(0);
    const [pillarIndex, setPillarIndex] = useState(0);
    const [textShown , setTextShown] = useState(true);
    const pillars = [
        "This is pillar one woohoo",
        "This is pillar two oh yeaaa",
        "This is pillar three lets gooo",
        "This is pillar four ok im tired of this",
        "Pillar 5",
        "Pillar 6",
        "Pillar 7",
        "Pillar 8"
    ]


    function rotateGear() {
        setTextShown(() => false);
        setTextShown(() => true);
        setPillarIndex(((rotation / 45) % 8));
        setRotation((r) => (r + 45) % 7200);
    }


    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                <div className="text-pulseBlue font-bold p-15 text-center">
                    <h1 className="text-4xl pb-5">Our Mission</h1>
                    <p className="text-xl">Pilipino Undergraduate Leaders of Science and Engineering (PULSE) at UC San Diego cultivates a community where students in science and engineering develop as technical practitioners while celebrating Pilipino identity and culture. We teach foundational skills through workshops and lab sessions, build genuine connection so no member navigates a demanding path alone, and channel those skills into projects that serve our members, our campus, and the wider Pilipino community. PULSE is open to all UCSD students, in any technical discipline. We measure our success by whether members feel at home here, thrive in their fields, and graduate with the skills, confidence, and relationships to go further than they imagined.</p>
                </div>

                <div className="flex items-center">
                    <div className="relative max-w-400 max-h-400">
                        <img src="src/Assets/pulse-logos/pulseBigStarLogo.png" 
                            alt="PULSE Pillars" 
                            onClick={rotateGear} 
                            style={{transform: `rotate(${rotation}deg)`}} 
                            className="h-full w-full -ml-65 my-20
                                        transition-transform duration:700 
                                        ease-in-out cursor-pointer
                                        "></img>
                    </div>
                    <p className={`transition-opacity duration-300 ease-in-out ${textShown ? 'opacity-100' : 'opacity-0'}`}>{pillars[pillarIndex]}</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}