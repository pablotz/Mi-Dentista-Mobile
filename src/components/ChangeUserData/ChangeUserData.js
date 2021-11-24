import React, {useRef, useState, useEffect} from 'react'
import {View, StyleSheet, SafeAreaView} from 'react-native'
import Typography from '../Atoms/Typography'
import Input from '../Atoms/Input';
import Button from '../Atoms/Button';
import CheckBox from '@react-native-community/checkbox'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import Toast from "react-native-fast-toast";
import AscyncStorage from '@react-native-community/async-storage';
import user_api from '../../service/user'

import {
    LeftArrow, 
    CalendarPic, 
    Tooth, 
    Info
} from '../Atoms/Icons'

const ChangeUserData = ({navigation}) => {


    const toast = useRef(null);

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const getUserData = async () => {
       let userToken = await AscyncStorage.getItem('userToken');
       let userData = await AscyncStorage.getItem('userData');

        let userJs = JSON.parse(userData)

        setEmail(userJs.email)
        setName(userJs.user_name)
        setLastName(userJs.last_name)
        setPhone(userJs.phone)

        setUser(userJs)
        setToken(userToken)
    }

    const editData = async () => {
        
        let data = {
            name,
            lastName,
            email,
            phone
        }
        let response = await user_api.editUserData(token, data)

        console.log(response)
        if(response.status === "OK"){
            toast.current.show("Información cambiados con exito", {
                type: "success",
                duration: 2500,
                animationType: "zoom-in"
              });
        }else{
            toast.current.show("Ocurrio un error al actualizar los datos", {
                type: "danger",
                duration: 2500,
                animationType: "zoom-in"
              });
        }
    
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <IconButton onPress={() =>  navigation.navigate('Tabs')}
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              />
              <View style={styles.header_title_container}>
                <Typography size={35} bold={true}>
                    Cambiar datos
                </Typography>
              </View>
            </View>
        
            <SafeAreaView style={styles.inputs}>
              <Input value={name} onChangeText={setName} style={styles.user} placeholder="Nombre/s"></Input>
              <Input value={lastName} onChangeText={setLastName} style={styles.user} placeholder="Apellidos"></Input>
              <Input value={email} autoCapitalize='none' onChangeText={setEmail} style={styles.user} placeholder="Correo electronico"></Input>
              <Input value={phone} keyboardType='numeric' onChangeText={setPhone} style={styles.user} placeholder="Número de teléfono"></Input>

              <Button disable={true} onPress={() => editData()} tyle={styles.buttonRegister}>Cambiar información</Button>
            </SafeAreaView>    
            <Toast ref={toast} />  
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
  
    header: {
        width: '100%',
        marginTop: 20,
        paddingLeft: 20,        
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 120,
        alignItems: 'center',
    },
  
    header_title_container: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 20,      
        justifyContent: 'flex-start',
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
})


export default ChangeUserData
