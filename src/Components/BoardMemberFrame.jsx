

export default function BoardMemberFrame({member}){


    return (
        <div className="flex flex-col items-center m-0">
            <img className="w-150 h-150" src={member.imgLink} alt={member.name}></img>
            <ul>
                <li>{member.position}</li>
                <li>{member.year}</li>
                <li>{member.major}</li>
            </ul>
        </div>
    );
}