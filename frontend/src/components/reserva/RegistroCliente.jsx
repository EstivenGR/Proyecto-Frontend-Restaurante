// src/components/reserva/RegistroCliente.jsx
import { useState } from 'preact/compat';
import { ReservaStore } from '../../store/ReservaStore';

// URL base de tu API de FastAPI (donde está corriendo tu backend)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RegistroCliente = ({ onRegistrationSuccess }) => {
    // 1. Obtener y actualizar el estado desde Sustan
    // NO extraemos nextStep de aquí, ya que lo recibimos por prop.
    const { datosCliente, setDatosCliente, setClienteId } = ReservaStore();

    // Estado local para manejar el feedback
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatosCliente(name, value);
    };

    // Función para validar campos básicos
    const isFormValid = datosCliente.nombre && datosCliente.telefono && datosCliente.email && datosCliente.cedula;

    // 2. Lógica para llamar a la API y registrar el cliente
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        if (!isFormValid) {
            setError("Por favor, rellena todos los campos obligatorios.");
            setIsLoading(false);
            return;
        }

        try {
            // El payload para FastAPI
            const dataToSend = {
                nombre: datosCliente.nombre,
                telefono: datosCliente.telefono,
                email: datosCliente.email,
                cedula: datosCliente.cedula
            };

            const response = await fetch(`${API_BASE_URL}/clientes/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                // Si FastAPI devuelve un error 422, etc.
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al registrar el cliente.');
            }

            const clienteRegistrado = await response.json();

            // 3. 🌟 ÉXITO: Guardar el ID en Sustan
            setClienteId(clienteRegistrado.id);

            // 4. 🌟 ¡CAMBIO CLAVE! Usamos la prop de callback para avanzar.
            if (onRegistrationSuccess) {
                onRegistrationSuccess(); // Esto es lo que soluciona el error nextStep is not a function
            }

        } catch (err) {
            console.error("Error en el registro:", err);
            setError(err.message || "Fallo en la conexión o en la API.");
        } finally {
            setIsLoading(false);
        }
    };

    // 4. Renderizado del Formulario (Tailwind CSS)
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    {error}
                </div>
            )}

            {/* Input Nombre */}
            <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    required
                    value={datosCliente.nombre}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            {/* Input Cédula */}
            <div>
                <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">Cédula</label>
                <input
                    type="text"
                    name="cedula"
                    id="cedula"
                    required
                    value={datosCliente.cedula}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            {/* Input Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={datosCliente.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            {/* Input Teléfono */}
            <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                    type="tel"
                    name="telefono"
                    id="telefono"
                    required
                    value={datosCliente.telefono}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
                />
            </div>

            {/* Botón de Registro y Siguiente */}
            <div className="pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    className={`w-full px-4 py-2 text-white font-semibold rounded-md transition duration-150 ${
                        // 🌟 AJUSTE CRÍTICO: Aseguramos el naranja en hover y estado válido
                        isFormValid && !isLoading ? 'bg-orange-600 hover:bg-orange-700' : 'bg-orange-300 cursor-not-allowed'
                        }`}
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? 'Registrando...' : 'Siguiente'}
                </button>
            </div>
        </form>
    );
};

export default RegistroCliente;