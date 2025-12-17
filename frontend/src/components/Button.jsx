const Button = ({ text, onClick, className = '', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled} 
            className={`
                px-10 py-3.5 
                rounded-lg 
                text-lg font-bold tracking-wide 
                whitespace-nowrap 
                bg-orange-600 text-white 
                shadow-md shadow-orange-600/40 
                transition-all duration-300 ease-in-out
                hover:bg-orange-500 
                hover:scale-[1.02] 
                hover:shadow-lg hover:shadow-orange-500/50
                active:scale-[0.98]
                focus:outline-none focus:ring-4 focus:ring-orange-600/50 

                ${
                    disabled
                        ? 'opacity-60 cursor-not-allowed'
                        : ''
                }

                ${className}
            `}
        >
            {text}
        </button>
    );
};

export default Button;