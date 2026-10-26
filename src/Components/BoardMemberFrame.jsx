import polaroid from "../Assets/Board-page/polaroid.webp";

/*Percentages are measured from the polaroid frame (2050x2561): the photo window
  and the blank strip under it where the name is written.*/
export default function BoardMemberFrame({member}){
    const logoSide = member.logoCorner === "left" ? "left-[7%]" : "right-[7%]";

    return (
        <div className="flex flex-col items-center w-full max-w-sm">
            <div className="relative w-full aspect-[2050/2561]">
                <img className="absolute left-[4.1%] top-[11.25%] w-[90.6%] h-[69.2%] object-cover" src={member.photo} alt={member.name} loading="lazy"></img>
                <img className="absolute inset-0 w-full h-full" src={polaroid} alt=""></img>
                {member.logo && (
                    <img className={`absolute top-[13%] ${logoSide} w-[18%]`} src={member.logo} alt={`${member.name} logo`}></img>
                )}
                <p className="absolute bottom-0 h-[19.5%] w-full flex items-center justify-center px-4 font-cursive text-3xl text-pulseBlue truncate">{member.name}</p>
            </div>
            <ul className="mt-2 text-center">
                <li className="font-semibold text-pulseBlue">{member.position}</li>
                <li>{member.year}</li>
                <li>{member.major}</li>
            </ul>
        </div>
    );
}
