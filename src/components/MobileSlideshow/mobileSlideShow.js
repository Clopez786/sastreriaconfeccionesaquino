import { useEffect, useState } from "react";
import Scissors from "../../assets/images/scissors.png";
import Thread from "../../assets/images/thread_spool.png";
import Shirt from "../../assets/images/shirt.png";
import "./mobileSlideShow.scss";

const MobileSlideShow = (lang = 'en') => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const L = lang === 'es'
        ? {
            tailoring: 'Sastrería a Medida',
            alterations: 'Arreglos y Reparaciones',
            ready: 'Listo para Usar',
            altScissors: 'Tijeras de sastre',
            altThread: 'Carrete de hilo',
            altShirt: 'Camisa',
        }
        : {
            tailoring: 'Custom Tailoring',
            alterations: 'Alterations & Repairs',
            ready: 'Ready to Wear',
            altScissors: 'Tailor scissors',
            altThread: 'Thread spool',
            altShirt: 'Shirt',
        };

    const slides = [
        <div>
            <img className="mobile__image" src={Scissors} alt={L.altScissors} />
            <h2 className="mobile__txt">{L.tailoring}</h2>
        </div>,
        <div>
            <img className="mobile__image" src={Thread} alt={L.altThread} />
            <h2 className="mobile__txt">{L.alterations}</h2>
        </div>,
        <div>
            <img className="mobile__image" src={Shirt} alt="" />
            <h2 className="mobile__txt">Ready to Wear</h2>
        </div>
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);

    });
    return (
        <div className="mobile-slideshow">
            {slides.map((content, index) => (
                <div key={index}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}
                >
                    {content}
                </div>
            ))}
        </div>
    );
}

export default MobileSlideShow;