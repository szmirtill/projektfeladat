// eslint-disable-next-line no-unused-vars
import React from "react";
import "./Style/About.css";

function About() {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>Rólunk – Valai Pékség története</h1>
                <p className="intro-text">
                    A Valai Pékség egy családi vállalkozás, amely a hagyományt és a minőséget ötvözi, hogy minden nap friss, kézműves pékárut kínáljon.
                </p>

                {/* Kép és szöveg blokk */}
                <div className="about-section">
                    <div className="about-image">
                        <img src="https://source.unsplash.com/600x400/?bakery,bread" alt="Pékség" />
                    </div>
                    <div className="about-text">
                        <h2>Hagyomány és minőség kéz a kézben</h2>
                        <p>
                            Pékségünk titka az egyszerűségben és a természetességben rejlik. Csak a legjobb alapanyagokkal dolgozunk: kiváló minőségű liszt, természetes kovász és gondosan válogatott magvak teszik különlegessé termékeinket.
                        </p>
                        <p>
                            Hagyományos magyar pékáruk mellett folyamatosan bővülő kínálatunkban pogácsák, kalácsok, kenyerek és friss péksütemények is megtalálhatóak.
                        </p>
                    </div>
                </div>

                {/* Fenntarthatóság */}
                <div className="sustainability">
                    <h2>Fenntarthatóság és felelős gondolkodás</h2>
                    <ul>
                        <li>✅ Helyi termelőktől szerezzük be alapanyagainkat.</li>
                        <li>✅ Minimalizáljuk az élelmiszer-pazarlást.</li>
                        <li>✅ Környezetbarát csomagolásokat használunk.</li>
                    </ul>
                </div>

                {/* Üzletek és kapcsolat */}
                <div className="contact-info">
                    <h2>Látogass el hozzánk!</h2>
                    <p>📍 Valai Pékség, Kővágóőrs</p>
                    <p>📞 +36 30 123 4567</p>
                    <p>🌐 <a href="https://www.valaipekseg.hu">www.valaipekseg.hu</a></p>
                </div>
            </div>
        </div>
    );
}

export default About;
