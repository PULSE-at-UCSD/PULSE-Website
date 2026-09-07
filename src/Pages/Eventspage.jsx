import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

export default function Eventspage() {
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                Events Page!
            </div>
            <Footer/>
        </div>
    );
}