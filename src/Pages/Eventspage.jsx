import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import EventCalendar from "../Components/EventCalendar";

export default function Eventspage() {
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                <div className="p-7 md:p-10 pb-0 text-left md:text-center">
                    <h1 className="text-pulseBlue font-bold text-4xl mb-1">Events</h1>
                    <p className="pt-1 text-2xl"> 
                        Stay up to date on all our latest events and meetings!
                    </p>
                </div>
                <div className="max-w-6xl mx-auto px-4 md:px-10 pb-7 pt-2 md:pb-10 md:pt-0">
                    <EventCalendar/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}