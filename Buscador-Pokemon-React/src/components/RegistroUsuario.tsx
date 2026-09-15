import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonContext, type Usuario } from '../context/PokemonContext';
export const RegistroUsuario = () => {
    const { registrarEntrenador } = usePokemonContext();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDoc, setTipoDoc] = useState('CC');
    const [ pais, setPais] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [dni, setDni] = useState('');
        const [telefono, setTelefono] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [correo, setCorreo] = useState('');
    const [datosPersonales, setDatosPersonales] = useState(false);
    const eventoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!datosPersonales) {
            alert('Debe aceptar el tratamiento de datos personales');
            return;
        }

        const nuevo: Usuario = {
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
            <header>
                <h2> Registro de Entrenadores</h2>
            </header>

            <div>
                <form onSubmit={eventoSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required placeholder="Tu nombre" autoComplete="given-name" autoFocus />
                    </div>
                    <div className="form-group">
                        <label htmlFor="apellido">Apellido</label>
                        <input type="text" id="apellido" name="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required placeholder="Tu apellido" autoComplete="family-name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipoDoc">Tipo de documento</label>
                        <select id="tipoDoc" name="tipo_doc" value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)} required>
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="TI">Tarjeta de Identidad</option>
                            <option value="Pasaporte">Pasaporte</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dni">Número de Documento (DNI)</label>
                        <input type="text" id="dni" name="dni" value={dni} onChange={(e) => setDni(e.target.value)} required placeholder="Número de identificación" pattern="[0-9]{6,12}" title="Ingrese únicamente números (entre 6 y 12 dígitos)" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} required min="1920-01-01" max="2026-12-31" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Número de teléfono</label>
                        <input type="tel" id="telefono" name="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required placeholder="+57 300 000 0000" autoComplete="tel" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="correo">Correo electrónico</label>
                        <input type="email" id="correo" name="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required placeholder="ejemplo@correo.com" autoComplete="email" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="pais">País de domicilio</label>
                        <select id="pais" name="pais" value={pais} onChange={(e) => setPais(e.target.value)} required>
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="169">Colombia</option>
                            <option value="249">Estados Unidos</option>
                            <option value="245">España</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad de domicilio</label>
                        <select id="ciudad" name="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required>
                            <option value="" disabled>Seleccione una opción</option>
                            <option value="11001">Bogotá, D.C.</option>
                            <option value="05001">Medellín</option>
                            <option value="76001">Cali</option>
                            <option value="08001">Barranquilla</option>
                            <option value="13001">Cartagena</option>
                        </select>
                    </div>

                    <div className="form-group consent-group">
                        <label className="checkbox-container">
                            <input type="checkbox" id="datosPersonales" name="tratamiento_datos" checked={datosPersonales} onChange={(e) => setDatosPersonales(e.target.checked)} required />
                            <span>Acepto la política de <a href="#" className="link-policy">tratamiento de datos personales</a>.</span>
                        </label>
                    </div>

                    <button type="submit" className="btn-submit">Enviar mensaje</button>
                </form>
            </div>
        </div>
    );

}

