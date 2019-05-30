import React from 'react'

const TrainerDetails = ({trainer}) => {
    console.log(trainer)
    return(
        <div style={{padding: "1rem", color: "black"}}>
            <h3 style={{textAlign: "center", marginBottom: "30px"}}>Więcej o Trenerze</h3>
            
            <table className="table table-striped">
                <tbody>
                    <tr>
                    <td>Nazwa</td>
                    <td>{trainer.name}</td>
                    </tr>
                    <tr>
                    <td>ID</td>
                    <td>{trainer.id}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TrainerDetails