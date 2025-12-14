const Button = ({ text, onClick, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled} 
            className={`
                // Base: Padding, Bordes y Fuente
                px-10 py-3.5 
                rounded-lg 
                text-lg font-bold tracking-wide 
                whitespace-nowrap // Evita que el texto se rompa en varias líneas

                // Estilo por defecto (Naranja/Acento)
                bg-orange-600 text-white 
                shadow-md shadow-orange-600/40 
                
                // Transiciones y Efectos Hover
                transition-all duration-300 ease-in-out
                hover:bg-orange-500 
                hover:scale-[1.02] 
                hover:shadow-lg hover:shadow-orange-500/50
                active:scale-[0.98] // Efecto de "clic" sutil

                // Accesibilidad (Focus State)
                focus:outline-none focus:ring-4 focus:ring-orange-600/50 
                
                // Estado Deshabilitado
                ${
                    disabled
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                }

                // Clases personalizadas (Permite sobrescribir)
                ${className}
            `}
        >
            {text}
        </button>
    );
};

export default Button;