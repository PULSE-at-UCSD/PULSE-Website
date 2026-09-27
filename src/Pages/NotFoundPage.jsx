import { Link } from "react-router";


export default function NotFoundPage() {
    return (
        <div>
            <h1 className=" m-4 text-6xl text-pulseBlue font-bold">Page Not Found</h1>
            <h2 className=" m-4 text-3xl text-black underline hover:text-blue-500 duration-200"><Link to="/">Return Home</Link></h2>
        </div>
    
    );
}