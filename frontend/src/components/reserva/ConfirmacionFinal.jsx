// src/components/reserva/ConfirmacionFinal.jsx (Versión SOLO LECTURA)

import React from 'preact/compat';
import { ReservaStore } from '../../store/ReservaStore'; 

// Ya no necesitamos API_BASE_URL ni estados de confirmación aquí.

const ConfirmacionFinal = () => {
    
    // Obtener solo los datos del Store para la revisión
    const { 
        clienteId, 
        mesaId, 
        fechaReserva, 
        horaReserva, 
        requerimientoEspecial,
        // nextStep ya no se usa aquí
    } = ReservaStore();

    // Podemos obtener el estado de confirmación del padre si fuera necesario, 
    // pero para esta revisión, solo mostramos los datos.

    // La función getFechaHoraISO() y handleConfirmarReserva() fueron movidas a Reserva.jsx.

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2 text-red-600">
                Revisión de Datos y Confirmación
            </h3>

            {/* NOTA: El error de POST ahora se muestra en el padre (Reserva.jsx) */}

            <div className="bg-white p-4 rounded-lg shadow text-gray-900 space-y-2">
                <p><strong>Cliente ID:</strong> {clienteId || 'No Identificado'}</p>
                <p><strong>Mesa Seleccionada:</strong> {mesaId ? `ID ${mesaId}` : 'Pendiente'}</p>
                <p><strong>Fecha y Hora:</strong> {fechaReserva && horaReserva ? `${fechaReserva} a las ${horaReserva}` : 'Pendiente'}</p>
                <p><strong>Requerimiento:</strong> {requerimientoEspecial || 'Ninguno'}</p>
            </div>
            
            {/* Mensaje instructivo */}
            <div className='text-sm text-gray-500 pt-2'>
                Verifica que los datos sean correctos antes de finalizar la reserva. El botón "Confirmar Reserva" se encuentra al final.
            </div>
        </div>
    );
};

export default ConfirmacionFinal;