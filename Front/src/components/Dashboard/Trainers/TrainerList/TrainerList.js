import React from 'react'
import Popup from "reactjs-popup"
import TrainerDetails from "./TrainerDetails"
import EditTrainer from "./EditTrainer"


const TrainerList = ({list, editTrainerFun, removeTrainerFun}) => {
    const _list = list.length ? (
        list.map((trainer) => {
            return(
                <div key={trainer.id} style={{background: "#27ae60", borderRadius: "40px", paddingLeft: "1rem", marginBottom: "5px", color: "white"}}>
                
                <Popup trigger={(<span className="trainers_name">{trainer.name}</span>)} modal closeOnDocumentClick>
                    <TrainerDetails trainer={trainer}/>
                </Popup>
                <Popup trigger={<button className="trainers-button" style={{float: "right", fontSize: "0.8rem"}}>edytuj</button>} modal closeOnDocumentClick>
                    { close => <EditTrainer trainer={trainer} editTrainerFun={editTrainerFun} removeTrainerFun={removeTrainerFun} closeModalFun={close}/> }
                </Popup>
                
                </div>
            )
        })
    ) : (
        <p>W bazie danych nie ma żadnych trenerów albo wczytywanie trwa wyjątkowo długo</p>
    )
    
    return(
        <div>
            {_list}
        </div>
    )
}

export default TrainerList