import { create } from 'zustand';

export const ReservaStore = create((set) => ({
    step: 1, 
    clienteId: null, 
    fechaReserva: '', 
    horaReserva: '',
    mesaId: null,
    requerimientoEspecial: '',
    mesasDisponibles: [],


    datosCliente: {
        nombre: '',
        telefono: '',
        email: '',
        cedula: '',
    },
    
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: state.step - 1 })),

    setClienteId: (id) => set({ clienteId: id }),
    setDatosCliente: (key, value) => set((state) => ({
        datosCliente: {
            ...state.datosCliente,
            [key]: value
        }
    })),
    
    setFechaReserva: (fecha) => set({ fechaReserva: fecha }),
    setHoraReserva: (hora) => set({ horaReserva: hora }),
    setMesaId: (id) => set({ mesaId: id }),
    setRequerimientoEspecial: (req) => set({ requerimientoEspecial: req }),

    setMesasDisponibles: (mesas) => set({ mesasDisponibles: mesas }),

    resetStore: () => set({
        step: 1,
        clienteId: null, 
        fechaReserva: '',
        horaReserva: '',
        mesaId: null,
        requerimientoEspecial: '',
        mesasDisponibles: [],
        datosCliente: { nombre: '', telefono: '', email: '', cedula: '' },
    })
}));