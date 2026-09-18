import React,{ createContext, useContext, useState, useEffect} from "react";

export interface Usuario {
    id: number;
    nombreCompleto: string;
    documento: { tipo: string, numero: string};
    fechaNacimiento:string;
    correo: string;
    residencia: string;
    datosPersonales:boolean;
    fechaRegistro:string;
    telefono?: string;
}

export interface pokemonTarjeta{
    id: number;
    name: string;
    image: string;
    type : string;
    baseExperience: string;
    esFavorito: boolean;
}

interface pokemoncontextype{
    Entrenadores : Usuario[];
    EntrenadorActivo : Usuario | null;
    MochilaActual : pokemonTarjeta[];
    seleccionarEntrenador : (Usuario: Usuario) => void;
    registrarEntrenador : (Usuario: Usuario) => void;
    GuardarMochila : (pokemon : pokemonTarjeta) => void;
    actualizarFavorito : (pokemonId : number) => void;
    eliminarpokemon : (pokemonId : number) => void;
}

const pokemoncontext = createContext<pokemoncontextype | undefined>(undefined);

export const usePokemonContext = () => {
    const context = useContext(pokemoncontext);
    if (!context) {
        throw new Error('usePokemonContext debe usarse dentro de PokemonProvider');
    }
    return context;
};

export const PokemonProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    // Recuperamos los entrenadores guardados para no perderlos al recargar la pagina.
    const [EntrenadoresActivo,setentrenadoresActivo] = useState<Usuario[]>(() => {
        const data = localStorage.getItem('LISTA_ENTRENADORES');
        return data ? JSON.parse(data) : [];
    });

    // Recuperamos el entrenador que estaba activo antes de cerrar o recargar la pagina.
    const [EntrenadorActivo, setentrenadorActivo] = useState<Usuario | null>(() => {
        const idActivo = localStorage.getItem('entrenador_Activo_id');
        const data = localStorage.getItem('LISTA_ENTRENADORES');
        if (idActivo && data) {
            const lista: Usuario[] = JSON.parse(data);
            return lista.find((u) => u.id.toString() === idActivo) || null;
        }
        return null;
    });

    // La mochila empieza con los datos del entrenador activo, si existe.
    const [MochilaActual,setmochilaActual] = useState<pokemonTarjeta[]>(() => {
        if (!EntrenadorActivo) return [];
        // La segunda clave permite conservar mochilas creadas antes de corregir
        // la diferencia entre "Mochila" y "mochila".
        const data = localStorage.getItem(`mochila_${EntrenadorActivo.id}`)
            || localStorage.getItem(`Mochila_${EntrenadorActivo.id}`);
        return data ? JSON.parse(data) : [];
    });

    const cargarMochilaEntrenador = (UsuarioId: number) =>{
        // Esta es la unica clave que usamos para leer y guardar la mochila.
        const data = localStorage.getItem(`mochila_${UsuarioId}`)
            || localStorage.getItem(`Mochila_${UsuarioId}`);
        setmochilaActual(data ? JSON.parse(data) : []);
    }

    const seleccionarEntrenador = (Usuario : Usuario) =>{
        setentrenadorActivo(Usuario);
        localStorage.setItem ('entrenador_Activo_id', Usuario.id.toString());
        cargarMochilaEntrenador(Usuario.id);
    }

    const registrarEntrenador = ( nuevoUsuario : Usuario) => {
        const actualizado = [...EntrenadoresActivo,nuevoUsuario];
        setentrenadoresActivo(actualizado);
        localStorage.setItem('LISTA_ENTRENADORES', JSON.stringify(actualizado));
        seleccionarEntrenador(nuevoUsuario);
    }

    const GuardarMochila = (pokemon:pokemonTarjeta)=> {
        if (!EntrenadorActivo) return;

        // React puede conservar una mochila antigua si el usuario borra el localStorage
        // desde DevTools. Por eso leemos la fuente actual antes de agregar el Pokemon.
        const data = localStorage.getItem(`mochila_${EntrenadorActivo.id}`)
            || localStorage.getItem(`Mochila_${EntrenadorActivo.id}`);
        const mochilaGuardada: pokemonTarjeta[] = data ? JSON.parse(data) : [];
        const actualizada = [...mochilaGuardada, {...pokemon, esFavorito: false}];
        setmochilaActual(actualizada);
        localStorage.setItem(`mochila_${EntrenadorActivo.id}`,JSON.stringify(actualizada));
    };

    const actualizarFavorito = (pokemonId : number) =>{
        if (!EntrenadorActivo) return;
        const actualizada = MochilaActual.map(p => p.id === pokemonId ? {...p, esFavorito: !p.esFavorito} : p);
        setmochilaActual(actualizada);
        localStorage.setItem(`mochila_${EntrenadorActivo.id}`,JSON.stringify(actualizada));
    }

    const eliminarpokemon = (pokemonId : number) =>{
        if (!EntrenadorActivo) return;
        const filtrado = MochilaActual.filter(p => p.id !== pokemonId);
        setmochilaActual(filtrado);
        localStorage.setItem(`mochila_${EntrenadorActivo.id}`,JSON.stringify(filtrado));
    }

    return (
        <pokemoncontext.Provider value={{
            Entrenadores: EntrenadoresActivo,
            EntrenadorActivo,
            MochilaActual,
            seleccionarEntrenador,
            registrarEntrenador,
            GuardarMochila,
            actualizarFavorito,
            eliminarpokemon
        }}>
            {children}
        </pokemoncontext.Provider>
    );
};

export const pokemonprovider = PokemonProvider;
