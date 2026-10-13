import { useState, useEffect } from "react";

export default function ImgScroller({imgs = []}){;
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (imgs.length === 0) {
            return;
        }
        imgs.forEach((img) => { new Image().src = img; });
        const intervalID = setInterval(() => {setIndex((i) => (i + 1) % imgs.length);}, 7000);
        return () => {
            clearInterval(intervalID);
        };
    }, [imgs.length])
    return(
        <div className={`shadow-lg block w-full aspect-4/3 overflow-hidden`}>
            <img key={imgs[index]} src={imgs[index]} alt="Pulse Gallery" className="object-cover w-full h-full animate-flash-fade duration-500 drop-shadow-2xl z-0"/>
        </div>
    );
}