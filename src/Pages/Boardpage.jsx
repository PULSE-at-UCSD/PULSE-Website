import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import BoardMemberFrame from "../Components/BoardMemberFrame";


export default function Boardpage() {
    const members = [
        {name:"Stephen Andrae Ulla", position:"Co-President", year:"4th Year", major:"Math Computer Science", imgLink:"src/Assets/board-members/Stephen.svg"},
        {name:"Luke Mercado", position:"Co-President", year:"4th Year", major:"Electrical Engineering", imgLink:"src/Assets/board-members/Luke.svg"},
        {name:"Jhynelle Dulay", position:"Board Member", year:"dunno", major:"dunno", imgLink:"src/Assets/board-members/Jhynelle.svg"},
        {name:"Marc Jaden Ramos", position:"Board Member", year:"Masters", major:"Mechanical Engineer?", imgLink:"src/Assets/board-members/Marc.svg"},
        {name:"Anton", position:"Board Member", year:"dunno", major:"dunno", imgLink:"src/Assets/board-members/Anton.svg"},
        {name:"Keira", position:"Board Member", year:"dunno", major:"dunno", imgLink:"src/Assets/board-members/Keira.svg"},
        {name:"Justin Latorne", position:"Board Member", year:"dunno", major:"Chemical Engineering", imgLink:"src/Assets/board-members/Justin.svg"}
    ]

    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <div  className="flex-1 grid grid-cols-3 gap-4 mb-10">
                {members.map((member, index) => {
                    return <BoardMemberFrame key={index} member={member}></BoardMemberFrame>
                })}
            </div>
            <Footer/>
        </div>
    );
}