import React from "react";
import { usePokemonContext } from "../context/PokemonContext";

export const InventarioPokemon: React.FC = () => {
    const { EntrenadorActivo, MochilaActual, actualizarFavorito, eliminarpokemon } = usePokemonContext();

    if (!EntrenadorActivo) {
        return (
            <div>
                <h3>NO hay entrenadores</h3>
                <p>Debes registrar un entrenador activo o registre un entrenador.</p>
            </div>
        );
    }

    return (
        <div className="banner-sesion">
			<header>
				<h2>Inventario de {EntrenadorActivo.nombreCompleto}</h2>
			</header>

			<div className="grid-mochila">
				{MochilaActual.length > 0 ? (
					MochilaActual.map((poke, index) => (
						<div key={poke.id} className={`tarjeta-item ${poke.esFavorito ? 'tarjeta-favorita' : ''}`}>
							<span>
								#{index + 1} de {MochilaActual.length}
							</span>
							<img src={poke.image} alt={poke.name} />
							<h4>{poke.name}</h4>
							<p>{poke.type}</p>
							<div className="panel-botones">
								<button className={`btn-fav ${poke.esFavorito ? 'fav-activo' : ''}`} onClick={() => actualizarFavorito(poke.id)}>
									{poke.esFavorito ? '★ Favorito' : '☆ Marcar como favorito'}
								</button>
								<button type="button" className="btn-eliminar" onClick={() => eliminarpokemon(poke.id)}>
									Liberar o soltar
								</button>
							</div>

						</div>
					))) : (
						<div>
							<p>Tu mochila esta vacía actualmente</p>
							<p>Vaya y capture pokemon, papi</p>
						</div>
					)
				
			}
			</div>
        </div>
    );
};