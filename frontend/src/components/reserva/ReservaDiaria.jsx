import React, { useState, useEffect } from 'preact/compat';
import { ReservaStore } from '../../store/ReservaStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ReservaDiaria = () => {
    const [reservas, setReservas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const fetchReservasDelDia = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/reservas/?target_date=${selectedDate}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(errorBody.detail || 'Error al cargar las reservas del día.');
            }

            const data = await response.json();
            setReservas(data);

        } catch (err) {
            console.error("Error al obtener reservas diarias:", err);
            setError(err.message || "Fallo en la conexión para obtener el reporte.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (selectedDate) {
            fetchReservasDelDia();
        }
    }, [selectedDate]);

    return (
        <div className="bg-gray-100 p-8 rounded-xl shadow-2xl w-full h-full text-gray-900 space-y-4">

            <h3 className="text-xl font-bold border-b pb-2 text-orange-600">
                Reservas del Día ({selectedDate})
            </h3>
            <div>
                <label htmlFor="reportDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Seleccionar Fecha:
                </label>
                <input
                    type="date"
                    id="reportDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2 text-gray-900 focus:ring-orange-500 focus:border-orange-500"
                />
            </div>
            <button
                onClick={fetchReservasDelDia}
                disabled={isLoading}
                className={`w-full px-4 py-2 text-white font-semibold rounded-md transition duration-150 ${isLoading ? 'bg-gray-400' : 'bg-orange-600 hover:bg-orange-700'
                    }`}
            >
                {isLoading ? 'Cargando...' : 'Actualizar Lista'}
            </button>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <div className="space-y-3 overflow-y-auto max-h-96 pr-2">
                {reservas.length === 0 && !isLoading && !error && (
                    <p className="text-gray-500 text-center pt-5">No hay reservas programadas para el {selectedDate}.</p>
                )}

                {reservas.map(reserva => (
                    <div key={reserva.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-lg text-orange-600">Mesa {reserva.mesa_numero}</span>
                            <span className="text-sm text-gray-500">
                                {reserva.hora_reserva} ({reserva.start_time})
                            </span>
                        </div>
                        <p className="text-sm">Cliente: {reserva.cliente_nombre}</p>
                        {reserva.requerimiento && (
                            <p className="text-xs text-blue-600">Req: {reserva.requerimiento}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReservaDiaria;