import React, { Component } from 'react'

class EditTrainer extends Component {
    constructor(params) {
        super(params)
        this.state = {
            id: params.trainer.id,
            name: params.trainer.name
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.removeTrainer = this.removeTrainer.bind(this)
    }

    handleFormChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault()
        var trainer = {
            id: this.state.id,
            name: this.state.name
        }
        this.props.editTrainerFun(trainer)
        this.props.closeModalFun()
    }

    removeTrainer(id) {
        console.log(this)
        this.props.removeTrainerFun(id)
        this.props.closeModalFun()
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem", color: 'black'}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Edycja Trenera</h3>
                <div className="form-group">
                    <label htmlFor="name">Nazwa Trenera</label>       
                    <input type="text" className="form-control" id="name" placeholder="Wpisz nazwę" value={this.state.name} onChange={this.handleFormChange} />
                </div>
                
                <button type="submit" className="trainers-button" style={{width: "100%", marginTop: "15px"}}>Edytuj</button>
                <button type="button" onClick={this.removeTrainer} className="trainers-button trainers-button-delete" style={{width: "100%", marginTop: "5px"}}>Usuń</button>
            </form>
        )
    }
}

export default EditTrainer