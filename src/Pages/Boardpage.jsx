import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
export default function Boardpage() {
    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1">
                Board members!
                <img src="src/Assets/misc/boardLayoutPrototype.svg"></img>
            </div>
            <Footer/>
        </div>
    );
}