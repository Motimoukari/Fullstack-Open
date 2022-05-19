import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = (props) => {

  return (
    <div>
      <ul>
      {props.persons.map(number => 
          <li key={number.name}>
            {number.name} {number.number}
          </li>
          )}
      </ul>
    </div>
  )
}

const Countries = (props) => {

  if (props.x.length <= 10 && props.x.length > 1) {
    


    return (
    
      <div>
        {props.x.map(country => 
        
        <div key={country.name.common}><li >
        {country.name.common} <div>
        <button onClick={() => console.log(country.name.common)}>
      Show
      </button>
        </div>
      </li>

      
      </div>
        )}  
     </div>

    
    
  )}

  if (props.x.length > 10) {
    return(
      <p>Too many matches, please specify another filter</p>
    )
  }

  if (props.x.length == 1)  {


    return (
      <div>
    
      <h2>{props.x[0].name.common}</h2>
      <p>capital {props.x[0].capital}</p>
      <p>Area {props.x[0].area}</p>

      <h4>languages:</h4>
      <p>{console.log(props.x[0].languages)}</p>
      

      <ul>
      {Object.entries(props.x[0].languages).map(([key, value])=>{
        return ( 
          <li key={key}>
          {value}
          </li>
        )})}
      </ul>

      <img width="auto" height="300" src={props.x[0].flags.svg}></img>

      <h3>weather in {props.x[0].capital}</h3>



      </div>
      )
      
  }
  
}

const App = () => {

  const api_key = process.env.REACT_APP_API_KEY
  const personlist = []
  const [persons, setPersons] = useState([...personlist])

  const [countryname, setCName] = useState("")
  const [countrylist, setCList] = useState([])
  const [temp, setTemp] = useState("")
  const [wind, setWind] = useState("")
  const [latLng, setCoords] = useState([])

  let x = []

  useEffect(() => {
    console.log('phonebook_effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('country_effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCList(response.data)
      })
  }, [])


  x = countrylist.filter(country => country.name.common.includes(countryname))



  
  return (
    <div>
      <Persons persons={persons}/>
    
    <label>find countries
    <form>
        <input type="text"
        onChange={(e) => setCName(e.target.value)} />
      </form>
    </label>

    <Countries x={x} setCname={setCName}/>    
    </div> 
  )

}

export default App

/*{Object.values(props.x[0].languages).forEach(function(key)  {
        <li>{key}</li>
      })}*/