import React, {useState, useContext} from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, ToastAndroid } from 'react-native'
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';
import Singup_user from '../../service/singup';
import Typography from '../Atoms/Typography';
import { AuthContext } from '../Context/context';

const Login = ({navigation}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { signIn } = useContext(AuthContext);

  const sendData = async () => {
    const user = {
      email,
      password
    }
    let response = await Singup_user.login(user)

    console.log(response.status)

    if(response.status === true){
      navigation.navigate('Tabs')
    } else {
      ToastAndroid.showWithGravity(
        "Ingresa todos los datos",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    }
  }

  const loginHandle = (email, password) => {
    signIn(email, password)
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
            <SafeAreaView style={styles.inputs}>
              <Input style={styles.user} value={email} onChangeText={setEmail} placeholder="Correo" />
              <Input secureTextEntry={true} value={password} onChangeText={setPassword} style={styles.pass} placeholder="Contraseña" />
              <Typography style={styles.register} size={18} bold={true}>
                ¿olvidaste tu contraseña? entra aquí
              </Typography>

              <Button style={styles.buttonLogin} onPress={() => loginHandle(email, password)}>Iniciar sesión</Button>
            </SafeAreaView>     
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
