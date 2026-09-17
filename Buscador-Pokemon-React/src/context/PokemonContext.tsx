import React,{ createContext, useContext,useState,useEffect} from "react";

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
    const [EntrenadoresActivo,setentrenadoresActivo] = useState<Usuario[]>([]);
    const [EntrenadorActivo,setentrenadorActivo] = useState<Usuario | null>(null);
    const [MochilaActual,setmochilaActual] = useState<pokemonTarjeta[]>([]);
    
    useEffect(() => {
        const data = localStorage.getItem('LISTA_ENTRENADORES');
        if(data){
            const LISTA : Usuario []= JSON.parse(data);
            setentrenadoresActivo(LISTA);
            const idActivo = localStorage.getItem('entrenador_Activo_id');
            if (idActivo){
                const encotrado = LISTA.find(U => U.id.toString() === idActivo);
                if (encotrado) seleccionarEntrenador(encotrado)
            }
        }
    },[]);

    const cargarMochilaEntrenador = (UsuarioId: number) =>{
        const data = localStorage.getItem(`mochila_${UsuarioId}`);
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
        const actualizada = [...MochilaActual, {...pokemon, esFavorito: false}];
        setmochilaActual(actualizada);
        localStorage.setItem(`Mochila_${EntrenadorActivo.id}`,JSON.stringify(actualizada));
    };

    const actualizarFavorito = (pokemonId : number) =>{
        if (!EntrenadorActivo) return;
        const actualizada = MochilaActual.map(p => p.id === pokemonId ? {...p, esFavorito: !p.esFavorito} : p);
        setmochilaActual(actualizada);
        localStorage.setItem(`Mochila_${EntrenadorActivo.id}`,JSON.stringify(actualizada));
    }

    const eliminarpokemon = (pokemonId : number) =>{
        if (!EntrenadorActivo) return;
        const filtrado = MochilaActual.filter(p => p.id !== pokemonId);
        setmochilaActual(filtrado);
        localStorage.setItem(`Mochila_${EntrenadorActivo.id}`,JSON.stringify(filtrado));
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
