import React, { useState } from "react";
import { usePokemonContext, type pokemonTarjeta } from "../context/PokemonContext";

export const BuscadorPokemon: React.FC = () => {

    const { EntrenadorActivo, GuardarMochila } = usePokemonContext();

    const [busqueda, setBusqueda] = useState('');
    const [pokemonActual, setPokemonActual] = useState<pokemonTarjeta | null>(null);
    const [mensajeError, setMensajeError] = useState<string | null>(null);
    const [cargando, setCargando] = useState(false);

    const buscarPokemon = async (e: React.FormEvent) => {
        e.preventDefault();

        const query = busqueda.trim().toLocaleLowerCase();

        if(!query) return;


        setCargando(true);
        setMensajeError(null);

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error('Callate sapo');

            const datos = await res.json();
            const pokemonEncontrado: pokemonTarjeta = {
                id: datos.id,
                name: datos.name,
                image:datos.sprites.front_default,
                type:datos.types[0].type.name,
                baseExperience: datos.base_experience,
                esFavorito : false
            };
            setPokemonActual(pokemonEncontrado);

        } catch (error:any){
            setPokemonActual(null);
            setMensajeError(error.message);
        } finally {
            setCargando(false);
        }
    
    }; 

    const clickGuardar = () => {
        if(!EntrenadorActivo){
            alert('Debes seleccionar o registrar un entrenador')
        }

        if (pokemonActual && EntrenadorActivo) {
            GuardarMochila(pokemonActual);
            alert(`El pokemon ${pokemonActual.name} es guardado en la mochila de ${EntrenadorActivo.nombreCompleto}`);
        }
    }

    return(
        <section className="page-section search-page">
            <div className="banner-sesion">
            {EntrenadorActivo ? (
                <p> Mochila Activa de : <strong>{EntrenadorActivo.nombreCompleto}</strong></p>
            ) : (
                <p> No hay entrenador Activo. ve al formulario de Registro para activarlo, socio.</p>

            )}
            </div>

            <form className="search-panel" onSubmit={buscarPokemon}>
                <div className="search-heading">
                    <span className="panel-kicker">01 / POKÉDEX SCANNER</span>
                    <h2>Busca un Pokémon</h2>
                    <p>Consulta la Pokédex y añade tu captura a la mochila activa.</p>
                </div>
                <div className="search-controls">
                    <div className="search-field">
                    <label>Buscar pokemon</label>
                    <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="ej: pikachu, charmander" />
                    </div>
                    <button className="btn-submit" type="submit" disabled={cargando}>
                        {cargando ? 'ESCANEANDO...' : 'Buscar'}
                    </button>
                </div>
                {mensajeError && <p className="message-error">{mensajeError}</p>}
            </form>
        

        {pokemonActual && (
            <article className="tarjeta-pokemon">
            <span className="panel-kicker">SCAN COMPLETE / DATA RECEIVED</span>
            <img className="pokemon-hero" src={pokemonActual.image} alt={pokemonActual.name} />
            <h3>{pokemonActual.name}</h3>
            <p className="pokemon-stat">Elemento: {''}
                <span className={`type-badge type-${pokemonActual.type}`}>
                    {pokemonActual.type.toUpperCase()}
                </span>
            </p>
            <p className="pokemon-stat">Experiencia base <strong>{pokemonActual.baseExperience}</strong></p>
            <button type="button" className="btn-capturar" onClick={clickGuardar} disabled={!EntrenadorActivo}>
                Capturar
            </button>
            </article>
        )}

        </section>
    );

}