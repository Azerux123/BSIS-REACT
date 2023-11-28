import './App.css';

function App() {

  const name = <h1>Alfredo</h1>
  const age = <h1>21</h1>;
  const email = <h1>alfredo@ymail.com</h1>;
  const user = (
    <div>
      {name}
      {age}
      {email}
    </div>
  );
  return (
    <div className="App">
     {user}
      
    </div>
  );
}

export default App;
