import React, {useState, useEffect} from 'react'
import Typography from '../Atoms/Typography';
import Button from '../Atoms/Button';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native'
import {LeftArrow,Ghost} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import ServiceCard from '../Atoms/ServiceCard/ServiceCard';
import Input from '../Atoms/Input'
import AscyncStorage from '@react-native-community/async-storage';
import {Search} from '../Atoms/Icons'
import SelectService from '../SelectService/SelectService'
import ServiceItem from '../ServiceItem/ServiceItem';
import service_api from '../../service/service'

const Service = ({navigation}) => {

    useEffect(() => {
      const getServices = async () => {
        let userToken
        userToken = await AscyncStorage.getItem('userToken');
        
        let response = await service_api.getService(userToken)

        response = response.filter(item =>  item.estatus == 1 )
        
        console.log(response)
        setBackList(response)
        setServiceList(response)
      }
      getServices()
      
    }, [])

    const [slctService, setSlctService] = useState(null)
    const [serviceList, setServiceList] = useState([])
    const [backList,  setBackList] = useState([])

    const handleSearch = (search) => {
      console.log(search)
      const filteredService = backList.filter(
        service => service.name.toLowerCase().includes(search.toLowerCase())
      )
      setServiceList(filteredService)
      if(search == ''){
        setServiceList(backList)
      }
    }

    
    

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
                <Input 
                onChangeText={handleSearch}
                style={{
                  margin: 10,
                  width: 300
                }} placeholder="Limpieza dental"></Input>

              </View>              

              <Typography style={{...styles.text_indication,marginTop:25}} size={16} bold={true}>              
                Servicios proporcionados por el dentista
              </Typography>


            <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cards_container}>

              {
              serviceList.map(item => {
                  return (
                      <ServiceItem
                          setSlctService={setSlctService}
                          navigation={navigation}
                          dataService={item}
                      />
                  )
              })
              }
            </ScrollView>
              
              
            </SafeAreaView>     
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
      paddingBottom: 290,
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

    cards_container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
  },


  header_title_container: {
      width: '100%',
      flexDirection: 'row',
  },   

  });

export default Service
