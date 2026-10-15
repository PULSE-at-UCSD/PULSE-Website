import emailIcon from "../Assets/contact-icons/emailIcon.png";
import instaLogo from "../Assets/contact-icons/instaLogo.png";
import linkedInLogo from "../Assets/contact-icons/linkedInLogo.png";
export default function Footer(){
    return(
        <footer className="bg-pulseBlue mt-auto h-30 flex">
            <h2 className="text-3xl font-bold underline text-pulseWhite p-3">Contacts</h2>
            <ul className="flex items-center ml-4 sm:ml-10 flex-1 min-w-0 max-w-100 justify-between pr-3 [&>*]:w-14 sm:[&>*]:w-20">
                <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"><img src={emailIcon}></img></a></li>
                <li><a href="https://www.instagram.com/pulseatucsandiego/?hl=en"><img src={instaLogo}></img></a></li>
                <li><a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1X-grVqyBzS8jvAPAZIlnQ3S2GMz1uh4fKuin62PPpw&s=10"><img src={linkedInLogo}></img></a></li>
            </ul>
        </footer>
    );
}