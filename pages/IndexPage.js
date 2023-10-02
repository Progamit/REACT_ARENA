// import React, {useEffect, useRef, useState} from 'react';
// import {useDispatch, useSelector} from "react-redux";
// import {setData, setError} from "../features/user";
// import {useNavigate} from "react-router-dom";
// import {socket} from "../App";
//
// const IndexPage = () => {
//
//     const nav = useNavigate()
//     const nameRef = useRef()
//     const imageRef = useRef()
//
//
//     function login() {
//         const user = {
//             username: nameRef.current.value,
//             image: imageRef.current.value
//         }
//
//         socket.emit("login", user)
//         nav('/game')
//     }
//
//     return (
//         <div className="d-flex flex-column">
//
//             <input type="text" ref={nameRef} placeholder="Username"/>
//             <input type="text" ref={imageRef} placeholder="User image"/>
//             <button onClick={login}>Login</button>
//
//         </div>
//
//     );
// };
//
// export default IndexPage;