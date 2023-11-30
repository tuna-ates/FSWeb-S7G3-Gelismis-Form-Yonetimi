import { useEffect, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import axios from "axios";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";
function App() {
  const [users, setUsers] = useState([]);

  const deneme = (data) => {
    setUsers([...users, data]);
    console.log("appdata:", data);
  };

  return (
    <div className="appContainer">
      <Form deneme={deneme} />
   

  
      <h2 className="appTitle">Kullanıcı Listesi</h2>
       

        <div className="cardContainer"> 
              {users.map((user) => {
          return <Card
          className="my-2"
          color="danger"
          inverse
          style={{
            width: '18rem'
          }}
        >
          <CardHeader>
           {user.name}
          </CardHeader>
          <CardBody>
            <CardText>
              Email: {user.email}
            </CardText>
            <CardText>
              Roll: {user.select}
            </CardText>
          </CardBody>
        </Card>
        
        })}
        </div>
    
        
    </div>
  
  );
}

export default App;
