import React, {useState, useContext, useRef, useEffect} from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, ToastAndroid } from 'react-native'
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';
import Singup_user from '../../service/singup';
import Typography from '../Atoms/Typography';
import { AuthContext } from '../Context/context';
import Toast from "react-native-fast-toast";


const Login = ({navigation}) => {

  const toast = useRef(null);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signIn } = useContext(AuthContext);

  const loginHandle = (email, password) => {
    if(email === "" || password === ""){
      toast.current.show("Llena todos los campos.", {
        type: "danger",
        duration: 2500,
        animationType: "zoom-in"
      });
    }else{
      signIn(email, password)
    }
  }

    return (
        <View style={styles.container}>
          <View style={styles.welcome}>
              <Typography size={56} style={styles.title}>
                Bienvenido!
              </Typography>
              <Typography size={38} bold={true} style={styles.title}>
                Inicia sesión.
              </Typography>

              <Typography style={styles.register} size={18} bold={false} onPress={()=>navigation.navigate('SignUp')}>
                Soy nuevo aquí quiero <Typography bold={true} size={18}>registrarme</Typography>
              </Typography>
          </View>
            <View style={styles.inputs}>
              <Input autoCapitalize='none' style={styles.user} value={email} onChangeText={setEmail} placeholder="Correo" />
              <Input secureTextEntry={true} value={password} onChangeText={setPassword} style={styles.pass} placeholder="Contraseña" />

              <Button style={styles.buttonLogin} onPress={() => loginHandle(email, password) }>Iniciar sesión</Button>
            </View>  
            
            <Toast ref={toast} />   
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 20,
      justifyContent: 'center',
    },

    inputs: {
      alignItems: 'center',
    },

    title: {
      color: '#000'
    },


    welcome: {
      alignItems: 'flex-start',
    },

    register: {
      marginTop: 30,
      color: '#000'
    },

    user: {
      marginTop: 30,
    },

    pass: {
      marginTop: 30
    }
  });

export default Login
