import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';

type Props = {
    children: React.ReactNode
}

const RootLayout = ({children}: Props) => {
    return (
        <div className="max-w-[1280px] w-full mx-auto">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default RootLayout;
