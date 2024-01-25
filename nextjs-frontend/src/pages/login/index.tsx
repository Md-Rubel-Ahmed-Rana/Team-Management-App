import Login from '@/components/pages/login/Login';
import RootLayout from '@/layout/RootLayout';
import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';

const LoginPage: NextPageWithLayout = () => {
    return (
        <div>
            <Login />
        </div>
    );
};

export default LoginPage;

LoginPage.getLayout = function(page: ReactElement){
    return <RootLayout>{page}</RootLayout>
}