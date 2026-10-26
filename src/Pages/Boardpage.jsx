import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import BoardMemberFrame from "../Components/BoardMemberFrame";
import * as memberAssets from "../Assets/Board-page/members";


export default function Boardpage() {
    //logoCorner: "left" or "right" - which top corner of the photo the logo sits in
    const members = [
        {name:"Stephen Andrae Ulla", position:"Co-President", year:"4th Year", major:"Math Computer Science", ...memberAssets.stephen, logoCorner:"left"},
        {name:"Luke Mercado", position:"Co-President", year:"4th Year", major:"Electrical Engineering", ...memberAssets.luke, logoCorner:"right"},
        {name:"Jhynelle Dulay", position:"Board Member", year:"TBD", major:"TBD", ...memberAssets.jhynelle, logoCorner:"left"},
        {name:"Marc Jaden Ramos", position:"Board Member", year:"Masters", major:"Mechanical Engineer?", ...memberAssets.marc, logoCorner:"right"},
        {name:"Anton", position:"Board Member", year:"TBD", major:"TBD", ...memberAssets.anton, logoCorner:"left"},
        {name:"Keira", position:"Board Member", year:"TBD", major:"TBD", ...memberAssets.keira, logoCorner:"right"},
        {name:"Justine Latorne", position:"Board Member", year:"TBD", major:"Chemical Engineering", ...memberAssets.justine, logoCorner:"left"},
        {name:"Caylie", position:"TBD", year:"TBD", major:"TBD", ...memberAssets.caylie, logoCorner:"right"},
        {name:"Jaren", position:"TBD", year:"TBD", major:"TBD", ...memberAssets.jaren, logoCorner:"left"},
        {name:"Jaron", position:"TBD", year:"TBD", major:"TBD", ...memberAssets.jaron, logoCorner:"right"},
        {name:"Jasmine", position:"TBD", year:"TBD", major:"TBD", ...memberAssets.jasmine, logoCorner:"left"},
        {name:"Kadyn", position:"TBD", year:"TBD", major:"TBD", ...memberAssets.kadyn, logoCorner:"right"}
    ]

    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <h1 className="mt-10 mx-10 mb-1 p-5 pb-0 text-left lg:text-center text-pulseBlue font-bold text-4xl">Meet the Team</h1>
            <div  className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-8 px-6 my-10">
                {members.map((member, index) => {
                    return <BoardMemberFrame key={index} member={member}></BoardMemberFrame>
                })}
            </div>
            <Footer/>
        </div>
    );
}
