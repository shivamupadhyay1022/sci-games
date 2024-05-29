import { useState } from "react";
import { onValue, ref, set, update } from "firebase/database";
import { db } from "../firebase";
import React from "react";
let array = ["room1", "room2"];

function Createcard() {
  const [Name, setName] = useState();
  const [newName, setNewName] = useState();
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [data, setData] = useState([]);
   const [room, setRoom] = useState(null);
  const [tempChoice, setTempchoice] = useState();
  const [none, setnone] = useState(false);

  const [loading, setloading] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // find vacant room
  async function getRoom() {
    setloading(true);
    for (let index = 0; index < array.length; index++) {
      const path = ref(db, "rps/" + array[index]);
      if (path) {
        await onValue(
          path,
          (snapshot) => {
            if (snapshot) {
              const retrievedData = snapshot.val();
              setData(retrievedData);
              console.log(retrievedData);
              if (retrievedData.player1.name == "null") {
                 setRoom(retrievedData.id);
                console.log(retrievedData.id);
                setnone(false);
                setloading(false);
                return
              }else{
                setnone(true)
                setloading(false)
              }
              return
            }
            return
          },
          (error) => {
            console.error("Error fetching data:", error);
          }
        );
        return
      }
      break
    }
  }

  async function checkroom() {
    console.log(data);
  }
  async function onSubmit() {
    const path = ref(db, "rps/" + room);
    if (path) {
      await onValue(
        path,
        (snapshot) => {
          if (snapshot) {
            const retrievedData = snapshot.val();
            setNewName(retrievedData.name);
          }
        },
        (error) => {
          console.error("Error fetching data:", error);
        }
      );
    }
  }

  //if room empty set name
  async function updateName() {
    const path = ref(db, `rps/${room}/player1`);
    console.log(path);
    if (path) {
      console.log("into");
      update(path, {
        name: Name,
      })
        .then(async (e) => {
          await setNewName(Name);
          console.log("succes");
          onCloseModal();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  async function choose(choice) {
    const path = ref(db, `rps/${room}/player1`);
    console.log(path);
    if (path) {
      console.log("into");
      update(path, {
        choice: choice,
      })
        .then(async (e) => {
          await setTempchoice(choice);
          console.log("succes");
          onCloseModal();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  return (
    <div className=" flex  justify-center items-center w-full h-[100vh]">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          {loading ? (
            "loading..."
          ) : (
            <>
              {none ? 
              <>{room ? "Room ID: "+ room : "No Room Vacant" }</>
              
              
               : <>
               <button
                 className="btn btn-primary"
                 onClick={() => {
                   getRoom();
                 }}
               >
                 {room ? "Room ID:" + room : "Find Room"}
               </button>
             </>}
            </>
          )}

          {newName ? (
            <h1>{newName}</h1>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                // onOpenModal();
                if (room) {
                  onOpenModal();
                }
              }}
            >
              {newName || " Play!"}
            </button>
          )}

          <p>What do you choose?</p>
          <div className="card-actions">
            <button onClick={() => choose("rock")} className="btn btn-primary">
              Rock
            </button>
            <button onClick={() => choose("paper")} className="btn btn-primary">
              Paper
            </button>
            <button
              onClick={() => choose("scissor")}
              className="btn btn-primary"
            >
              Scissor
            </button>
          </div>
        </div>
      </div>
      {/* Put this part before </body> tag */}
      <div className={open ? "modal modal-open" : " modal"}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Enter your Name {room}</h3>
          <input
            type="text"
            placeholder={name || "Type here"}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="input input-bordered w-full max-w-xs"
          />
          <div className="modal-action">
            <button
              onClick={() => {
                updateName();
              }}
              className="btn"
            >
              Close!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createcard;
