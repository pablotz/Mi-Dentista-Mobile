import React, {useState, useEffect} from 'react'
import Typography from '../Atoms/Typography';
import Button from '../Atoms/Button';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native'
import {LeftArrow,Ghost} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import ServiceCard from '../Atoms/ServiceCard/ServiceCard';
import Input from '../Atoms/Input'
import {Search} from '../Atoms/Icons'
import SelectService from '../SelectService/SelectService'
import ServiceItem from '../ServiceItem/ServiceItem';
import HistoryItem from '../HistoryItem/HistoryItem';
import appointment_api from '../../service/appointment'
import AscyncStorage from '@react-native-community/async-storage';
import Loading from '../Atoms/Loading/Loading';

const History = ({navigation}) => {


    const [history, setHistory] = useState(null)
    const [token, setToken] = useState('')
    const [user, setUser] = useState(null)

    const getAppointments = async () => {
      let userToken
      let user
      let appointmentsUser = []

      var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");

      userToken = await AscyncStorage.getItem('userToken');
      user = await AscyncStorage.getItem('userData');
      setUser(JSON.parse(user))
      setToken(userToken)

      /*
        CAMBIAR ESTO PABLO NO SE TE VAYA A OLVIDAR
      */

      
      const appointments = await appointment_api.getAppointmentsUser(userToken, {id: 2})
      if(appointments.status === "OK"){     
        appointments.content.map(apnt => {

                    
          let hour = apnt.start_date_time.split('T')[1].split(":")
          hour = hour[0] + ":"+ hour[1]

          let date = new Date(apnt.start_date_time)

          appointmentsUser.push({
            id: apnt.id,
            name: apnt.service.name,
            price: apnt.service.price,
            duration: apnt.service.duration,
            date: date.getDate() + " de " + meses[date.getMonth()] + " de " + date.getFullYear() + " " + tConvert(hour)
          })
        })
        setHistory(appointmentsUser)
      }
    }

    const  tConvert = (time) => {
      time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    
      if (time.length > 1) { 
        time = time.slice (1); 
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
        time[0] = +time[0] % 12 || 12;
      }
      
      return time.join (''); 
      
    }

    useEffect(() => {
        getAppointments()
    }, [])

    return (
        <View style={history ? styles.containerNew : styles.container}>
            <View style={styles.header}>
              <IconButton onPress={() =>  navigation.navigate('Tabs')}
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              />
              <View style={styles.header_title_container}>
                <Typography size={35} bold={true}>
                    Historial de citas
                </Typography>
              </View>
            </View>

            
            {
             history ? 
             <SafeAreaView style={styles.module_main}>
             <ScrollView contentContainerStyle={styles.cards_container}>
              {
                history.length > 0 ?
                  
                  history.map(item => {
                      return (
                          <HistoryItem
                              navigation={navigation}
                              dataService={item}
                          />
                      )
                  })
                  
                :
                <Typography size={20} bold={false}> No tienes historial de citas </Typography>
              }
            </ScrollView>
            </SafeAreaView>   
            :
            <Typography size={30} bold={false}> Cargando... </Typography>
              
            }
            
              
             
        </View>
    )
}

const styles = StyleSheet.create({


  container: {
    flex: 1,
    margin: 20,
  },

  containerNew: {
    flex: 1,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  module_main: {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: 10,
    paddingBottom: 60,
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

  header: {
    width: '100%',
    paddingLeft: 20,        
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 30,
  },

  header_title_container: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 20,      
    justifyContent: 'flex-start',
  }, 

  });

  

export default History
