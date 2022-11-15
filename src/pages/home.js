import { useNavigate } from "react-router-dom";
import NavBar from "../components/header";

let features = [
    {
        imageUrl: "/assets/images/greenland.jpg",
        title: "Experience Nature",
        desc: `Get as close you can get, Face-to-face to nature in it's purest form, let the chipping birds and the cool breeze keep you company`,
    },
    {
        imageUrl: "/assets/images/igloo.jpg",
        title: "Experience Ancient Landmarks",
        desc: `Visit the Igloos of the temperates, the rain-forests of the tropics, the deserts of the tundra, the highs of Kilimangaro and the piramides of Egypt`,
    },
    {
        imageUrl: "/assets/images/meditate.jpg",
        title: "Feel the tranquil",
        desc: `Escape the complicating, stressful and tiring day-to-day life, to experience natural peace of mind`,
    },
    {
        imageUrl: "/assets/images/offshore.jpg",
        title: "The Creeks",
        desc: `Live the Aqua-man life in well-built over water houses and experience the wonders of aqualife!`,
    },
    {
        imageUrl: "/assets/images/picnic.jpg",
        title: "Family Time",
        desc: `Get the opportunity to spend quality and worth-while time with loved ones!`,
    },
];

function Feature({ imageUrl, title, desc }) {
    return <div className="bg-white flex flex-col sm:flex-col lg:flex-row rounded-r-md shadow-lg ">
        <div className="w-2/5 p-3">
            <p className="text-xl font-bold">{title}</p>
            <p>{desc}</p>
        </div>
        <img
            src={imageUrl}
            alt={title}
            className={`
            sm:w-full sm:h-40
            lg:w-3/5 lg:h-full
            h-100 object-cover rounded-r-md
             order-first lg:order-last`} />
    </div>
}

export default function Home() {
    const navigate = useNavigate()
    const gotoLogin = () => navigate('/login')
    return <main>
        <div className="min-h-screen bg-slate-100">
            <NavBar showLoginButton={true} />
            <header style={{ backgroundImage: "url(/assets/images/header.jpg)" }}
                className="h-3/5 p-5 bg-no-repeat bg-cover flex items-center justify-center">

                <div className="bg-black bg-opacity-50 rounde flex flex-col items-center justify-between p-12">
                    <h1 className="text-white text-5xl text-center mb-4">Experience Seamless automated Tourism</h1>
                    <button
                        onClick={gotoLogin}
                        className="text-white bg-transparent border-solid border-2 border-white border- p-3 text-4xl font-light rounded-md"
                    >Get Started</button>
                </div>

            </header>

            <section>
                <p className="bg-black text-white p-5 text-xl">Features</p>
                <div className="m-4">
                    <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                        {features.map(({ imageUrl, title, desc }, index) => <Feature imageUrl={imageUrl} title={title} desc={desc} key={index} />)}
                    </div>
                </div>
            </section>
        </div>
    </main>
}