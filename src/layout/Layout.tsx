import React from 'react';
import SideNav from '../components/SideNav';

import './scss/Layout.scss';
import 'materialize-css/sass/materialize.scss';

const Layout: React.FC = ({ children }) => (
    <>
        <SideNav />
        <section id="layout-content">{children}</section>
    </>
);

export default Layout;
