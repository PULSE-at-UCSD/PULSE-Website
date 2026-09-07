import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

export default function OurMissionpage() {
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                Our mission!
            </div>
            <Footer/>
        </div>
    );
}