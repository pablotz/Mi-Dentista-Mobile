import React, {
  useState, 
  useEffect, 
  useMemo, 
  useReducer, 
  useRef,
  useContext
} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button } from 'react-native';
import Tabs from './src/components/Tabs/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/components/Login/Login';
import SignUp from './src/components/SignUp/SignUp';
import Singup_user from './src/service/singup';
import Loading from './src/components/Atoms/Loading/Loading';
import { AuthContext } from './src/components/Context/context';
import AscyncStorage from '@react-native-community/async-storage';
import { loginReducer } from './src/components/Reducers/SignInUpReducer';
import Payments from './src/components/Payments/Payments';
import MakeAppointment from './src/components/MakeAppintment/MakeAppointment';
import Appointment from './src/components/Appointment/Appointment';
import SelectService from './src/components/SelectService/SelectService';
import Toast from "react-native-fast-toast";



const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (<Stack.Navigator
  screenOptions={{headerShown: false}}
  >
    <Stack.Screen name="Tabs" component={Tabs} />
    <Stack.Screen name="Payments" component={Payments} />
    <Stack.Screen name="makeAppointment" component={MakeAppointment} />
    <Stack.Screen name="selectService" component={SelectService} />
  </Stack.Navigator>)
}

const LoginStack = () => {
  return (<Stack.Navigator
  screenOptions={{headerShown: false}}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>)
}


export default function App() {

  const toast = useRef(null);
  const initialLoginState = {
    isLoading: true,
    user: null,
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({

    signIn: async (email, password) => {
      let userToken;
      userToken = null;

      const user = {
        email,
        password
      }

      let response = await Singup_user.login(user)
      
      if(response.status === true){
        try {
          userToken = response.token;
          await AscyncStorage.setItem('userToken', response.token);
        } catch (e) {
          console.log(e);
        }
      } 

      if(response.status === "ERROR"){
        toast.current.show("La contraseña y/o el correo son erroneos.", {
          type: "danger",
          duration: 2500,
          animationType: "zoom-in"
        });
      }

     dispatch({ type: 'LOGIN', id: email, token: userToken, isLoading: false });

    },

    signOut: async() => {
      try {
        await AscyncStorage.removeItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'LOGOUT'});
    },

    signUp: async (user) => {
      let response = await Singup_user.addUser(user)

      let userToken;
      userToken = null;

      console.log(response);
      if(response.status === "OK"){
        toast.current.show("Registrado con exito", {
          type: "success",
          duration: 2500,
          animationType: "zoom-in"
        });

        /* USER LOGIN AFTER SIGNUP */

        let userLogin = {
          email: user.email,
          password: user.password
        }

        let responseLogin = await Singup_user.login(userLogin)

        if(responseLogin.status === true){
          try {
            userToken = responseLogin.token;
            await AscyncStorage.setItem('userToken', responseLogin.token);
          } catch (e) {
            console.log(e);
          }
        } 

        dispatch({ type: 'LOGIN', id: userLogin.email, token: userToken, isLoading: false })


      } 
      
      if(response.message === "Email is unavailable."){
        toast.current.show("El correo ya esta registrado", {
          type: "danger",
          duration: 2500,
          animationType: "zoom-in"
        });
      }


      if(response.message === "Invalid access code."){
        toast.current.show("El codigo de acceso no es valido", {
          type: "danger",
          duration: 2500,
          animationType: "zoom-in"
        });
      }
    },

  }), []);

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AscyncStorage.getItem('userToken', userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if(loginState.isLoading){
    return(
        <Loading />
    )
  }

  return (
    
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      {loginState.userToken ? <AuthStack/> : <LoginStack />}
    </NavigationContainer>
    <Toast ref={toast} />
    </AuthContext.Provider>
    

  );
}

