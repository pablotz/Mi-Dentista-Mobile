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

  
    const dummyData = [
        {
            id: 1,
            name: 'Limpieza bucal',
            price: '$100',
            duration: 60,
            date: '12/12/2020',
        },
        {
            id: 2,
            name: 'Extracción dental',
            price: '$200',
            duration: 30,
            date: '12/12/2020',
        },
        {
            id: 3,
            name: 'Aplicación de resina',
            price: '$300',
            duration: 90,
            date: '12/12/2020',
        },
        {
            id: 4,
            name: 'Service 4',
            price: '$400',
            duration: 120,
            date: '12/12/2020',
        },
        {
            id: 5,
            name: 'Service 5',
            price: '$500',
            duration: 35,
            date: '12/12/2020',
        },
        {
            id: 6,
            name: 'Service 6',
            price: '$600',
            duration: 35,
            date: '12/12/2020',
        },
        {
            id: 7,
            name: 'Service 7',
            price: '$700',
            duration: 45,
            date: '12/12/2020',
        },
        {
            id: 8,
            name: 'Service 8',
            price: '$200',
            duration: 55,
            date: '12/12/2020',
        },
        {
            id: 9,
            name: 'Service 9',
            price: '$150',
            duration: 160,
            date: '12/12/2020',
        }
        
    ]

    const [history, setHistory] = useState(null)
    const [token, setToken] = useState('')

    const getAppointments = async () => {
      let userToken
      let appointmentsUser = []

      var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");

      userToken = await AscyncStorage.getItem('userToken');
      setToken(userToken)

      /*
        CAMBIAR ESTO PABLO NO SE TE VAYA A OLVIDAR
      */
      const appointments = await appointment_api.getAppointmentsUser(userToken, {id: 2})
      if(appointments.status === "OK"){     
        console.log(appointments)
        appointments.content.map(apnt => {

                    
          let hour = apnt.start_date_time.split('T')[1].split(":")
          hour = hour[0] + ":"+ hour[1]

          let date = new Date(apnt.start_date_time)

          appointmentsUser.push({
            id: apnt.id,
            name: apnt.service,
            price: '$100',
            duration: 60,
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
              history.map(item => {
                  return (
                      <HistoryItem
                          navigation={navigation}
                          dataService={item}
                      />
                  )
              })
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
