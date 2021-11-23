import React, {useState, useEffect} from 'react'
import {View, StyleSheet, TouchableOpacity, Dimensions, Text} from 'react-native'
import { Add } from '../Atoms/Icons'
import Typography from '../Atoms/Typography'
import Button from '../Atoms/Button/index';
import IconButton from '../Atoms/ButtonIcon/IconButton';
import Input from '../Atoms/Input';
import {Trash} from '../Atoms/Icons';
import EventCalendar from 'react-native-events-calendar'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Popup } from 'react-native-popup-confirm-toast'
import appointment_api from '../../service/appointment';
import AscyncStorage from '@react-native-community/async-storage';


const Appointment = ({navigation, route}) => {

    const [nowDate, setNowDate] = useState(null)
    const [token, setToken] = useState(null)
    const [allApnt, setAllApnt] = useState([])
    const [closestApnt, setClosestApnt] = useState(null)
    const [nearDate, setNearDate] = useState(null)

    const getDate = () => {
        var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");
        var f=new Date();
        setNowDate(f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
    }
    
    let { width } = Dimensions.get('window')
    const popup = Popup;

    const bodyComponent = (props) => {
      return <View style={styles.modal}>
              <Typography size={27}bold={false}>
                ¿Estás seguro que deseas eliminar esta cita?
              </Typography>
              <Button onPress={cancelAppointment}>Confirmar</Button>
            </View>
    }

    const cancelAppointment = async() => {
      const apnt = {
        id: nearDate.id,
      }

      const response = await appointment_api.cancelAppointment(token, apnt)

      if(response.status === "OK") {
        setNearDate(null)
        getAppointments()
        popup.hide()
      }
    }
    
    const goToAppointment = () => {
        navigation.navigate('makeAppointment', {
          serice: null
        })
    }

    const yourDate = new Date()

    const getAppointments = async () => {
      let userToken
      let today = new Date()
      let appointmentsUser = []

      userToken = await AscyncStorage.getItem('userToken');
      setToken(userToken)

      /*
        CAMBIAR ESTO PABLO NO SE TE VAYA A OLVIDAR
      */
      const appointments = await appointment_api.getAppointmentsUser(userToken, {id: 2})
      if(appointments.status === "OK" && appointments.content.length > 0){     

        //Getting the closest appointment
        let closest = appointments.content.sort(function(a, b) {
          var distancea = Math.abs(today - Date.parse(a.start_date_time));
          var distanceb = Math.abs(today - Date.parse(b.start_date_time));
          return distancea - distanceb; // sort a before b when the distance is smaller
      });
      

        const closeDate = new Date(closest[0].start_date_time)

        var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");

        if(Date.parse(closest[0].start_date_time) >= today.getTime() ){
          
          let hour = closest[0].start_date_time.split('T')[1].split(":")
          hour = hour[0] + ":"+ hour[1]
          
          setNearDate(closest[0])
          setClosestApnt(closeDate.getDate() + " de " + meses[closeDate.getMonth()] + " de " + closeDate.getFullYear() + " " + tConvert(hour))
        } else {
          
          setClosestApnt("No hay citas")
        }
        
        appointments.content.map(apnt => {
          appointmentsUser.push({
            color:'#98EFD3',
            start: apnt.start_date_time,
            end: apnt.end_date_time,
            title: apnt.service,
          })
        })
        setAllApnt(appointmentsUser)
      } else {
        setClosestApnt("No hay citas")  
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
        getDate()
        getAppointments()
    }, [])

    return (
      <>
        <SafeAreaView style={styles.container}>


            <View style={styles.header}>
              <View style={styles.header_title_container}>
                <Typography size={46} bold={true} style={styles.header_title}>
                    Citas
                </Typography>
              </View>
            </View>

            <View style={styles.module_main}>
                <Typography style={styles.text_indication} size={18} bold={true}>              
                    Hoy es: {nowDate}
                </Typography>

                <View style={{display: 'flex',
              flexDirection: 'row',
              marginTop: -30,
              alignItems: 'center',
              width: '100%',}}>
                <Button onPress={() => goToAppointment()}>Crear nueva cita</Button>
              </View>  
              </View>

              <View style={styles.module_appointment}>
                <Typography style={styles.text_indication} size={18} bold={true}>              
                    Proxima cita:
                </Typography>
                <View style={{display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',            
                alignItems: 'center',
                width: '100%',}}>
                    <Input style={{
                    margin: 10,
                    width: 250
                    }} placeholder={closestApnt} editable={false}></Input>
                    <IconButton style={{backgroundColor: '#EB4840'}}
                    icon={<Trash height="35" width="35" color='#fff'/>}
                    disabled={nearDate ? false : true}
                    onPress={() => popup.show({
                      type: 'confirm',
                      bodyComponent: () => bodyComponent({popup}),
                      confirmText: 'Regresar',
                      buttonEnabled: false,
                  })}
                    />

                </View>   
              </View>
              <View style={styles.module_calendar}>
                <EventCalendar
                    events={allApnt}
                    width={width}
                    initDate={yourDate.toLocaleDateString().split('T')[0]}
                />
              </View>
          </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    header_title_container: {
        width: '100%',
        flexDirection: 'row'
      }, 

    
    container: {
        flex: 1,
        margin: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 200,
    },

    text_indication: {
        display: 'flex',
        alignSelf: 'flex-start',
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

    module_appointment: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
      },

    module_calendar: {
        display: 'flex',
      },
    

    nextVist: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    }
    })


export default Appointment
