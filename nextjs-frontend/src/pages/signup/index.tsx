import Signup from '@/components/pages/Signup/Signup';
import RootLayout from '@/layout/RootLayout';
import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';

const SignupPage: NextPageWithLayout = () => {
    return (
        <div>
            <Signup />
        </div>
    );
};

export default SignupPage;

SignupPage.getLayout = function(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>
}