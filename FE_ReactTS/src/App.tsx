import './App.css'

function App() {

  const demoFetch = async () => {
    try{
      const url = 'https://localhost:7017/WeatherForecast';
      const response = await fetch(url);
      const data = await response.json();

      console.log(data);
    }

    catch(err){
      console.log(err);
    }
  }

  demoFetch();

  return (
    <>
    </>
  )
}

export default App
