import { useEffect, useReducer } from "react";
import {authManager} from './config/context/auth-manager'
import "./output.css";
import "animate.css";
import AuthContext from "./config/context/auth-context";
import AppRouter from "./Routers/AppRouter";
  //es una variable global donde hace 
  //referencia a un apartado del navegador para guardar datos
  //string y key => value

  const init = () => JSON.parse(localStorage.getItem('user')) || {signed: false};
  
  function App() {
    const [user, dispatch] = useReducer(authManager, {}, init);
    //el metodo de dispatch va a ser el encargado de cargar en el contexto
    useEffect(()=>{
      if(!user) return;
      localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    return <AuthContext.Provider value={{dispatch, user}}>
          <AppRouter/>
      </AuthContext.Provider>;
  }

export default App;
