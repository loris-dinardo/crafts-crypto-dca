import React from 'react'
import {Header} from "./ui/components/Header";
import {NotFound} from "./pages/not-found/NotFound";
import {Strategies} from "./pages/strategies/Strategies";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

export const App: React.FC = () => {
    return (
        <>
            <Header/>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={<Navigate to="/strategies"/>}/>
                    <Route path={"/strategies"} element={<Strategies/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
};

