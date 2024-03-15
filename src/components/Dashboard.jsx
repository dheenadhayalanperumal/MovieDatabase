import React from "react";
import Slider1 from "./Slider1";
import Trend from "./Trend";
import PopularMov from "./PopularMov";
import NowPlay from "./NowPlaying";

const Dashboard = () => {
    return (
        <div>
        <Slider1 />
        <Trend />
        <NowPlay />
        <PopularMov />
        </div>
    );
    }
export default Dashboard;
