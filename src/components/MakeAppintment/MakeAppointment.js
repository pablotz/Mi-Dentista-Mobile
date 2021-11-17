import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import {
  LeftArrow, 
  Calendar, 
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


const MakeAppointment = ({navigation, route}) => {

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [minDate, setMinDate] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null)
  const [slctService, setSlctService] = useState(null)
  const [slctTime, setSlctTime] = useState('')

  const {service} = route.params;

  const getDate = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    setMinDate(date)
  }

  useEffect(() => {
    if(service) {
    setSlctService(service)
    }
  }, [service])


  const openDatePicker = () => {
      setShowDatePicker(true)
    }

  const onCancel = () => {
    // You should close the modal in here
    setShowDatePicker(false)
  }

  const onConfirm = ( date ) => {
    // You should close the modal in here
    setShowDatePicker(false)
    
    // The parameter 'date' is a Date object so that you can use any Date prototype method.
    console.log(date)
    var meses = new Array ("ene.","feb.","mar.","abr.","may.","jun.","jul.","ago.","sep.","oct.","nov.","dic.");
    setSelectedDate(date.getDate() + " de " + meses[date.getMonth()] + " de " + date.getFullYear())
  }

  useEffect(() => {
    getDate()
  }, [])


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
            <ButtonTextIcon title={'open'} onPress={openDatePicker}
             icon={<Calendar height="24" width="24" color='#353535'/>}
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

            <DatePicker
              isVisible={showDatePicker}
              mode={'single'}
              onCancel={onCancel}
              onConfirm={onConfirm}
              minDate={minDate}
              
            />

            

            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      height: '80%',
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
    }
      
    })

export default MakeAppointment
