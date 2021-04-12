import React from 'react';

//components
import CardLineChart from "./../components/card/CardLineChart.js";
import CardBarChart from "./../components/card/CardBarChart.js";
import HeaderStats from './../components/HeaderStats.js';

const DashboardAdmin = () => {
    return (
        <>
            <HeaderStats />
            <div className="flex flex-wrap">
                <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <CardLineChart />
                </div>
                <div className="w-full xl:w-4/12 px-4">
                <CardBarChart />
                </div>
            </div>
        </>
    );
}

export default DashboardAdmin;