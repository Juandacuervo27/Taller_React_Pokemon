import React from "react";
import { usePokemonContext } from "../context/PokemonContext";

export const InventarioPokemon: React.FC = () => {
    const { EntrenadorActivo, MochilaActual, actualizarFavorito, eliminarpokemon } = usePokemonContext();

    if (!EntrenadorActivo) {
        return (
			<section className="page-section empty-state">
				<span className="panel-kicker">INVENTORY OFFLINE</span>
				<h2>No hay entrenadores</h2>
                <p>Debes registrar un entrenador activo o registre un entrenador.</p>
			</section>
        );
    }

    return (
		<section className="page-section inventory-page">
			<div className="inventory-heading">
				<div>
					<span className="panel-kicker">02 / TRAINER INVENTORY</span>
					<h2>Inventario de {EntrenadorActivo.nombreCompleto}</h2>
				</div>
				<span className="inventory-count">{MochilaActual.length} CAPTURAS</span>
			</div>

			<div className="grid-mochila">
				{MochilaActual.length > 0 ? (
					MochilaActual.map((poke, index) => (
						<article key={poke.id} className={`tarjeta-item ${poke.esFavorito ? 'tarjeta-favorita' : ''}`}>
							<span className="card-index">#{String(index + 1).padStart(2, '0')} / {MochilaActual.length}</span>
							<img src={poke.image} alt={poke.name} />
							<h3>{poke.name}</h3>
							<p className={`type-label type-${poke.type}`}>{poke.type}</p>
							<div className="panel-botones">
								<button className={`btn-fav ${poke.esFavorito ? 'fav-activo' : ''}`} onClick={() => actualizarFavorito(poke.id)}>
									{poke.esFavorito ? '★ Favorito' : '☆ Favorito'}
								</button>
								<button type="button" className="btn-eliminar" onClick={() => eliminarpokemon(poke.id)}>
									Liberar
								</button>
							</div>
						</article>
					))) : (
						<div className="empty-state inventory-empty">
							<span className="empty-mark">＋</span>
							<h3>Tu mochila está vacía</h3>
							<p>Visita el buscador para registrar tu primera captura.</p>
						</div>
					)
				}
			</div>
		</section>
    );
};