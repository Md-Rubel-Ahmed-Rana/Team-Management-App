import TeamDetailsPage from '@/components/pages/teams/showTeam/TeamDetailsPage';
import RootLayout from '@/layout/RootLayout';
import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';

const TeamDetails: NextPageWithLayout = () => {
    return (
        <div className='py-5'>
            <TeamDetailsPage />
        </div>
    );
};

export default TeamDetails;

TeamDetails.getLayout = function (page: ReactElement){
    return <RootLayout>{page}</RootLayout>
}