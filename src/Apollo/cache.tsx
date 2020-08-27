import { InMemoryCache, makeVar } from '@apollo/client';
import { ModalProps } from '../components/Modal';

export const modalDataVar = makeVar<ModalProps & { rand?: number }>({});

export default new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                modalData: {
                    read() {
                        return { ...modalDataVar(), r: Math.random() };
                    },
                },
            },
        },
    },
});
