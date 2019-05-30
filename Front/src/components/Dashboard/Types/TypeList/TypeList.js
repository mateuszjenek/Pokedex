import React from 'react'


const TypeList = ({list, removeTypeFun}) => {
    const _list = list.length ? (
        list.map((type) => {
            return(
                <div key={type.id} style={{background: "#27ae60", borderRadius: "40px", paddingLeft: "1rem", marginBottom: "5px", color: "white"}}>
                
                <span>{type.name}</span>
                <button onClick={() => removeTypeFun(type.id)} className="types-button types-button-delete" style={{float: "right", fontSize: "0.8rem"}}>usuń</button>
                
                </div>
            )
        })
    ) : (
        <p>W bazie danych nie ma żadnych typów albo wczytywanie trwa wyjątkowo długo</p>
    )
    
    return(
        <div>
            {_list}
        </div>
    )
}

export default TypeList