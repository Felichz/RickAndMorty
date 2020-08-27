import React, { useEffect, useRef, useState, RefObject } from 'react';
import Loader from './Loader';

import './scss/Modal.scss';
export interface ModalProps {
    loading?: boolean;
    title?: string;
    image?: string;
    tableData?: {}; // Represents table items in a key / value format
    collectionItems?: {
        title: string;
        items: JSX.Element[];
    };
    closeButton?: JSX.Element;
    onCloseStart?: () => any;
    onCloseEnd?: () => any;
}

const Modal: React.FC<ModalProps> = ({
    loading,
    title,
    image,
    tableData,
    collectionItems,
    closeButton,
}) => {
    const modalRef = useRef() as RefObject<HTMLDivElement>;

    console.log('Render Modal');
    // console.group('Render');
    // console.log(`Loading is ${loading}`);
    // console.log('       ', closeButton);

    const [modal, setModal] = useState<M.Modal | null>();

    useEffect(() => {
        // console.group('useEffect');
        if (modalRef.current) {
            // console.log('init Modal');
            const newModal = M.Modal.init(modalRef.current, {
                onCloseStart() {
                    document.body.style.overflow = 'initial';
                },
                // inDuration: loading ? 250 : 0,
            });
            setModal(newModal);
        } else {
            // console.log('modalRef not ready');
        }
        // console.groupEnd();
    }, [modalRef]);

    useEffect(() => {
        // console.group('Loading check effect');
        if (modal) {
            if (loading !== undefined) {
                if (loading) {
                    // console.log(
                    //     'Loading is true, showing modal with transition effect'
                    // );
                    modal.options.inDuration = 250;
                    modal.open();
                } else {
                    // console.log('Loading is false, showing modal immediately');
                    modal.options.inDuration = 0;
                    modal.open();
                }
            } else {
                // console.log("There isn't a loading prop.");
            }
        } else {
            // console.log('Modal is not ready');
        }
        // console.groupEnd();
    }, [modal, loading]);

    // console.groupEnd();

    return (
        <div>
            <div className="modal" ref={modalRef}>
                {image && <img src={image} alt="modal" />}
                <div className="modal-content">
                    <h4>{title}</h4>
                    {tableData ? (
                        <>
                            <table className="responsive-table">
                                <thead>
                                    <tr>
                                        {Object.entries(tableData).map(
                                            ([k, v], i) => {
                                                if (v)
                                                    return <th key={i}>{k}</th>;
                                                return null;
                                            }
                                        )}
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        {Object.values(tableData).map(
                                            (v: any, i) => {
                                                if (v)
                                                    return <td key={i}>{v}</td>;
                                                return null;
                                            }
                                        )}
                                    </tr>
                                </tbody>
                            </table>

                            {collectionItems && (
                                <div className="collection">
                                    <li className="collection-header">
                                        <h5>{collectionItems.title}</h5>
                                    </li>
                                    {collectionItems.items}
                                </div>
                            )}
                        </>
                    ) : (
                        <Loader />
                    )}
                </div>
                <div className="modal-footer">
                    {closeButton ? (
                        closeButton
                    ) : (
                        <button className="modal-close waves-effect waves-green btn-flat">
                            Close
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;
