import React from 'react';

import { gql, useQuery } from '@apollo/client';
import Modal, { ModalProps } from '../components/Modal';

const GET_MODAL_DATA = gql`
    query GetModalData {
        modalData @client
    }
`;

interface Response {
    modalData: ModalProps;
}

export interface ModalWithDataProps {}

const ModalWithData: React.FC<ModalWithDataProps> = () => {
    const { data } = useQuery<Response>(GET_MODAL_DATA);

    // if (data && Object.keys(data.modalData).length) {
    //     return <Modal {...data.modalData} key={data.modalData.title} />;
    // } else {
    //     return null;
    // }

    return <Modal {...data?.modalData} />;
};

export default ModalWithData;
