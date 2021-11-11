import React, {useState, useEffect} from 'react'
import Typography from '../Atoms/Typography';
import Button from '../Atoms/Button';
import { View, Text, StyleSheet, TextInput, SafeAreaView, CheckBox } from 'react-native'
import {LeftArrow,Ghost} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import ServiceCard from '../Atoms/ServiceCard/ServiceCard';
import Input from '../Atoms/Input'
import {Search} from '../Atoms/Icons'

const Service = () => {
      
    const [serviceList, setServiceList] = useState([])    

    // useEffect(() => {
    //   const fetchData = async () => {
    //     let result = await fetch('')
    //     //Revisar el resultado
    //     if (result.ok) {
    //       let json = await result.json()
    //       setServiceList(json)
    //     }
    //     setServiceList(result)
    //   }      
    //   fetchData()
    // },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              {/* <IconButton
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              /> */}
              <View style={styles.header_title_container}>
                <Typography size={46} bold={true} style={styles.header_title}>
                    Servicios
                </Typography>
              </View>
            </View>

            <SafeAreaView style={styles.module_main}>
                  
              <Typography style={styles.text_indication} size={16} bold={true}>              
                Busca un servicio de tu preferencia
              </Typography>
            
              <View style={{display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',            
              alignItems: 'center',
              width: '100%',}}>
                <Input style={{
                  margin: 10,
                  width: 250
                }} placeholder="Limpieza bucal"></Input>
                <IconButton style={{backgroundColor: '#1BD15D'}}
                icon={<Search height="24" width="24" color='#fff'/>}/>

              </View>              

              <Typography style={{...styles.text_indication,marginTop:25}} size={16} bold={true}>              
                Servicios proporcionados por el dentista
              </Typography>
              
              {
                serviceList.length < 1 ?
                <View style={{
                  marginTop: 50,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '100%',                
                }}>

                  <Ghost height="24" width="24" color='#787878'/>
                  <Typography style={{...styles.text_indication,color:'#787878'}}
                  size={16} bold={false}>              
                    No hay servicios registrados
                  </Typography>
                </View>
                  :
                  ''
              }
            </SafeAreaView>     
        </View>
    )
}

const styles = StyleSheet.create({


    header_title_container: {
      width: '100%',
      flexDirection: 'row',
    },    

    container: {
      flex: 1,
      margin: 20,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },

    module_main: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
    },

    text_indication: {
      display: 'flex',
      alignSelf: 'flex-start',
    },

  });

export default Service
