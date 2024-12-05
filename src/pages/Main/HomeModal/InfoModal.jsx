import React from "react";
import "./InfoModal.css";

const InfoModal = ({ isOpen, onClose, title, description, image }) => {
    if (!isOpen) return null;

    return (
        <div className="info-modal-overlay" onClick={onClose}>
            <div
                className="info-modal"
                onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 차단
            >
                <div className="info-modal-content">
                    {image && <img src={image} className="info-modal-image" alt="Modal" />}
                    {title && <h2>{title}</h2>}
                    {description && <p>{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
