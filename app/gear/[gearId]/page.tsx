import React from 'react';

const GearDetailsPage = async ({ params }: { params: Promise<{ gearId: string }>}) => {
    const { gearId } = await params;
    return (
        <div>
            GearDetails: { gearId }
        </div>
    );
};

export default GearDetailsPage;