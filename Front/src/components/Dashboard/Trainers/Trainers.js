import React, { Component } from 'react'
import TrainerList from './TrainerList/TrainerList'
import DBService from '../../../services/DBService'
import './Trainers.css'
//import Popup from 'reactjs-popup'
//import AddTrainer from './AddTrainer/AddTrainer'

class Trainers extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trainers: []
        }
        this.getTrainers = this.getTrainers.bind(this)
        this.addTrainer = this.addTrainer.bind(this)
        this.editTrainer = this.editTrainer.bind(this)
        this.removeTrainer = this.removeTrainer.bind(this)
        this.updateUnlessError = this.updateUnlessError.bind(this)
        this.assignToTrener = this.assignToTrener.bind(this)
    }
    componentDidMount() {
        this.getTrainers()
    }

    updateUnlessError(res) {
        if(res.message === "OK") {
            this.getTrainers();
        } else {
            alert(res.message)
        }
    }

    getTrainers() {
        DBService.getTrainerList().then(res => {
            this.setState({
                trainers: res
            })
        })
    }

    assignToTrener(trainer, pokemon_id) {
        DBService.assignToTrainer(trainer, pokemon_id)
    }

    editTrainer(trainer) {
        DBService.updateTrainer(trainer)
            .then(res => this.updateUnlessError(res))
    }

    removeTrainer(id) {
        DBService.removeTrainer(id)
            .then(res => this.updateUnlessError(res))
    }

    addTrainer(trainer) {
        DBService.addTrainer(trainer)
            .then(res => this.updateUnlessError(res))
    }

/*
<Popup trigger={(<button className="trainers-button" style={{width: "100%", marginTop: "20px"}}>Dodaj Trenera</button>)} modal closeOnDocumentClick>
    { close => <AddTrainer addTrainerFun={this.addTrainer} closeModalFun={close}/> }
</Popup>
*/

    render() {
        return(
            <div style={{background: "#2ecc71", borderRadius: "40px", padding:"1rem"}}>
                <h4 style={{textAlign: "center", marginBottom: "20px"}}>Trenerzy</h4>
                <TrainerList list={this.state.trainers} editTrainerFun={this.editTrainer} removeTrainerFun={this.removeTrainer} assignToTrenerFun={this.assignToTrener}/>
                
            </div>
        )
    }
}

export default Trainers