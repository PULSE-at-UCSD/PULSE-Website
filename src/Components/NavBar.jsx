import { Link } from 'react-router'
import myLogo from '../Assets/pulse-logos/orangePulse.png'

export default function NavBar() {
    return(
        <nav className="flex m bg-white rounded-3xl p-4 items-center sticky top-0 mx-6 my-4 z-100">
            <img src={myLogo} className='w-16'></img>
            <ul className="flex ml-auto gap-5 mr-10 text-2xl items-center">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/events">Events</Link></li>
                <button className="rounded-lg bg-pulseYellow px-5 py-1 text-pulseOrange bold">Join</button>
            </ul>

        </nav>
    );
}