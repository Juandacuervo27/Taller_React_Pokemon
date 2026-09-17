import { useState } from 'react';
import { usePokemonContext, type Usuario } from '../context/PokemonContext';

export const InventarioPokemon = () => {
    const { registrarEntrenador } = usePokemonContext();
    const [nombre] = useState('');
    const [apellido] = useState('');
    const [tipoDoc] = useState('CC');
    const [pais] = useState('');
    const [ciudad] = useState('');
    const [dni] = useState('');
    const [fechaNacimiento] = useState('');
    const [telefono] = useState('');
    const [correo] = useState('');
    const [datosPersonales] = useState(false);

    const eventoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!datosPersonales) {
            alert('Debe aceptar el tratamiento de datos personales');
            return;
        }

        const nuevo: Usuario = {
            id: Date.now(),
            nombreCompleto: `${nombre} ${apellido}`.trim(),
            documento: { tipo: tipoDoc, numero: dni },
            fechaNacimiento,
            correo,
            telefono,
            residencia: `${ciudad}, ${pais}`,
            datosPersonales,
            fechaRegistro: new Date().toISOString(),
        };


        registrarEntrenador(nuevo);

    };

    return (
        <div>
            <form onSubmit={eventoSubmit}></form>
        </div>
    );
};