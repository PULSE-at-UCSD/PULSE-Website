import ImgScroller from "../Components/ImgScroller";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function Homepage() {
    return(
        <div>

            <NavBar/>

            <div className=" bg-white mt-10 mx-10 mb-40 p-5 rounded-xl shadow-2xl flex items-center justify-evenly">
                <div className="max-w-250 flex-1">
                    <ImgScroller imgs={["omopchd0.jpg", "omopchd1.jpg", "omopchd2.jpg", "omopchd3.jpg", "omopchd4.jpg"]}/>
                </div>

                <div className="flex flex-col items-center justify-center p-20 max-w-6xl text-2xl text-center flex-1">
                    <img src="src/Assets/pulse-logos/pulseHomePageIcon.png"></img>
                    <p> 
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
                </div>
            </div>

            <Footer/>
        </div>
    );
}