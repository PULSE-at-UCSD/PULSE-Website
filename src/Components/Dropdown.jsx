import { Link } from 'react-router'
import { useState } from 'react'

export default function Dropdown({titleName = "", pages = [], links = []}){
    const [isOpen, setIsOpen] = useState(false);

    function toggleIsOpen() {
        setIsOpen((prev) => !prev);
    }

    return(
        <div className='group'>
            <span className='hover:text-gray-600 duration-200' onClick={toggleIsOpen}>{titleName}</span>
             <div className={`absolute left-0 top-full bg-white border-1 border-dotted rounded-md md:hidden md:group-hover:block ${isOpen ? 'block' : 'hidden'} duration-200`}>   
                {pages.map((page, index) => <div className='p-2 w-40 hover:bg-blue-100 duration-200'><Link to={links[index]}>{page}</Link></div>)}
            </div>
        </div>
    );
}