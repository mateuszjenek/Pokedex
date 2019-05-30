import React, { Component } from 'react'

class AddTrainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
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
        var trainer = {
            name: this.state.name,
        }
        console.log(this.state.addTrainer)
        this.props.addTrainerFun(trainer)
        this.props.closeModalFun()
    }
    render() {
        return(
            <form onSubmit={this.handleFormSubmit} style={{padding: "1rem"}}>
                <h3 style={{textAlign: "center", marginBottom: "30px"}}>Dodaj Trenera</h3>
                <div className="form-group">
                    <label for="name">Nazwa Trenera</label>       
                    <input type="text" class="form-control" id="name" placeholder="Wpisz nazwę" onChange={this.handleFormChange} />
                </div>
                <button type="submit" className="trainers-button" style={{width: "100%", marginTop: "15px"}}>Dodaj</button>
            </form>
        )
    }
}

export default AddTrainer