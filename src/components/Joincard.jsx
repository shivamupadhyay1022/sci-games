import React from 'react'
import { useState, useEffect } from "react";
import { onValue, ref, set,update } from "firebase/database";
import { db } from '../firebase';
let array = ["room1", "room2"];

function Joincard() {
    const [Name, setName] = useState();
    const [newName, setNewName] = useState();
    const [tempChoice, setTempchoice] = useState();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const [data, setData] = useState([]);
    const [room, setRoom] = useState();
    const [loading, setloading] = useState(false);
    const [oppchoice, setOppchoice] = useState();
    const [status, setStatus] = useState();

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    

    // find vacant room
    async function getRoom() {
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
                if (retrievedData.player2.name == "null") {
                  console.log(retrievedData.id);
                  setRoom(retrievedData.id);
                }
                // checkroom();
              }
            },
            (error) => {
              console.error("Error fetching data:", error);
            }
          );
        }
  
      }
    }
  

    //if room empty set name
    async function updateName() {
      const path = ref(db, `rps/${room}/player2`);
      console.log(path);
        if (path) {
          console.log("into")
          update(path, {
            name:Name
          }).then(async (e)=>{
            await setNewName(Name);
            console.log("succes")
            onCloseModal();
          }).catch((e)=>{
            console.log(e);
          });
        }
      
    }

    async function choose(choice) {
        const path = ref(db, `rps/${room}/player2`);
      console.log(path);
        if (path) {
          console.log("into")
          update(path, {
            choice:choice
          }).then(async (e)=>{
            await setTempchoice(choice);
            console.log("succes")
          }).catch((e)=>{
            console.log(e);
          });
        }
    }

    const fetchData = async () => {
        const dataRef = ref(db, `rps/${room}/player1`); // Replace with your reference
        // dataRef.orderByChild('nestedObject.subject').equalTo('Chemistry')
        if (dataRef) {
          onValue(
            dataRef,
            (snapshot) => {
              if (snapshot) {
                const retrievedData = snapshot.val();
                console.log(retrievedData.choice)
                setOppchoice(retrievedData.choice);
                setStat();
              }
            },
            (error) => {
              console.error("Error fetching data:", error);
            }
          );
      }
    }

    async function setStat() {
        if (tempChoice === oppchoice)
            setStatus("tie")

        else if (tempChoice === "paper" && oppchoice === "rock")
            setStatus("win")

        else if (tempChoice === "rock" && oppchoice === "scissors")
            setStatus("win")

        else if (tempChoice === "scissors" && oppchoice === "paper")
            setStatus("win")
        else
        setStatus("loose")
    }

    async function comparedata() {
        
    }

    useEffect(() => {
        fetchData()
          .then((e) => {
            comparedata();
            console.log(Object.values(data));
          })
          .catch((e) => {
            console.log(e);
          });
      });
    
  
    return (
      <>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            {loading ? "l...oading":<button
              className="btn btn-primary"
              onClick={() => {
                getRoom();
              }}
            >
              { room ||"Find Room"}
            </button> }
            
            {newName ? (
              <h1>{newName}</h1>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  // onOpenModal();
                  if(room){
                    onOpenModal();
                  }
                }}
              >
                {newName || " Play!"}
              </button>
            )}
  
            <p>What do you choose?</p>
            <div className="card-actions">
              <button onClick={() => choose("rock")} className="btn btn-primary">Rock</button>
              <button onClick={ () =>choose("paper")} className="btn btn-primary">Paper</button>
              <button onClick={() => choose("scissor")} className="btn btn-primary">Scissor</button>
            </div>
            <h1>status: {status}</h1>

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
      </>
    );
}

export default Joincard