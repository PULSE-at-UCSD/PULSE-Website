import { Link } from 'react-router'
import { useState, useRef, useCallback } from 'react'
import useDismiss from './useDismiss'

export default function Dropdown({titleName = "", pages = [], links = []}){
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    // Only open on hover for devices that actually hover, so touch taps don't fight the click toggle
    const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

    function toggleIsOpen() {
        setIsOpen((prev) => !prev);
    }

    useDismiss(dropdownRef, isOpen, useCallback(() => setIsOpen(false), []));

    return(
        <div ref={dropdownRef}
            onMouseEnter={canHover ? () => setIsOpen(true) : undefined}
            onMouseLeave={canHover ? () => setIsOpen(false) : undefined}>
            <span className={`duration-200 ${isOpen ? 'text-pulseOrange' : 'hover:text-gray-600'}`} onClick={toggleIsOpen}>{titleName}</span>
            {/* before: element bridges the gap so hover isn't lost moving down to the menu */}
            <div className={`absolute left-1/2 -translate-x-1/2 top-full mt-3 py-2 rounded-xl bg-white/70 backdrop-blur-md border-1 border-pulseOrange/30 shadow-lg
                            before:absolute before:inset-x-0 before:-top-3 before:h-3 transition-all duration-200 ease-out
                            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                {pages.map((page, index) =>
                    <Link key={links[index]} to={links[index]} onClick={() => setIsOpen(false)}
                        className='block px-5 py-2 text-xl whitespace-nowrap hover:text-pulseOrange hover:translate-x-1 transition-all duration-200'>
                        {page}
                    </Link>
                )}
            </div>
        </div>
    );
}
