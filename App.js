import React, { useState, useEffect } from 'react';
import Game from './components/Game.js';
import AdminPanel from './components/AdminPanel';
import WelcomePage from './pages/WelcomePage';
import DB from './components/util';

export default function App() {
    const [loggedUser, setLoggedUser] = useState({});
    const [shouldGameBegin, setShouldGameBegin] = useState(false);
    const [shouldEnterAdminPanel, setShouldEnterAdminPanel] = useState(false);

    // Login panel states
    const [loginOn, setloginOn] = useState(false);
    const [currentLoginValue, setCurrentLoginValue] = useState({
        name: '',
        password: '',
    });
    // Register panel states
    const [registerOn, setRegisterOn] = useState(false);
    const [currentRegisterValue, setCurrentRegisterValue] = useState({
        name: '',
        password: '',
        confirmPassword: '',
    });

    const [worlds, setWorlds] = useState([]);
    const [heroes, setHeroes] = useState([]);
    useEffect(() => {
        loadObjects();
    }, []);

    const loadObjects = async () => {
        const worldsResponse = await DB.getWorlds();
        const loadedWorlds = worldsResponse.worlds.map((world) => ({
            id: world.id,
            name: world.name,
            worldOrigin: world.world_origin,
            logoUrl: world.logo_url,
        }));
        const heroesResponse = await DB.getHeroes();
        const loadedHeroes = heroesResponse.heroes.map((hero) => ({
            id: hero.id,
            worldId: hero.world_id,
            name: hero.name,
            type: hero.type,
            strengths: hero.strengths,
            weakness: hero.weakness,
            power: hero.power_level,
            image: hero.image_url,
            avatarImage: hero.arena_avatar_url,
        }));
        setWorlds(loadedWorlds);
        setHeroes(loadedHeroes);
    };

    const submitLogin = async (e) => {
        e.preventDefault();
        const loginResponse = await DB.logIn(currentLoginValue);
        if (loginResponse.user) {
            setLoggedUser({ name: loginResponse.user });
            setShouldEnterAdminPanel(true);
            setloginOn(false);
        } else if (loginResponse.response) alert(loginResponse.response);
        setCurrentLoginValue({
            name: '',
            password: '',
        });
    };

    const submitRegister = async (e) => {
        e.preventDefault();
        const registerResponse = await DB.register(currentRegisterValue);
        setRegisterOn(false);
        alert(registerResponse);
        setCurrentRegisterValue({
            name: '',
            password: '',
            confirmPassword: '',
        });
    };

    const logOut = () => {
        setLoggedUser({});
        setShouldEnterAdminPanel(false);
    };


    const addInstance = async (type, objectToAdd) => {
        const response = await DB.addToDB(type, objectToAdd);
        if (type === 'world') {

            if (typeof response === 'object') {
                const createdWorld = {
                    id: response.world.id,
                    name: response.world.name,
                    worldOrigin: response.world.world_origin,
                    logoUrl: response.world.logo_url,
                };
                setWorlds((prev) => [...prev, createdWorld]);
                return `Created world #${response.world.id}: ${response.world.name}.`;
            }
            else return response;
        } else if (type === 'hero') {

            if (typeof response === 'object') {
                const createdHero = {
                    id: response.hero.id,
                    worldId: response.hero.world_id,
                    name: response.hero.name,
                    type: response.hero.type,
                    strengths: response.hero.strengths,
                    weakness: response.hero.weakness,
                    power: response.hero.power_level,
                    image: response.hero.image_url,
                    avatarImage: response.hero.arena_avatar_url,
                };
                setHeroes((prev) => [...prev, createdHero]);
                return `Created hero #${response.hero.id}: ${response.hero.name}.`;
            }
            else return response;
        } else return `Wrong object type: ${type}`;
    };

    const updateInstance = async (type, updatedObjectData) => {

        const noChangesMessage = `You haven't changed anything at all!`;

        if (type === 'world') {
            const worldToBeUpdated = worlds.find(
                (world) => world.id === updatedObjectData.id
            );
            if (
                worldToBeUpdated.name === updatedObjectData.name &&
                worldToBeUpdated.worldOrigin === updatedObjectData.world_origin &&
                worldToBeUpdated.logoUrl === updatedObjectData.logo_url
            )
                return noChangesMessage;
        }
        if (type === 'hero') {
            const heroToBeUpdated = heroes.find(
                (hero) => hero.id === updatedObjectData.id
            );
            if (
                heroToBeUpdated.name === updatedObjectData.name &&
                heroToBeUpdated.worldId === updatedObjectData.world_id &&
                heroToBeUpdated.type === updatedObjectData.type &&
                heroToBeUpdated.strengths === updatedObjectData.strengths &&
                heroToBeUpdated.weakness === updatedObjectData.weakness &&
                heroToBeUpdated.power === updatedObjectData.power_level &&
                heroToBeUpdated.image === updatedObjectData.image_url &&
                heroToBeUpdated.avatarImage === updatedObjectData.arena_avatar_url
            )
                return noChangesMessage;
        }

        const response = await DB.updateInDB(type, updatedObjectData);
        if (type === 'world') {

            if (typeof response === 'object') {

                const updatedWorlds = worlds;
                updatedWorlds[
                    updatedWorlds.findIndex((world) => world.id === response.world.id)
                    ] = {
                    id: response.world.id,
                    name: response.world.name,
                    worldOrigin: response.world.world_origin,
                    logoUrl: response.world.logo_url,
                };
                setWorlds(updatedWorlds);
                return `Updated world #${response.world.id}`;
            }
            else return response;
        } else if (type === 'hero') {

            if (typeof response === 'object') {

                const updatedHeroes = heroes;
                updatedHeroes[
                    updatedHeroes.findIndex((hero) => hero.id === response.hero.id)
                    ] = {
                    id: response.hero.id,
                    worldId: response.hero.world_id,
                    name: response.hero.name,
                    type: response.hero.type,
                    strengths: response.hero.strengths,
                    weakness: response.hero.weakness,
                    power: response.hero.power_level,
                    image: response.hero.image_url,
                    avatarImage: response.hero.arena_avatar_url,
                };
                setHeroes(updatedHeroes);
                return `Updated hero #${response.hero.id}`;
            }
            else return response;
        } else return `Wrong object type: ${type}`;
    };


    const deleteInstance = async (type, objectToDelete) => {
        const response = await DB.deleteFromDB(type, objectToDelete);

        if (type === 'world') {

            const worldsAfterDelete = worlds.filter((world) => world.id !== response);
            setWorlds(worldsAfterDelete);

            return typeof response === 'number'
                ? `Deleted world #${response}`
                : response;
        } else if (type === 'hero') {

            const heroesAfterDelete = heroes.filter((hero) => hero.id !== response);
            setHeroes(heroesAfterDelete);
            return `Deleted hero #${response}`;
        } else return `Wrong object type: ${type}`;
    };

    const startGame = () => setShouldGameBegin(true);

    const enterAdminPanel = () => setShouldEnterAdminPanel(true);

    const backToWelcomePage = () => {
        setShouldGameBegin(false);
        setShouldEnterAdminPanel(false);
    };


    if (shouldGameBegin)
        return (
            <Game
                backToWelcomePage={backToWelcomePage}
                heroes={heroes}
                worlds={worlds}
            />
        );

    else if (shouldEnterAdminPanel) {
        return (
            <AdminPanel
                addInstance={addInstance}
                updateInstance={updateInstance}
                deleteInstance={deleteInstance}
                logOut={logOut}
                startGame={startGame}
                heroes={heroes}
                worlds={worlds}
            />
        );
    }
    else
        return (
            <WelcomePage
                loginOn={loginOn}
                setloginOn={setloginOn}
                currentLoginValue={currentLoginValue}
                setCurrentLoginValue={setCurrentLoginValue}
                submitLogin={submitLogin}
                registerOn={registerOn}
                setRegisterOn={setRegisterOn}
                currentRegisterValue={currentRegisterValue}
                setCurrentRegisterValue={setCurrentRegisterValue}
                submitRegister={submitRegister}
                loggedUser={loggedUser}
                enterAdmin={enterAdminPanel}
                startGame={startGame}
            />
        );
}
export default App;
//
//
// import './App.css';
// import { io } from 'socket.io-client';
// import {useEffect, useRef, useState} from "react";
// import {BrowserRouter, Routes, Route} from "react-router-dom";
// import IndexPage from "./pages/IndexPage";
// import GamePage from "./pages/GamePage";
// import {useDispatch} from "react-redux";
// import {setGameMap} from "./features/user";
// import Modal from "./components/Modal";
//
// export const socket = io("http://localhost:3001", {
//     autoConnect: true
// });
//
// function App() {
//
//     const disp = useDispatch()
//
//     const [modal, setModal] = useState('dontShow')
//
//     useEffect(() => {
//         socket.on('sendMap', data => {
//             console.log(data)
//             disp(setGameMap(data))
//         })
//
//         socket.on("request", index => {
//             setModal(index)
//             console.log("request to delete cell: " + index)
//         })
//
//     }, [])
//
//
//     return (
//         <div className="main p50">
//
//             {modal !== 'dontShow' && <Modal setModal={setModal} index={modal}/>}
//
//             <BrowserRouter>
//
//                 <Routes>
//                     <Route path="/" element={<IndexPage/>}/>
//                     <Route path="/game" element={<GamePage/>}/>
//                 </Routes>
//
//
//             </BrowserRouter>
//
//         </div>
//
//     );
// }
//
// export default App;
