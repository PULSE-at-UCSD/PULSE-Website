import { useState, useEffect } from "react";

export default function ImgScroller({imgs = []}){;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (imgs.length === 0) {
            return;
        }
        const intervalID = setInterval(() => {setIndex((i) => (i + 1) % imgs.length);}, 7000);
        return () => {
            clearInterval(intervalID);
        };
    }, [imgs.length])
    return(
        <div className={`shadow-lg inline-block w-full h-full`}>
            <img key={imgs[index]} src={`src/Assets/omoplaceholders/${imgs[index]}`} alt="Pulse Gallery" className="object-cover w-full h-full animate-flash-fade duration-500 drop-shadow-2xl z-0"/>
        </div>
    );
}