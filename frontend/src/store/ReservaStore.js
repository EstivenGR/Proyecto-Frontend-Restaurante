// src/store/ReservaStore.js

import { create } from 'zustand';

export const ReservaStore = create((set) => ({

    // ESTADO DE LA RESERVA (Flujo)
    step: 1, 
    clienteId: null, 
    
    // VARIABLES DEL PASO 2 (CrearReserva)
    fechaReserva: '', 
    horaReserva: '', // 👈 AÑADIDO: Necesario para el campo de hora
    mesaId: null,    // 👈 CORREGIDO: Usamos mesaId para ser consistente con la API
    requerimientoEspecial: '', // 👈 AÑADIDO: Necesario para requerimientos

    // DATOS DEL CLIENTE (Paso 1)
    datosCliente: {
        nombre: '',
        telefono: '',
        email: '',
        cedula: '',
    },
    
    // -------------------------------------------------------------------
    // ACCIONES

    // 1. MANEJO DEL STEP (CRÍTICO para el avance)
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),

    // 2. SETTERS DEL PASO 1
    setClienteId: (id) => set({ clienteId: id }),
    
    setDatosCliente: (key, value) => set((state) => ({
        datosCliente: {
            ...state.datosCliente,
            [key]: value
        }
    })),
    
    // 3. SETTERS DEL PASO 2
    setFechaReserva: (fecha) => set({ fechaReserva: fecha }),
    setHoraReserva: (hora) => set({ horaReserva: hora }),
    setMesaId: (id) => set({ mesaId: id }),
    setRequerimientoEspecial: (req) => set({ requerimientoEspecial: req }),


    // 4. RESET
    resetStore: () => set({
        step: 1,
        clienteId: null, 
        fechaReserva: '',
        horaReserva: '', // 👈 Resetear hora
        mesaId: null,    // 👈 Resetear mesa
        requerimientoEspecial: '', // 👈 Resetear requerimientos
        datosCliente: { nombre: '', telefono: '', email: '', cedula: '' },
    })
}));