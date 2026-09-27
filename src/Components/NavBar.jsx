import { Link } from 'react-router'
import myLogo from '../Assets/pulse-logos/orangePulse.png'
import Dropdown from './Dropdown';

export default function NavBar() {
    return(
        <nav className="flex m bg-white rounded-3xl p-4 items-center sticky top-0 mx-6 my-4 z-100">
            <Link to="/"><img src={myLogo} className='min-w-16 max-w-16'></img></Link>
            <ul className="flex ml-auto gap-5 mr-10 text-2xl items-center">
                <li><Link to="/"><span className='hover:text-gray-600 duration-200'>Home</span></Link></li>
                <li className='relative cursor-pointer group'> 
                    <Dropdown titleName='About' pages={["Our Mission", "Board"] } links={["/our-mission", "/board"]}/>
                </li>
                <li><Link to="/events"><span className='hover:text-gray-600 duration-100'>Events</span></Link></li>
                <button className="rounded-lg bg-pulseYellow px-5 py-1 text-pulseOrange bold cursor-pointer hover:bg-amber-200 hover:text-orange-400 transition-colors duration-200"
                        type="button" onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSccz3VRtcmbl_kfuhE94vAyzo4o__pEpltvJCwBevct4CW9uA/viewform")}>Join</button>
            </ul>
            
        </nav>
    );
}