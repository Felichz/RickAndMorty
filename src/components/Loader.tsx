import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const Loader = () => {
    const override = `
        display: block;
        margin: 0 auto;
    `;
    return <PacmanLoader css={override} color={'#2bbbad'} />;
};

export default Loader;
