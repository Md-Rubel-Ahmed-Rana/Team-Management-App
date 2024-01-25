import Dashboard from '@/components/pages/dashboard/Dashboard';
import RootLayout from '@/layout/RootLayout';
import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';

const DashboardPage: NextPageWithLayout = () => {
    return (
        <div className='py-5'>
            <Dashboard />
        </div>
    );
};

export default DashboardPage;

DashboardPage.getLayout = function (page: ReactElement){
    return <RootLayout>{page}</RootLayout>
}