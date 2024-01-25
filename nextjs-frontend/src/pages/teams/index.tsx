import Teams from '@/components/pages/teams/showTeam/TeamPage';
import RootLayout from '@/layout/RootLayout';
import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';

const TeamPage: NextPageWithLayout = () => {
    return (
        <div>
            <Teams />
        </div>
    );
};

export default TeamPage;

TeamPage.getLayout = function (page: ReactElement) {
    return <RootLayout>{page}</RootLayout>
}