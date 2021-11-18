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
import { Root, Popup } from 'react-native-popup-confirm-toast'


const Appointment = ({navigation}) => {

    const [nowDate, setNowDate] = useState(null)

    const getDate = () => {
        var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");
        var f=new Date();
        setNowDate(f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear());
    }
    
    let { width } = Dimensions.get('window')
    const popup = Popup;

    const bodyComponent = (props) => {
      return <View style={styles.modal}>
              <Button onPress={() => popup.hide()}>Confirmar</Button>
            </View>
      }
    
    const goToAppointment = () => {
        navigation.navigate('makeAppointment', {
          serice: null
        })
    }

    const events = [
        { color:'#98EFD3', start: '2021-11-05 12:30:00', end: '2021-11-05 18:30:00', title: 'Limpieza bucal con el doctor', summary: '3412 Piedmont Rd NE, GA 3032'},
        { start: '2021-11-05 01:30:00', end: '2021-11-05 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-05 04:10:00', end: '2021-11-05 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-05 01:05:00', end: '2021-11-05 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-07 14:30:00', end: '2021-11-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-08 01:20:00', end: '2021-11-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-08 04:10:00', end: '2021-11-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-08 00:45:00', end: '2021-11-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-08 11:30:00', end: '2021-11-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-09 01:30:00', end: '2021-11-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-09 03:10:00', end: '2021-11-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2021-11-09 00:10:00', end: '2021-11-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
    ]
    const yourDate = new Date()

    useEffect(() => {
        getDate()

    }, [])

    return (
      <Root>
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
                    }} placeholder="2 feb 2022 a las 12:30 AM" editable={false}></Input>
                    <IconButton style={{backgroundColor: '#EB4840'}}
                    icon={<Trash height="35" width="35" color='#fff'/>}
                    onPress={() => popup.show({
                      type: 'confirm',
                      textBody: 'Se cancelara la cita',
                      bodyComponent: () => bodyComponent({popup}),
                      confirmText: 'Regresar',
                      buttonEnabled: false,
                  })}
                    />

                </View>   
              </View>
              <View style={styles.module_calendar}>
                <EventCalendar
                    events={events}
                    width={width}
                    initDate={yourDate.toLocaleDateString().split('T')[0]}
                />
              </View>
          </SafeAreaView>
        </Root>
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
        alignItems: 'center'
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
