import {Link, useNavigate} from 'react-router-dom';

const RecoveryPassword = () => {

    let navigate = useNavigate();

    const handleRecovery = () => {
        navigate('/');
    }

    return(
        <div className="body-form">
            <div className="login-form">
                <h2>Recuperar contraseña</h2>
                <form action="">
                    <div>
                        <label htmlFor="">Ingresa tu correo electronico</label>
                        <input type="text" placeholder='Correo electronico' />
                    </div>

                    <button className="btn btn-primary" type="button" onClick={handleRecovery}>
                        Recuperar contraseña
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RecoveryPassword;