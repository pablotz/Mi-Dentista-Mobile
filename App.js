import React, {useState, useEffect, useMemo, useReducer} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (<Stack.Navigator
  screenOptions={{headerShown: false}}
  >
    <Stack.Screen name="Tabs" component={Tabs} />
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
      console.log(response)
      if(response.status === true){
        try {
          userToken = response.token;
          await AscyncStorage.setItem('userToken', response.token);
        } catch (e) {
            console.log(e);
        }
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
    signUp: () => {
      setUser({
        name: 'Juan',
        email: 'roberto@gmail.com',
      });
      setIsLoading(false);
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
    </AuthContext.Provider>
  );
}

