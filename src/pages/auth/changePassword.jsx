import React, { useState } from "react";
import { Link } from "react-router-dom";

const ChangePassword = () => {
    const [step, setStep] = useState(1); // Controla la vista
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Simulación de validación (en un entorno real, se enviaría al backend)
    const validateCurrentPassword = () => {
        if (currentPassword === "123456") { // Reemplazar con una llamada al backend
            setStep(2); // Avanza al siguiente formulario
        } else {
            alert("Contraseña incorrecta");
        }
    };

    const changePassword = () => {
        if (newPassword !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        alert("Contraseña cambiada con éxito"); // Enviar al backend
    };

    return (
        <div className="container">
            {step === 1 && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="breadcrumb">
                            <p>
                                <Link to="/dashboard/settings" className="breadcrumb-link">Configuración</Link> / Verificar contraseña
                            </p>
                        </div>
                        <h1 className="title">Verifica tu identidad</h1>
                        <div className="form-group">
                            <input
                                type="password"
                                placeholder="Contraseña actual"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <button className="btn btn-primary" onClick={validateCurrentPassword}>Verificar</button>
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="row">
                    <div className="col-md-6">
                        <div className="breadcrumb">
                            <p>
                                <Link to="/dashboard/settings" className="breadcrumb-link">Configuración</Link> / Cambiar contraseña
                            </p>
                        </div>
                        <h1 className="title">Cambiar contraseña</h1>
                        <div className="form-group">
                            <div>
                                <input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    placeholder="Confirmar nueva contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={changePassword}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangePassword;
