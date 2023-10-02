// import React from 'react';
// import {socket} from "../App";
//
// const SingleCell = ({index, item}) => {
//
//
//     function select() {
//         socket.emit('selectCell', index)
//     }
//
//     function remove() {
//         socket.emit('delete', index)
//     }
//
//     return (
//         <div className="cell">
//             <div onClick={select} className="imageWrapper">
//                 {item.image &&<div>
//                     <img src={item.image} alt=""/>
//                 </div>}
//             </div>
//             {item.image && <div className="deleteBtn" onClick={remove}> Delete ❌</div>}
//         </div>
//
//     );
// };
//
// export default SingleCell;