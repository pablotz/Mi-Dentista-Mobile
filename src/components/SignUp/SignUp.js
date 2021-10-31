import React, {useState, useEffect} from 'react'
import Typography from '../Atoms/Typography';
import Button from '../Atoms/Button';
import Input from '../Atoms/Input';
import Singup_user from '../../service/singup';
import CheckBox from '@react-native-community/checkbox'
import { View, Text, StyleSheet, TextInput, SafeAreaView} from 'react-native'

const SignUp = ({navigation}) => {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [conPassword, setConPassword] = useState("")
    const [terms, setTerms] = useState(false)

    const handleTerms = () => {
        !terms ? 
            setTerms(true)
            :
            setTerms(false)
    }

    const sendUser = async () => {
      const user = {
        name,
        lastName,
        email,
        password,
        conPassword
      }
      let response = await Singup_user.addUser(user)

      console.log(response.status)
      if(response.status === "OK"){
        navigation.navigate('Login')
      }
    }

    return (
        <View style={styles.container}>
            <Typography size={46} bold={true} style={styles.registerTitle}>
                Regístrate
            </Typography>

            <SafeAreaView style={styles.inputs}>
              <Input value={name} onChangeText={setName} style={styles.user} placeholder="Nombre/s"></Input>
              <Input value={lastName} onChangeText={setLastName} style={styles.user} placeholder="Apellidos"></Input>
              <Input value={email} onChangeText={setEmail} style={styles.user} placeholder="Correo electronico"></Input>
              <Input value={password} onChangeText={setPassword} secureTextEntry={true} style={styles.pass} placeholder="Ingresa una contraseña"></Input>
              <Input value={conPassword} onChangeText={setConPassword} secureTextEntry={true} style={styles.pass} placeholder="Confirmar contraseña"></Input>

              <View style={styles.checkView}>
                <CheckBox 
                value={terms}
                onValueChange={handleTerms}
                style={styles.checkBox}/>
                <Typography style={styles.register} size={16} bold={true}>
                Acepto los terminos y condiciones de uso
                </Typography>
              </View>

              <Button disable={true} onPress={() => sendUser()} tyle={styles.buttonRegister}>Registrarse</Button>
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

    register: {
      marginTop: 30
    },

    checkBox: {
       marginTop: 25
    },

    checkView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 30
    },

    user: {
      marginTop: 30
    },

    pass: {
      marginTop: 30
    },

    registerTitle: {
        marginBottom: 110
    }
  });

export default SignUp