// src/pages/Reserva.jsx

import React, { useState } from 'preact/compat';
import { ReservaStore } from '../store/ReservaStore';
import FondoRestaurante from '../assets/images/reserva.jpg';
import LogoPresik from '../assets/images/logo.png'; 
import RegistroCliente from '../components/reserva/RegistroCliente';
import CrearReserva from '../components/reserva/CrearReserva'; 
import ConfirmacionFinal from '../components/reserva/ConfirmacionFinal'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// FUNCIÓN DE RENDERIZADO (Se mantiene igual)
const renderStepContent = (step, nextStep) => {
    switch (step) {
        case 1:
            return <RegistroCliente onRegistrationSuccess={nextStep} />; 
        case 2:
            return <CrearReserva />; 
        case 3:
            return <ConfirmacionFinal />;
        default:
            return <div className="text-center text-3xl font-bold text-orange-500">¡Reserva Completada con Éxito!</div>;
    }
};


const Reserva = () => {

    const { 
        step, nextStep, prevStep, clienteId,
        mesaId, fechaReserva, horaReserva, requerimientoEspecial,
    } = ReservaStore();

    const [isConfirming, setIsConfirming] = useState(false);
    const [finalError, setFinalError] = useState(null); 

    const stepTitle = [
        "1. Datos del Cliente",
        "2. Fecha y Mesa",
        "3. Confirmación Final",
    ][step - 1];

    const progress = (step / 3) * 100;

    const backgroundStyle = {
        backgroundImage: `url(${FondoRestaurante})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };

    const canAdvance = () => {
        if (step === 1) return clienteId !== null;
        if (step === 2) return clienteId && fechaReserva && horaReserva && mesaId;
        if (step === 3) return !isConfirming;
        return true;
    }

    const handleConfirmarReserva = async () => {
        const fechaHoraCompleta = fechaReserva && horaReserva ? `${fechaReserva}T${horaReserva}:00` : null;

        if (!clienteId || !mesaId || !fechaHoraCompleta) {
            setFinalError("Faltan datos críticos para confirmar la reserva.");
            return;
        }

        setIsConfirming(true);
        setFinalError(null);

        try {
            const dataToSend = {
                cliente_id: clienteId,
                mesa_id: mesaId,
                fecha_reserva: fechaHoraCompleta, 
                requerimiento: requerimientoEspecial || null 
            };
            
            const response = await fetch(`${API_BASE_URL}/reservas/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al crear la reserva.');
            }

            nextStep(); 

        } catch (err) {
            console.error("Error al confirmar reserva:", err);
            setFinalError(err.message || "Fallo al finalizar la reserva.");
        } finally {
            setIsConfirming(false);
        }
    };


    return (
        <div
            className="min-h-screen flex justify-center items-center p-5"
            style={backgroundStyle}
        >
            {/* Capa oscura de 50% de opacidad */}
            <div className="absolute inset-0 bg-black/50"></div> 
            
            <div
                className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-sm text-gray-900 relative z-10" // Tarjeta Compacta
            >
                {/* 🌟 REESTRUCTURA DEL ENCABEZADO 🌟 */}
                <div className="flex items-center justify-center mb-4 space-x-3"> 
                    
                    {/* LOGO */}
                    <img 
                        src={LogoPresik} 
                        alt="Logo BarPresik" 
                        className="h-12 w-auto" // Lo hacemos un poco más grande
                    />
                    
                    {/* TÍTULO */}
                    <h2 className="text-3xl font-bold text-orange-600">
                        Reserva tu Mesa
                    </h2>
                </div>

                {/* 2. BARRA DE PROGRESO (Debajo del Título) */}
                <div className="mb-6 pt-2 border-t border-gray-300"> {/* pt-2 separa del título */}
                    <div className="flex justify-between items-center mb-2">
                        <small className="text-sm text-gray-500">Paso {step} de 3: {stepTitle}</small>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2.5">
                        <div
                            className="bg-orange-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
                            style={{ width: `${progress}%` }}
                        >
                        </div>
                    </div>
                </div>


                {/* Mostrar error global de confirmación */}
                {finalError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {finalError}
                    </div>
                )}

                {/* Contenido Dinámico del Paso */}
                <div className="pb-4">
                    {renderStepContent(step, nextStep)} 
                </div>

                {/* CONTROLES DE NAVEGACIÓN (Botón Atrás + Siguiente/Confirmar) */}
                
                {step > 1 && step < 4 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between">

                            {/* Botón Atrás */}
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150" onClick={prevStep}>
                                Atrás
                            </button>

                            {/* BOTÓN PRINCIPAL (Siguiente / Confirmar) */}
                            <button
                                onClick={step === 3 ? handleConfirmarReserva : nextStep}
                                disabled={!canAdvance()}
                                className={`px-6 py-3 rounded-lg transition duration-150 ml-auto ${
                                    !canAdvance() || isConfirming
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : step === 3 
                                            ? 'bg-green-600 hover:bg-green-700 text-white' // Usamos VERDE para confirmar
                                            : 'bg-orange-600 hover:bg-orange-700 text-white' // NARANJA para siguiente
                                    }`}
                            >
                                {isConfirming
                                    ? 'Confirmando...'
                                    : step === 3
                                        ? 'Confirmar Reserva'
                                        : 'Siguiente'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Reserva;