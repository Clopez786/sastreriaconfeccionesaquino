import "../assets/styles/main.scss";
import Home from "./home.js";
import About from "./about.js";
import Gallery from "./Gallery.js";
import Services from "./services.js";
import NotFound from "./notFound.js";
import Contact from "./Contact.js";
import Logo from "../assets/images/favicon.png";
// import InstagramLogo from "../assets/images/01 Static Glyph/01 Gradient Glyph/Instagram_Glyph_Gradient.svg";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import MobileMenu from "../components/MobileMenu/MobileMenu.js";
import LanguageToggle from "../components/LanguageToggle/LanguageToggle.js";

const PageWrapper = () => {
    // NEW: language state (default English). Keep it simple at first.
    const [lang, setLang] = useState("en");

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showHeader, setShowHeader] = useState(true);
    const lastScrollY = useRef(window.scrollY);
    const scrollTimeout = useRef(null);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY.current) setShowHeader(false);
            if (currentScrollY < lastScrollY.current) setShowHeader(true);
            lastScrollY.current = currentScrollY;
            if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
            scrollTimeout.current = setTimeout(() => setShowHeader(true), 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // quick helpers for header labels
    const nav = {
        about: lang === "es" ? "Sobre Nosotros" : "About",
        services: lang === "es" ? "Servicios" : "Services",
        gallery: lang === "es" ? "Galería" : "Gallery",
        contact: lang === 'es' ? "Contáctanos" : "Contact us",
    };

    return (
        <div className="wrapper site-bg bg--stitch--bold" lang={lang}>
            <header className={`header ${showHeader ? 'visible' : 'hidden'}`}>
                <Link to="/" className="header__logo">
                    <img src={Logo} alt={lang === "es" ? "Logo de Aquino Tailor" : "Aquino Tailor logo"} />
                </Link>

                {isMobile ? (
                    <div className="header__right">
                        {/* NEW: toggle on mobile */}
                        <LanguageToggle lang={lang} setLang={setLang} />
                        {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img className="header__social" src={InstagramLogo} alt="Instagram" />
                        </a> */}
                        <MobileMenu />
                    </div>
                ) : (
                    <nav className="header__nav">
                        <Link to="/about">{nav.about}</Link>
                        <Link to="/services">{nav.services}</Link>
                        <Link to="/gallery">{nav.gallery}</Link>
                        <Link to="/contact">{nav.contact}</Link>
                        {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <img src={InstagramLogo} alt="Instagram" />
                        </a> */}
                        {/* NEW: toggle on desktop */}
                        <LanguageToggle lang={lang} setLang={setLang} showLabel={false} />
                    </nav>
                )}
            </header>

            <div className="header__spacer" />

            <main className="main">
                {/* pass lang down */}
                <Routes>
                    <Route path="/" element={<Home lang={lang} />} />
                    <Route path="/about" element={<About lang={lang} setLang={setLang} />} />
                    <Route path="/services" element={<Services lang={lang} />} />
                    <Route path="/gallery" element={<Gallery lang={lang} />} />
                    <Route path="/contact" element={<Contact lang={lang} setLang={setLang} />} />
                    <Route path="*" element={<NotFound lang={lang} />} />
                </Routes>
            </main>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Aquino Tailor</p>
            </footer>
        </div>
    );
};

export default PageWrapper;
