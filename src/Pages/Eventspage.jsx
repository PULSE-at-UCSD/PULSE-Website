import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

export default function Eventspage() {
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                <div className="text-pulseBlue font-bold p-7 md:p-10 pb-0 text-left md:text-center">
                    <h1 className="text-4xl mb-1">Events</h1>
                    <p className="pt-1 text-2xl"> 
                        Stay up to date on all our latest events and meetings!
                    </p>
                </div>
                <iframe src="https://calendar.google.com/calendar/embed?src=f9fb16d7e982d679db9d01d066e36dc98d5c004ba7e1cb43a34cb38aad533b6f%40group.calendar.google.com&ctz=America%2FLos_Angeles" className="w-full h-150 p-4"></iframe>
            </div>
            <Footer/>
        </div>
    );
}