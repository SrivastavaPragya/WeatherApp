import React,{useState,useEffect} from 'react'
import "./style.css"
import Weathercard from './Weathercard'

const Temp = () => {
    const [ searchValue,setSearchValue] =useState("pune")
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async () => {
        try {
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue} &units=metric&appid=94749519e1ef7e1c176399f75ffb04c3`;
          let res = await fetch(url);
          let data = await res.json();// converting the data in json format whic is redable format
    // object destructing
          const { temp, humidity, pressure } = data.main;
          const { main: weathermood } = data.weather[0];
          const { name } = data;
          const { speed } = data.wind;
          const { country, sunset } = data.sys;
    // creating the object to pass the destructing data
          const myNewWeatherInfo = {
            temp,
            humidity,
            pressure,
            weathermood,
            name,
            speed,
            country,
            sunset,
          };
    
          setTempInfo(myNewWeatherInfo);
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(() => {
        getWeatherInfo();
      }, []);// this is used jiski wjh sai jesi hai pge refresh ho  getWeatherInfo function by default call hojye

    
  return (
    <>
      <div className='wrap'>
        <div className='search'>
            <input type="search" 
             placeholder="search..."
              id ="search"
              className='searchTerm'
            value={searchValue}
              onChange={(e)=>setSearchValue(e.target.value)}
              />
              
          <button className='searchButton' type='button' onClick={getWeatherInfo}>search</button >

        </div>
      </div>
  < Weathercard tempInfo={tempInfo}/> 
  {/* passing tempInfo as a prop */}
    </>
  )
}

export default Temp
