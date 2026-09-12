import React, { createContext, useContext, useState, useEffect } from 'react';
export interface Usuario {
    id: number;
    nombreCompleto: string;
    documento: { tipo: string, numero: string};
    fechaNacimiento: string;
    correo: string;
    datosPersonales: boolean;
    fechaRegistro: string;
}

export interface PokemonTarjeta {
    id: number;
    name: string;
    image: string;
    type: string;
    baseExperience: string;
    esFavorito: boolean;
}

interface PokemonContextType {
    entrenadores: Usuario[];
    entrenadorActivo: Usuario | null;
    mochilaActual: PokemonTarjeta[];
    seleccionarEntrenador: (usuario: Usuario) => void;
    registrarEntrenador: (usuario: Usuario) => void;
    guardarMochila: (pokemon: PokemonTarjeta) => void;
    actualizarFavorito: (pokemonId: number) =>void;
    eliminaPokemon: (pokemonId: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined> (undefined);
export const PokemonProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [entrenadores, setEntrenadores] = useState<Usuario[]>([]);
    const [entrenadorActivo, setEntrenadorActivo] = useState<Usuario | null> (null);
    const [mochilaActual, setMochilaActual] = useState<PokemonTarjeta[]> ([]);
    useEffect(() => {
        const data = localStorage.getItem('lista_entrenadores');
        if (data) {
            const lista: Usuario[]= JSON.parse(data);
            setEntrenadores(lista);

            const idActivo = localStorage.getItem('lista_entrenadores_Activo_id');

            if (idActivo) {
                const encontrado = lista.find(u => u. id.toString() === idActivo);
                if (encontrado) seleccionarEntrenador(encontrado);
            }
        }
    }, [] ); 

    const cargarMochilaEntrenador = (usuarioId: number) => {
        const data = localStorage.getItem(`mochila_${usuarioId}`);
        setMochilaActual(data ? JSON.parse(data): []);
    }

    const seleccionarEntrenador = (usuario: Usuario) => {
        setEntrenadorActivo(usuario);
        localStorage.setItem('entrenador_activo_id', usuario.id.toString());
        cargarMochilaEntrenador(usuario.id);  
    }

    const registrarEntrenador = (nuevoUsuario: Usuario) => {
        const actualizados = [...entrenadores, nuevoUsuario];
        setEntrenadores(actualizados);
        localStorage.setItem('lista_entrenadores', JSON.stringify(actualizados));
        seleccionarEntrenador(nuevoUsuario);
    }
    const
}