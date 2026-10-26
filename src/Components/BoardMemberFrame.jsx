import polaroid from "../Assets/Board-page/polaroid.webp";

/*Percentages are measured from the polaroid frame (2050x2561): the photo window
  and the blank strip under it where the name is written.*/
export default function BoardMemberFrame({member}){
    const logoSide = member.logoCorner === "left" ? "left-[0%]" : "right-[0%]";

    return (
        <div className="flex flex-col items-center w-full max-w-sm">
            {/* @container lets the name scale with the frame, so long names fit on narrow screens */}
            <div className="@container relative w-full aspect-[2050/2561]">
                <img className="absolute left-[4.1%] top-[11.25%] w-[90.6%] h-[69.2%] object-cover" src={member.photo} alt={member.name} loading="lazy"></img>
                <img className="absolute inset-0 w-full h-full" src={polaroid} alt=""></img>
                {member.logo && (
                    <img className={`absolute top-[5%] ${logoSide} w-[30%]`} src={member.logo} alt={`${member.name} logo`}></img>
                )}
                <p className="absolute bottom-0 h-[19.5%] w-full flex items-center justify-center px-4 font-cursive text-[min(3rem,12cqw)] text-pulseOrange truncate">{member.name}</p>
            </div>
            <ul className="mt-2 text-center">
                <li className="font-semibold text-pulseBlue text-2xl">{member.position}</li>
                <li className="text-lg">{member.year}</li>
                <li className="text-lg">{member.major}</li>
            </ul>
        </div>
    );
}
