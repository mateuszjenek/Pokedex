import React from 'react';
import Header from './Header';
import Pokemons from './Pokemons'
import Types from './Types'
import Trainers from './Trainers'

const Dashboard = (props) => {
  document.getElementsByTagName("body")[0].style.overflow = "scroll"
  return(
    <div>
      <Header />
      <div className="container" style={{marginTop: "6rem"}} >
          <div className="row">
            <div className="col-md-4 mb-3 mb-md-none">
              <Pokemons />
            </div>
            <div className="col-md-4 mb-3 mb-md-none">
              <Types />
            </div>
            <div className="col-md-4 mb-3 mb-md-none">
              <Trainers />
            </div>
          </div>
        </div>
      </div>
  )
}

export default Dashboard