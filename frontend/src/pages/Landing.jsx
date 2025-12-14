import fondo from '../assets/images/image.jpg';
import Button from '../components/Button';
import { useLocation } from 'preact-iso';

export default function Landing() {
    const location = useLocation();

    return (
        <section
            class="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{ backgroundImage: `url(${fondo})` }}
        >
            <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div class="relative z-10 text-center text-white px-4 py-20 max-w-4xl mx-auto">
                <h1 class="text-7xl sm:text-8xl lg:text-9xl font-extrabold mb-4 leading-none tracking-tight font-serif">
                    <span class="text-white">Bar</span>
                    <span class="text-orange-500">Presik</span>
                    <span class="text-white">.</span>
                </h1>
                <p class="text-xl sm:text-2xl mt-4 mb-12 italic tracking-wide font-light">
                    "Vive una experiencia gastronómica única."
                </p>
                <Button
                    onClick={() => location.route('/reserva')}
                    text="Reservar Ahora"
                    className="
                        mt-8
                        px-14 py-4
                        rounded-lg
                        bg-orange-600
                        text-white
                        text-xl
                        font-bold
                        tracking-wider
                        shadow-2xl shadow-orange-600/50
                        transition-all duration-300 ease-in-out
                        hover:bg-orange-500
                        hover:scale-105
                        hover:shadow-xl hover:shadow-orange-500/70
                        active:scale-95
                        focus:outline-none focus:ring-4 focus:ring-orange-600/50
                    "
                />
            </div>
        </section>
    );
}