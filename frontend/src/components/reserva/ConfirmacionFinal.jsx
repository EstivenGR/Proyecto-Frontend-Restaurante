// src/components/reserva/ConfirmacionFinal.jsx (Versión FINAL)

import React from 'preact/compat';
import { ReservaStore } from '../../store/ReservaStore'; 

const ConfirmacionFinal = () => {

    // Obtener todos los datos necesarios del Store para la revisión
    const {
        clienteId,
        mesaId,
        fechaReserva,
        horaReserva,
        requerimientoEspecial,
        datosCliente,
        mesasDisponibles // <--- Lista completa de mesas
    } = ReservaStore();

    // 🛑 LÓGICA DE BÚSQUEDA DEL NÚMERO DE MESA 🛑
    const mesaSeleccionada = mesasDisponibles.find(mesa => mesa.id === mesaId);
    
    // Asumiendo que el objeto de mesa del backend tiene propiedades 'numero' y 'capacidad'
    const numeroMesa = mesaSeleccionada ? mesaSeleccionada.numero : null; 
    const capacidadMesa = mesaSeleccionada ? mesaSeleccionada.capacidad : null;


    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold border-b pb-2 text-orange-600">
                Revisión de Datos y Confirmación
            </h3>

            <div className="bg-white p-4 rounded-lg shadow text-gray-900 space-y-2">
                
                {/* MOSTRAR NOMBRE DEL CLIENTE */}
                <p><strong>Cliente:</strong> {datosCliente.nombre || 'ID ' + clienteId}</p>

                {/* 🛑 MOSTRAR NÚMERO DE MESA 🛑 */}
                <p>
                    <strong>Mesa Seleccionada:</strong> 
                    {numeroMesa 
                        ? `Mesa ${numeroMesa} (Cap: ${capacidadMesa})` // Muestra el número real y capacidad
                        : `ID ${mesaId}` // Falla si no encuentra la mesa, pero muestra el ID
                    }
                </p>

                <p><strong>Fecha y Hora:</strong> {fechaReserva && horaReserva ? `${fechaReserva} a las ${horaReserva}` : 'Pendiente'}</p>
                <p><strong>Requerimientos:</strong> {requerimientoEspecial || 'Ninguno'}</p>
            </div>

            {/* Mensaje instructivo */}
            <div className='text-sm text-gray-500 pt-2'>
                Verifica que los datos sean correctos antes de finalizar la reserva.
            </div>
        </div>
    );
};

export default ConfirmacionFinal;