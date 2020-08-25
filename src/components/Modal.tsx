import React, { useEffect, useRef } from 'react';
import Loader from './Loader';

import './scss/Modal.scss';

interface ModalProps {
    title: string;
    image?: string;
    data?: object;
    onClose?: () => any;
}

const Modal: React.FC<ModalProps> = ({ title, image, data, onClose }) => {
    const div = document.createElement('div');
    const modalRef = useRef(div);

    useEffect(() => {
        const modal = M.Modal.init(modalRef.current, {
            onCloseEnd: onClose,
        });

        modal.open();
    }, [onClose]);

    return (
        <div className="modal" ref={modalRef}>
            {image && <img src={image} alt="modal" />}
            <div className="modal-content">
                <h4>{title}</h4>
                {data ? (
                    <table className="responsive-table">
                        <thead>
                            <tr>
                                {Object.entries(data).map(([k, v], i) => {
                                    if (v) return <th key={i}>{k}</th>;
                                    return null;
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                {Object.values(data).map((v: any, i) => {
                                    if (v) return <td key={i}>{v}</td>;
                                    return null;
                                })}
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <Loader />
                )}
            </div>
            <div className="modal-footer">
                <a
                    href="#!"
                    className="modal-close waves-effect waves-green btn-flat"
                >
                    Close
                </a>
            </div>
        </div>
    );
};

export default Modal;
