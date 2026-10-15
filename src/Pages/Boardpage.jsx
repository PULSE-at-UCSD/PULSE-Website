import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import BoardMemberFrame from "../Components/BoardMemberFrame";
import stephenImg from "../Assets/board-members/Stephen.svg";
import lukeImg from "../Assets/board-members/Luke.svg";
import jhynelleImg from "../Assets/board-members/Jhynelle.svg";
import marcImg from "../Assets/board-members/Marc.svg";
import antonImg from "../Assets/board-members/Anton.svg";
import keiraImg from "../Assets/board-members/Keira.svg";
import justinImg from "../Assets/board-members/Justin.svg";


export default function Boardpage() {
    const members = [
        {name:"Stephen Andrae Ulla", position:"Co-President", year:"4th Year", major:"Math Computer Science", imgLink:stephenImg},
        {name:"Luke Mercado", position:"Co-President", year:"4th Year", major:"Electrical Engineering", imgLink:lukeImg},
        {name:"Jhynelle Dulay", position:"Board Member", year:"dunno", major:"dunno", imgLink:jhynelleImg},
        {name:"Marc Jaden Ramos", position:"Board Member", year:"Masters", major:"Mechanical Engineer?", imgLink:marcImg},
        {name:"Anton", position:"Board Member", year:"dunno", major:"dunno", imgLink:antonImg},
        {name:"Keira", position:"Board Member", year:"dunno", major:"dunno", imgLink:keiraImg},
        {name:"Justin Latorne", position:"Board Member", year:"dunno", major:"Chemical Engineering", imgLink:justinImg}
    ]

    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <h1 className="mt-10 mx-10 mb-1 p-5 pb-0 text-left lg:text-center text-pulseBlue font-bold text-4xl">Meet the Team</h1>
            <div  className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
                {members.map((member, index) => {
                    return <BoardMemberFrame key={index} member={member}></BoardMemberFrame>
                })}
            </div>
            <Footer/>
        </div>
    );
}