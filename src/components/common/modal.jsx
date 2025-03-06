import React from "react";
import "../../styles/global.css";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <div className="modal-body">{children}</div>
                <div className="row">
                    <button className="btn btn-info" onClick={onClose}>
                        Aceptar
                    </button>
                    <button className="btn btn-danger" onClick={onClose}>
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;