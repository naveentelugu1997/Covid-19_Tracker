import React, {useState, useEffect} from 'react'
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from './components/InfoBox';
import Linegraph from './components/Linegraph';
import CountriesCasesTable from './components/CountriesCasesTable';
import {sortData} from './components/Util'

function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(()=>{
    const getCountriesData = async()=>{
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response)=> response.json())
        .then((data)=> {
          console.log(data);
          const countries = data.map((country,i)=> ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          let sortedData = sortData(data);
          setCountries(countries);
          setTableData(sortedData);
        });
    };
    getCountriesData();
    }, [])


  useEffect(()=> {
    const url = "https://disease.sh/v3/covid-19/all"
    fetch(url).then((response) => response.json())
    .then((data)=> {setCountryInfo(data);
      
    });
  }, []);

  const onCountryChange = async(e) => {
    const countryCode = e.target.value;
    
    const url = 
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response)=> response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
      })


  }

  return (
    <div className="App">
      <div className="app_top">
        <div className="app_left">
          <div className="app_header">
            <h1 className="app_heading">Covid-19 Tracker</h1>
            <div className="app_dropdown">
              <FormControl >
                <Select varient="outlined"
                  value={country}
                  onChange={onCountryChange}>
                  <MenuItem value="worldwide">Worldwide</MenuItem>
                  {countries.map((country)=> (
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="app_stats">
            <div className="infobox_cases">
              <InfoBox 
              onClick={(e)=> setCasesType("cases")}
              title={"Confirmed Cases"} 
              cases={countryInfo.todayCases} 
              total={countryInfo.cases}
              backGroundColor='#ffcc80'
              />
              
            </div>
            <div className="infobox_recovered">
              <InfoBox 
                onClick={(e) => setCasesType("recovered")}
                title={"Recovered Cases"} 
                cases={countryInfo.todayRecovered}  
                total={countryInfo.recovered}
                backGroundColor='#a5d6a7'
                />
            </div>
            
            <div className="infobox_recovered deaths">
              <InfoBox 
                onClick={(e) => setCasesType("deaths")}
                title={"Deaths"} 
                cases={countryInfo.todayDeaths}  
                total={countryInfo.deaths}
                backGroundColor='#f44336'
                />
                
            </div>
            
          </div>
          <div className="app_linegraph">
            <h3>Worldwide new {casesType}</h3>
            <Linegraph casesType={casesType} />
          </div>
        </div>

        <Card className="app_right">
          <CardContent>
            <div className="app_information">
                <h3>Live cases by country</h3>
                <CountriesCasesTable countries={tableData}/>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
    
  );
}

export default App;
