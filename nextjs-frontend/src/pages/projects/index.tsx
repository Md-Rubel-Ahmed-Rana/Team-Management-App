import Projects from '@/components/pages/projects/ProjectPage';
import RootLayout from '@/layout/RootLayout';
import { NextPageWithLayout } from 'pages/_app';
import React, { ReactElement } from 'react';

const ProjectPage: NextPageWithLayout = () => {
    return (
        <div className='py-5'>
            <Projects />
        </div>
    );
};

export default ProjectPage;

ProjectPage.getLayout = function(page: ReactElement) {
    return <RootLayout>{page}</RootLayout>
}