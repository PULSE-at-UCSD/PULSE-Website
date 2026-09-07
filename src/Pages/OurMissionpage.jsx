import Footer from "../Components/Footer"
import NavBar from "../Components/NavBar"
import { useState } from 'react'

export default function OurMissionpage() {
    const [rotation, setRotation] = useState(0);


    function rotateGear() {
        setRotation((prev) => (prev + 45) % 7200);
    }


    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                <div className="text-pulseBlue font-bold p-15 text-center">
                    <h1 className="text-4xl pb-5">Our Mission</h1>
                    <p className="text-xl">Pilipino Undergraduate Leaders of Science and Engineering (PULSE) at UC San Diego cultivates a community where students in science and engineering develop as technical practitioners while celebrating Pilipino identity and culture. We teach foundational skills through workshops and lab sessions, build genuine connection so no member navigates a demanding path alone, and channel those skills into projects that serve our members, our campus, and the wider Pilipino community. PULSE is open to all UCSD students, in any technical discipline. We measure our success by whether members feel at home here, thrive in their fields, and graduate with the skills, confidence, and relationships to go further than they imagined.</p>
                </div>

                <div className="relative min-h-200 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]">
                    <span className="">
                        <img src="src/Assets/pulse-logos/pulseBigStarLogo.png" 
                            alt="PULSE Pillars" 
                            onClick={rotateGear} 
                            style={{transform: `rotate(${rotation}deg)`}} 
                            className="absolute -left-150 -top-50 h-auto w-300 
                                        transition-transform duration:700 
                                        ease-in-out cursor-pointer
                                        "></img>
                    </span>
                </div>
            </div>
            <Footer/>
        </div>
    );
}