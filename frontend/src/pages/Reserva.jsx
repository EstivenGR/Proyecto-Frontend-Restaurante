import React, { useState } from 'preact/compat';
import { ReservaStore } from '../store/ReservaStore';
import FondoRestaurante from '../assets/images/reserva.jpg';
import LogoPresik from '../assets/images/logo.png'; 
import RegistroCliente from '../components/reserva/RegistroCliente';
import CrearReserva from '../components/reserva/CrearReserva'; 
import ConfirmacionFinal from '../components/reserva/ConfirmacionFinal';
import ReservaDiaria from '../components/reserva/ReservaDiaria'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const renderStepContent = (step, nextStep) => {
    switch (step) {
        case 1:
            return <RegistroCliente onRegistrationSuccess={nextStep} />; 
        case 2:
            return <CrearReserva />; 
        case 3:
            return <ConfirmacionFinal />;
        default:
           return (
                <div className="text-center p-8 bg-white border-2 border-green-500 rounded-xl shadow-lg">
                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                    <h3 className="text-3xl font-bold text-green-600 mt-4 mb-2">¡Reserva Exitosa!</h3>
                    <p className="text-gray-700">Tu mesa ha sido reservada correctamente.</p>
                    
                    <button 
                        onClick={() => globalThis.location.reload()}
                        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150"
                    >
                        Realizar otra reserva
                    </button>
                </div>
            );
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
        const fechaSolo = fechaReserva;
        if (!clienteId || !mesaId || !fechaSolo || !horaReserva) { 
            setFinalError("Faltan datos críticos para confirmar la reserva (fecha u hora).");
            return;
        }

        setIsConfirming(true);
        setFinalError(null);

        try {
            const dataToSend = {
                cliente_id: clienteId,
                mesa_id: mesaId,
                fecha_reserva: fechaSolo,
                hora_reserva: horaReserva, 
                requerimientos: requerimientoEspecial || null 
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
            <div className="absolute inset-0 bg-black/50"></div> 
            <div className="flex w-full max-w-4xl relative z-10 gap-6 justify-center">
                <div
                    className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full max-w-sm text-gray-900" 
                >
                    <div className="flex items-center justify-center mb-4 space-x-3"> 
                        <img 
                            src={LogoPresik} 
                            alt="Logo BarPresik" 
                            className="h-12 w-auto" 
                        />
                        <h2 className="text-3xl font-bold text-orange-600">
                            Reserva tu Mesa
                        </h2>
                    </div>
                    {step < 4 && (
                        <div className="mb-6 pt-2 border-t border-gray-300"> 
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
                    )}
                    {finalError && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {finalError}
                        </div>
                    )}

                    <div className="pb-4">
                        {renderStepContent(step, nextStep)} 
                    </div>
                    
                    {step > 1 && step < 4 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="flex justify-between">
                                <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-150" onClick={prevStep}>
                                    Atrás
                                </button>
                                <button
                                    onClick={step === 3 ? handleConfirmarReserva : nextStep}
                                    disabled={!canAdvance()}
                                    className={`px-6 py-3 rounded-lg transition duration-150 ml-auto ${
                                        !canAdvance() || isConfirming
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : step === 3 
                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                : 'bg-orange-600 hover:bg-orange-700 text-white'
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
                {step == 1 && (
                    <div className="w-full max-w-sm">
                        <ReservaDiaria /> 
                    </div>
                )}
            </div>
        </div>
    );
};

export default Reserva;