import {  Routes ,Route } from 'react-router-dom';
import Home from '../pages/home';
import Teacher from '../pages/Teacher';
import Position from '../pages/Position';
import NotFound from '../pages/404Page';
import React from 'react';

const RootClass = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} >
            <Route path="/teacher" element={<Teacher/>} />
            <Route path="/position" element={<Position/>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          
        </Routes>
    );
}

export default RootClass;