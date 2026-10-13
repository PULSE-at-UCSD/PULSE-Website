import ImgScroller from "../Components/ImgScroller";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import homePageIcon from "../Assets/pulse-logos/pulseHomePageIcon.png";
import omopchd0 from "../Assets/omoplaceholders/omopchd0.jpg";
import omopchd1 from "../Assets/omoplaceholders/omopchd1.jpg";
import omopchd2 from "../Assets/omoplaceholders/omopchd2.jpg";
import omopchd3 from "../Assets/omoplaceholders/omopchd3.jpg";
import omopchd4 from "../Assets/omoplaceholders/omopchd4.jpg";

export default function Homepage() {
    return(
        <div className="flex flex-col min-h-screen">

            <NavBar/>

            <div className=" bg-white mt-10 mx-10 mb-20 p-5 rounded-xl shadow-2xl flex flex-col-reverse lg:flex-row items-center justify-evenly">
                <div className="max-w-250 flex-1">
                    <ImgScroller imgs={[omopchd0, omopchd1, omopchd2, omopchd3, omopchd4]}/>
                </div>

                <div className="flex flex-col items-center justify-center lg:p-20 p-10 max-w-6xl text-2xl text-left lg:text-center flex-1">
                    <img src={homePageIcon}></img>
                    <p className="pt-5"> 
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