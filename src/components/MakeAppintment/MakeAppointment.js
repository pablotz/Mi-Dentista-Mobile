import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import {
  LeftArrow, 
  CalendarPic, 
  Tooth, 
  Info
} from '../Atoms/Icons'
import Typography from '../Atoms/Typography';
import DatePicker from 'react-native-neat-date-picker';
import Button from '../Atoms/Button'
import ButtonTextIcon from '../Atoms/ButtonIconText/IconTextButton';
import RNSingleSelect, {
  ISingleSelectDataType,
} from "@freakycoder/react-native-single-select";
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Root, Popup } from 'react-native-popup-confirm-toast'




const MakeAppointment = ({navigation}) => {

  LocaleConfig.locales['es'] = {
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
    dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
  };

  LocaleConfig.defaultLocale = 'es';

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
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [minDate, setMinDate] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null)
  const [slctService, setSlctService] = useState(null)
  const [slctTime, setSlctTime] = useState('')

  const getDate = () => {
    let date = new Date();
    date.setDate(date.getDate());
    setMinDate(date)
  }

  useEffect(() => {
    getDate()
  }, [])

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  const disabledDates = {
    '2021-11-20': {disabled: true},
    '2021-11-21': {disabled: true},
    '2021-11-22': {disabled: true}
  }


  const staticData = [
    { id: 0, value: "7:30 am - 8:00 am" },
    { id: 1, value: "10:30 am - 11:30 am" },
    { id: 2, value: "12:00 pm - 1:30 pm" },
    { id: 3, value: "3:30 pm - 4:00 pm" },
    { id: 4, value: "6:00 pm - 7:00 pm" },
  ];

  const TxtComponent = () => {
    return (
      <View style={styles.txtContainer}>
        <Typography size={25} bold={true}>
        </Typography>
      </View>
    );
  }

  const addAppointment = () => {
    
  }


    return (
      <Root style={styles.rootContainer}>
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
              () =>  navigation.navigate('selectService', {
                setSlctService: setSlctService
              })
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
              selectedDate && slctService ?
              <View style={styles.visibleContainer}>
                <Typography size={25} bold={false}>
                  Horario:
                </Typography>
                <RNSingleSelect
                data={staticData}
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

            <Button>
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
      </Root>
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
