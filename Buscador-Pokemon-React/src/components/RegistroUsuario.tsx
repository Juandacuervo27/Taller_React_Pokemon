import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext, type Usuario } from '../context/PokemonContext';
export const RegistroUsuario = () => {
    const {entrenadores, registrarActivo, registrarEntrenador, seleccionarEntrenador} = usePokemonContext();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('CC');
    const [dni, setDni] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [datosPersonales, setDatosPersonales] = useState(false);
    const eventoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!datosPersonales) {
            alert('Debe aceptar el tratamiento de datos personales');
            return;
        }

        const nuevo: usuario = {
            id: Date.now(),
            nombreCompleto: `${nombre} ${apellido}`,
            documento: {tipo: tipoDoc, numero: dni},
            fechaNacimiento,
            correo,
            datosPersonales,
            fechaRegistro: new Date().toISOString()
        };

        registrarEntrenador(nuevo);
        navigate('/buscador');
    }

    return (
        <div>
            <p>Continuamos el dia lunes</p>
        </div>
    )
}