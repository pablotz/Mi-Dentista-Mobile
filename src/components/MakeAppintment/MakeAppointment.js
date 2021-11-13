import React, {useState, useEffect} from 'react'
import {View, StyleSheet} from 'react-native'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import {LeftArrow, Calendar, Tooth} from '../Atoms/Icons'
import Typography from '../Atoms/Typography';
import DatePicker from 'react-native-neat-date-picker';
import Button from '../Atoms/Button'
import ButtonTextIcon from '../Atoms/ButtonIconText/IconTextButton';


const MakeAppointment = ({navigation}) => {

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [minDate, setMinDate] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null)

  const getDate = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    setMinDate(date)
  }

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
            <ButtonTextIcon title={'open'} onPress={() =>  navigation.navigate('selectService')}
             icon={<Tooth height="24" width="24" color='#fff'/>}
             >
            {
              'Selecciona tu servicio'
            }
            
            </ButtonTextIcon>
            <ButtonTextIcon title={'open'} onPress={openDatePicker}
             icon={<Calendar height="24" width="24" color='#fff'/>}
             >
            {
            !selectedDate ? 
              'Selecciona la fecha de tu cita' :
              'Fecha:  '+ selectedDate
            }
            
            </ButtonTextIcon>
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
  
      header_title_container: {
        width: '100%',
        flexDirection: 'row',
        paddingLeft: 20,      
        justifyContent: 'flex-start',
      },   
    })

export default MakeAppointment
