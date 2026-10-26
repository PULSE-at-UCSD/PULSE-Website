import { Link } from "react-router";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div className="flex-1 mt-10 mx-10 mb-1 p-5 text-left lg:text-center">
                <h1 className="text-pulseBlue font-bold text-4xl mb-1">Page Not Found</h1>
                <p className="pt-1 text-2xl">
                    Sorry, we couldn't find the page you were looking for.
                </p>
                <Link to="/" className="inline-block mt-6 text-xl text-pulseOrange hover:translate-x-1 transition-all duration-200">
                    Return Home →
                </Link>
            </div>
            <Footer/>
        </div>
    );
}
