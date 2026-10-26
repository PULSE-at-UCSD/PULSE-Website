import { FaEnvelope, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import starLogo from "../Assets/pulse-logos/pulseBigStarLogo.png";

const instagramUrl = "https://www.instagram.com/pulseatucsandiego/";
const linkedInUrl = "https://www.linkedin.com/in/pulse-at-uc-san-diego-96031b424";
const email = "pulse.engineers.atucsd@gmail.com";

const socials = [
    { label: "LinkedIn", href: linkedInUrl, icon: <FaLinkedinIn className="size-6"/> },
    { label: "Instagram", href: instagramUrl, icon: <FaInstagram className="size-6"/> },
    { label: "Email", href: `mailto:${email}`, icon: <FaEnvelope className="size-6"/> },
];

export default function Footer(){
    return(
        <footer className="bg-pulseBlue mt-auto px-6 md:px-20 pt-10 pb-6 text-pulseWhite">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-6 text-center sm:text-left">
                <div>
                    <div className="flex items-center justify-center sm:justify-start gap-3">
                        <img src={starLogo} alt="" className="w-14"/>
                        <span className="text-3xl font-bold tracking-wide text-pulseOrange">PULSE</span>
                    </div>
                    <p className="mt-2 max-w-sm text-pulseOrange/80">Pilipino Undergraduate Leaders of Science and Engineering at UC San Diego</p>
                </div>
                <ul className="flex gap-4">
                    {socials.map(({ label, href, icon }) => (
                        <li key={label}>
                            <a href={href} aria-label={label} title={label}
                                {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                                className="flex items-center justify-center size-12 rounded-full bg-pulseWhite/10 hover:bg-pulseOrange hover:-translate-y-0.5 transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulseYellow">
                                {icon}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
}
