import { useState } from "react";
import { onValue, ref, set,update } from "firebase/database";
import { Route, Routes } from "react-router-dom";

import { db } from "./firebase";

import "./App.css";
import Createcard from "./components/Createcard";
import Joincard from "./components/Joincard";
import Home from "./pages/Home";
function App() {

  return (
    // <>
    //   <div className="card w-96 bg-base-100 shadow-xl">
    //     <div className="card-body items-center text-center">
    //       {loading ? "l...oading":<button
    //         className="btn btn-primary"
    //         onClick={() => {
    //           getRoom();
    //         }}
    //       >
    //         { room ||"Find Room"}
    //       </button> }
          
    //       {newName ? (
    //         <h1>{newName}</h1>
    //       ) : (
    //         <button
    //           className="btn btn-primary"
    //           onClick={() => {
    //             // onOpenModal();
    //             if(room){
    //               onOpenModal();
    //             }
    //           }}
    //         >
    //           {newName || " Play!"}
    //         </button>
    //       )}

    //       <p>What do you choose?</p>
    //       <div className="card-actions">
    //         <button className="btn btn-primary">Rock</button>
    //         <button className="btn btn-primary">Paper</button>
    //         <button className="btn btn-primary">Scissor</button>
    //       </div>
    //     </div>
    //   </div>
    //   {/* Put this part before </body> tag */}
    //   <div className={open ? "modal modal-open" : " modal"}>
    //     <div className="modal-box">
    //       <h3 className="font-bold text-lg">Enter your Name {room}</h3>
    //       <input
    //         type="text"
    //         placeholder={name || "Type here"}
    //         onChange={(e) => {
    //           setName(e.target.value);
    //         }}
    //         className="input input-bordered w-full max-w-xs"
    //       />
    //       <div className="modal-action">
    //         <button
    //           onClick={() => {
    //             updateName();
    //           }}
    //           className="btn"
    //         >
    //           Close!
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </>
    < div className="rps" >
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/create" element={<Createcard />} />
        <Route exact path="/join" element={<Joincard />} />
      </Routes>
    </div>
  );
}

export default App;
