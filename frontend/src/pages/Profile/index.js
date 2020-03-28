import React, { useState, useEffect } from 'react'; /**useEffect para consultar api sem chamada do usuario */
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";
import './styles.css';
import api from "../../services/api";
import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    // console.log(incidents);

    const history = useHistory();
    const ongId = localStorage.getItem("ongId");
    const ongName = localStorage.getItem("ongName");

    /**Primeiro qual função vai ser executada, 
     * segundo, quando vai ser executada
     */
    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setIncidents(response.data.incidents);
            console.log(incidents);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
            //  toast.success("Deletado com Sucesso!", {
            // position: toast.POSITION.TOP_RIGHT
            // });
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente!');
            // toast.error("Erro ao deletar!", {
            //position: toast.POSITION.TOP_RIGHT
            // });
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (

        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {/* {incidents.map(incident => ( */}
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>
                            {Intl.NumberFormat("pt-br", {
                                style: "currency",
                                currency: "BRL"
                            }).format(incident.value)}
                        </p>

                        <button
                            type="button"
                            onClick={() => handleDeleteIncident(incident.id)}
                        >
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}