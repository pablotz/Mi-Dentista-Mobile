import React, {useState, useEffect} from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {LeftArrow, Calendar, Tooth} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import ServiceItem from '../ServiceItem/ServiceItem';
import Typography from '../Atoms/Typography'
import AscyncStorage from '@react-native-community/async-storage';
import service_api from '../../service/service'

const SelectService = ({navigation, route}) => {

    useEffect(() => {
        const getServices = async () => {
          let userToken
          userToken = await AscyncStorage.getItem('userToken');
          
          let response = await service_api.getService(userToken)
          response = response.filter(item =>  item.estatus == 1 )
          setServiceList(response)
        }
        getServices()
        
      }, [])

    const [serviceList, setServiceList] = useState([])

    return (
        <ScrollView contentContainerStyle={styles.cards_container}>

            <View style={styles.header}>
              <IconButton onPress={() =>  navigation.navigate('makeAppointment', {service: null})}
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              />
              <View style={styles.header_title_container}>
                <Typography size={25} bold={true}>
                    Selecciona tu servicio
                </Typography>
              </View>
            </View>

            {
            serviceList.map(item => {
                return (
                    <ServiceItem
                        navigation={navigation}
                        dataService={item}
                    />
                )
            })
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    cards_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 20,
        alignItems: 'center'
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



})

export default SelectService
