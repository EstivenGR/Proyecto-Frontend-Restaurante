import React, { useState, useEffect } from 'preact/compat';
import { ReservaStore } from '../../store/ReservaStore'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CrearReserva = () => {
    
    const { 
        fechaReserva, setFechaReserva,
        horaReserva, setHoraReserva,
        mesaId, setMesaId,
        requerimientoEspecial, setRequerimientoEspecial,
        setMesasDisponibles
    } = ReservaStore();

    const [mesas, setMesas] = useState([]);
    const [isLoadingMesas, setIsLoadingMesas] = useState(false);
    const [errorMesas, setErrorMesas] = useState(null);
    const horariosDisponibles = ["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
    const fetchMesas = async () => {
        setIsLoadingMesas(true);
        setErrorMesas(null);

        const estadoFiltro = 'disponible'; 
        
        try {
            const response = await fetch(`${API_BASE_URL}/mesas/?estado=${estadoFiltro}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.detail || 'Error al cargar las mesas disponibles.');
            }

            const data = await response.json();
            setMesas(data);
            setMesasDisponibles(data);
            
        } catch (error) {
            console.error("Error al obtener mesas:", error);
            setErrorMesas(error.message || "Fallo en la conexión o en la API al cargar mesas.");
        } finally {
            setIsLoadingMesas(false);
        }
    };

    useEffect(() => {
        fetchMesas();
    }, []);
    
    return (
        <div className="space-y-6">
            <div>
                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                    type="date"
                    id="fecha"
                    min={new Date().toISOString().split('T')[0]} 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-red-500 focus:border-red-500"
                    value={fechaReserva || ''}
                    onChange={(e) => {
                        setFechaReserva(e.target.value);
                    }}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hora de Reserva</label>
                <div className="flex flex-wrap gap-2">
                    {horariosDisponibles.map(hora => (
                        <button
                            key={hora}
                            onClick={() => {
                                setHoraReserva(hora);
                            }}
                            className={`px-3 py-1 text-sm rounded-full transition duration-150 ${
                                horaReserva === hora 
                                    ? 'bg-red-600 text-white shadow-md' 
                                    : 'bg-gray-200 text-gray-800 hover:bg-red-100'
                            }`}
                        >
                            {hora}
                        </button>
                    ))}
                </div>
            </div>

            <div className='pt-2'>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mesa Disponible (Número / Capacidad)</label>
                
                {isLoadingMesas && <p className="text-center text-gray-600">Cargando mesas...</p>}
                {errorMesas && <p className="text-center text-red-600 font-semibold">{errorMesas}</p>}

                {!isLoadingMesas && !errorMesas && mesas.length === 0 && (
                    <p className="text-center text-orange-600 font-semibold p-4 bg-orange-50 rounded-lg">
                        No se encontraron mesas disponibles.
                    </p>
                )}

                <div className="grid grid-cols-3 gap-3">
                    {mesas.map(mesa => (
                        <button
                            key={mesa.id}
                            onClick={() => setMesaId(mesa.id)}
                            className={`p-3 rounded-lg text-center transition duration-150 border-2 ${
                                mesaId === mesa.id
                                    ? 'bg-green-500 text-white border-green-700 shadow-lg'
                                    : 'bg-white text-gray-800 border-gray-300 hover:border-red-500'
                            }`}
                        >
                            <span className="font-semibold">{mesa.numero}</span> 
                            <span className="block text-xs">Cap: {mesa.capacidad}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label htmlFor="requerimientos" className="block text-sm font-medium text-gray-700">Requerimientos Especiales (Opcional)</label>
                <textarea
                    id="requerimientos"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-red-500 focus:border-red-500"
                    placeholder="Ej: Mesa cerca de la ventana, silla para bebé, etc."
                    value={requerimientoEspecial || ''}
                    onChange={(e) => setRequerimientoEspecial(e.target.value)}
                ></textarea>
            </div>
        </div>
    );
};

export default CrearReserva;