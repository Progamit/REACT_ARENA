// import React from 'react';
// import {socket} from "../App";
//
// const Modal = ({index, setModal}) => {
//
//     function remove() {
//         socket.emit('delete', index)
//         setModal('dontShow')
//     }
//
//     return (
//         <div className="modalWrapper d-flex j-center a-center">
//
//             <div className="form">
//                 <div>Other user wants to delete {index+1} cell, you agree?</div>
//                 <div className="d-flex j-center mt50">
//                     <button className="mr-2" onClick={remove}>YES</button>
//                     <button onClick={() => setModal('dontShow')}>NO</button>
//                 </div>
//
//             </div>
//
//         </div>
//     );
// };
//
// export default Modal;