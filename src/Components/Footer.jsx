

export default function Footer(){
    return(
        <footer className="bg-pulseBlue mt-auto h-30 flex">
            <h2 className="text-3xl font-bold underline text-pulseWhite p-3">Contacts</h2>
            <ul className="flex items-center ml-10 w-100 justify-between [&>*]:w-20 ">
                <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1"><img src="src/Assets/contact-icons/emailIcon.png"></img></a></li>
                <li><a href="https://www.instagram.com/pulseatucsandiego/?hl=en"><img src="src/Assets/contact-icons/instaLogo.png"></img></a></li>
                <li><a href="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1X-grVqyBzS8jvAPAZIlnQ3S2GMz1uh4fKuin62PPpw&s=10"><img src="src/Assets/contact-icons/linkedInLogo.png"></img></a></li>
            </ul>
        </footer>
    );
}