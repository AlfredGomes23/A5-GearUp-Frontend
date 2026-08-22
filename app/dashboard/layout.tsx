import React from 'react';

const DashboardLayout = ({children}: { children: React.ReactNode}) => {
    return (
        <div>
            Dashboard Layout
            {children}
            
        </div>
    );
};

export default DashboardLayout;