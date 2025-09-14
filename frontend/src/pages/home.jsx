import React from "react";
import { Outlet, useLocation } from "react-router";
import Headers from "../components/Header";
import NavBar from "../components/Navbar";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const Home = () => {
    return (
        <div className="font-be  ">
        <div >
            <div>
                <Headers />
            </div>
            <div >
                <NavBar />
            </div>

        </div>
        <div className="bg-[#f3f3f3] h-[100vw] z-20">

            <Outlet />
        </div>
        {/* <ToastContainer /> */}
    </div>
    );
}

export default Home;