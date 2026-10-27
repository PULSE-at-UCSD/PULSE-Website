import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import BoardMemberFrame from "../Components/BoardMemberFrame";
import * as memberAssets from "../Assets/Board-page/members";


export default function Boardpage() {
    //logoCorner: "left" or "right" - which top corner of the photo the logo sits in
    const members = [
        {name:"Luke Mercado", position:"Co-President", year:"4th Year", major:"Electrical Engineering", ...memberAssets.luke, logoCorner:"right"},
        {name:"Stephen Andrae Ulla", position:"Co-President", year:"4th Year", major:"Math Computer Science", ...memberAssets.stephen, logoCorner:"left"},
        {name:"Jhynelle Dulay", position:"Internal Vice President", year:"4th Year", major:"Structural Engineering", ...memberAssets.jhynelle, logoCorner:"left"},
        {name:"Antonio Dimafelix", position:"External Vice President", year:"3rd Year", major:"Bioengineering", ...memberAssets.anton, logoCorner:"left"},
        {name:"Marc Jaden Ramos", position:"Graduate Liaison", year:"Masters", major:"Mechanical/Aerospace Engineering", ...memberAssets.marc, logoCorner:"right"},
        {name:"Keira Umali", position:"Academic Director", year:"3rd Year", major:"Math-CS", ...memberAssets.keira, logoCorner:"right"},
        {name:"Justine Latorre", position:"Engineering Project Director", year:"2nd Year", major:"Chemical Engineering", ...memberAssets.justine, logoCorner:"left"},
        {name:"Jaron Perez", position:"Interdisciplinary CS Project Director", year:"2nd Year", major:"Computer Science", ...memberAssets.jaron, logoCorner:"right"},
        {name:"Jasmine Ebalo", position:"Marketing & Communications Director", year:"3rd Year", major:"Structural Engineering", ...memberAssets.jasmine, logoCorner:"left"},
        {name:"Jaren Jimenez", position:"Professional Development Director", year:"4th Year", major:"Electrical Engineering", ...memberAssets.jaren, logoCorner:"left"},
        {name:"Kadyn Yap", position:"Treasurer", year:"1st Year", major:"Structural Engineering", ...memberAssets.kadyn, logoCorner:"right"},
        {name:"Caylie Lansang", position:"Secretary", year:"2nd Year", major:"Electrical Engineering", ...memberAssets.caylie, logoCorner:"right"},
    ]

    return(
        <div className="flex flex-col min-h-screen">
            <NavBar/>
            <h1 className="mt-10 mx-10 mb-1 p-5 pb-0 text-left lg:text-center text-pulseBlue font-bold text-4xl">Meet the Team</h1>
            <div  className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-x-8 gap-y-30 px-6 pb-5 my-10">
                {members.map((member, index) => {
                    return <BoardMemberFrame key={index} member={member}></BoardMemberFrame>
                })}
            </div>
            <Footer/>
        </div>
    );
}
