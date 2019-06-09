import React, { Component } from 'react'

class AssignToTrener extends Component {
    constructor(params) {
        super(params)
        this.state = {
            trainer: params.trainer,
            pokemon_id: "",
            assignToTrenerFun: params.assignToTrenerFun,
            closeModalFun: params.closeModalFun
        }
        this.handleFormChange = this.handleFormChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormChange(e) {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFormSubmit(e) {
        e.preventDefault()
        this.state.assignToTrenerFun(this.state.trainer, this.state.pokemon_id)
        this.state.closeModalFun()
    }

    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem", color: 'black'}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Przypisz pokemona</h3>
                <div className="form-group">
                    <label htmlFor="name">PokeID</label>       
                    <input type="text" className="form-control" id="pokemon_id" placeholder="Wpisz PokeID" value={this.state.name} onChange={this.handleFormChange} />
                </div>
                
                <button type="submit" className="trainers-button-blue" style={{width: "100%", marginTop: "15px"}}>Przypisz</button>
            </form>
        )
    }
}

export default AssignToTrener