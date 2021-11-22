import React, {useState, useEffect, useRef} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import {
  LeftArrow, 
  CalendarPic, 
  Tooth, 
  Info
} from '../Atoms/Icons'
import Typography from '../Atoms/Typography';
import Button from '../Atoms/Button'
import ButtonTextIcon from '../Atoms/ButtonIconText/IconTextButton';
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Popup } from 'react-native-popup-confirm-toast'
import appointment_api from '../../service/appointment'
import AscyncStorage from '@react-native-community/async-storage';
import Toast from "react-native-fast-toast";


const MakeAppointment = ({navigation, route}) => {

  LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
  };

  LocaleConfig.defaultLocale = 'es';

  const toast = useRef(null);

  const calendarComponent = () => {
    return(
      <View style={styles.calendar} >
      <Typography size={25}bold={false}>
            Fecha de tu cita
      </Typography>

      <Calendar 
        current={new Date()}
        disableAllTouchEventsForDisabledDays={true}
        markedDates={disabledDates}
        minDate={minDate}
        hideExtraDays={true}
        onDayPress={(day) => {
          setSelectedDate(day.dateString)
          popup.hide()
        }}
      />
    </View>
    )
  }

  const popup = Popup;
  const [minDate, setMinDate] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null)
  const [slctService, setSlctService] = useState(null)
  const [slctTime, setSlctTime] = useState('')
  const [token, setToken] = useState(null)
  const [appointment, setAppointment] = useState({})
  const [hours, setHours] = useState([])


  const {service} = route.params;

  const getDate = () => {
    let date = new Date();
    date.setDate(date.getDate());
    setMinDate(date)
  }

  useEffect(() => {
    getDate()
    const getToken = async () => {
      let userToken
      userToken = await AscyncStorage.getItem('userToken');
      setToken(userToken)
    }
    getToken()
  }, [])


  useEffect(() => {
    if(service){
    setSlctService(service)
    }

    if(service && selectedDate){
    let appointment = {
      date: selectedDate,
      service: slctService.id,
    }

    const getHours = async () => {
      let response = await appointment_api.getAvailableHrs(token, appointment)
      console.log(response)
      if(response.status === "OK"){
       response.content.map((hour, index) => {
        let newHour = {
          id: hour,
          value: tConvert(hour) + " - " + addMinutes(hour, slctService.duration)
          
         }

         setHours(prevState => [...prevState, newHour])
       })
      }
    }

    getHours()
  }
  
}, [service, selectedDate])

  const  tConvert = (time) => {
  time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { 
    time = time.slice (1); 
    time[5] = +time[0] < 12 ? ' AM' : ' PM'; 
    time[0] = +time[0] % 12 || 12;
  }
  
  return time.join (''); 
  
  }

  const addMinutes = (time, minsToAdd) => {
    function D(J){ return (J<10? '0':'') + J;};
    var piece = time.split(':');
    var mins = piece[0]*60 + +piece[1] + +minsToAdd;
  
    return tConvert(D(mins%(24*60)/60 | 0) + ':' + D(mins%60));  
  }  


  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  const disabledDates = {
    '2021-11-20': {disabled: true},
    '2021-11-21': {disabled: true},
    '2021-11-22': {disabled: true}
  }


  const addAppointment = () => {
    let appointment = {
      date: selectedDate,
      service: slctService.id,
      hour: slctTime.id
    }

    
    const createAppointment = async () => {
      let response = await appointment_api.createAppointment(token, appointment)
      console.log(response)
      if(response.status === "OK"){
        toast.current.show("Cita creada con exito 🦷.", {
          type: "success",
          duration: 3000,
          animationType: "zoom-in"
        });
        setTimeout(() => {
          navigation.navigate('Tabs')
        }, 2000);
      }
    }

    createAppointment()
  }


    return (
      <View style={styles.rootContainer}>
        <Toast ref={toast} />   
        <View style={styles.container}>
            <View style={styles.header}>
              <IconButton onPress={() =>  navigation.navigate('Tabs')}
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              />
              <View style={styles.header_title_container}>
                <Typography size={30} bold={true}>
                    Agendar una cita
                </Typography>
              </View>
            </View>

          <View style={styles.body}>
            <ButtonTextIcon title={'open'} onPress={
              () =>  navigation.navigate('selectService')
            }
             icon={<Tooth height="24" width="24" color='#353535'/>}
             >
            {
            !slctService ? 
              'Selecciona tú servicio' :
              'Servicio:  '+ slctService.name
            }
            
            </ButtonTextIcon>

            <ButtonTextIcon title={'open'} onPress={
              () =>  {
                popup.show({
                  bodyComponent: () => calendarComponent(),
                  confirmText: 'Regresar',
                  type: 'confirm',
                  iconEnabled: false,
                  buttonEnabled: false,
              });
              }
            }
             icon={<CalendarPic height="24" width="24" color='#353535'/>}
             >
            {
            !selectedDate ? 
              'Selecciona la fecha de tu cita' :
              'Fecha:  '+ selectedDate
            }
            
            </ButtonTextIcon>
            {
              selectedDate && slctService && hours ?
              <View style={styles.visibleContainer}>
                <Typography size={25} bold={false}>
                  Horario:
                </Typography>
                <RNSingleSelect
                data={hours}
                placeholder={'Selecciona la hora de tu cita'}
                width={325}
                menuItemTextStyle={{ fontSize: 18 }}
                menuBarContainerWidth={325}
                buttonContainerStyle={{
                  borderRadius: 10,
                  backgroundColor: '#E3E3E3',
                }}
                arrowImageStyle={{
                  tintColor: '#E3E3E3',
                }}
                darkMode={false}
                searchEnabled={false}
                initialValue={slctTime ? slctTime : null}
                onSelect={(selectedItem) =>
                  {
                    setSlctTime(selectedItem)
                  }
                }
              />

            <Button onPress={addAppointment}>
              Confirmar datos de cita
            </Button>

            <View style={{
              marginTop: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: 325,                
            }}>

              <Typography style={{...styles.text_indication,color:'#787878'}}
              size={16} bold={false}>              
                Revisa que tus datos esten correctos
              </Typography>
              <Info height="24" width="24" color='#787878'/>
            </View>
            
            </View> 
            :

            <View style={{
              marginTop: 50,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              width: 325,                
            }}>

              <Typography style={{...styles.text_indication,color:'#787878'}}
              size={16} bold={false}>              
                Selecciona los datos de tu cita 
              </Typography>
              <Info height="24" width="24" color='#787878'/>
            </View>
            
            }
          </View>
            
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
    flex: 1,
    },

    container: {
      margin: 20,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'

    },

    header: {
        width: '100%',
        paddingLeft: 20,        
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    body: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90%',
    },

  
    header_title_container: {
      width: '100%',
      flexDirection: 'row',
      paddingLeft: 20,      
      justifyContent: 'flex-start',
    },   

    visibleContainer: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    calendar: {
      marginTop: 30,
    },
      
    })

export default MakeAppointment
