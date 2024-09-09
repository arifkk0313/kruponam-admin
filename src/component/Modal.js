// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, imageSrc }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <span style={closeButtonStyle} onClick={onClose}>&times;</span>
                <img src={imageSrc} alt="Proof" style={{ width: '100%', height: 'auto' }} />
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '80%',
    overflow: 'auto',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '24px',
    cursor: 'pointer',
};

export default Modal;
