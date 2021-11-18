import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import {LeftArrow, Calendar, Tooth} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import ServiceItem from '../ServiceItem/ServiceItem';
import Typography from '../Atoms/Typography'



const SelectService = ({navigation, route}) => {

    const dummyData = [
        {
            id: 1,
            name: 'Limpieza bucal',
            price: '$100',
            duration: 60,
        },
        {
            id: 2,
            name: 'Extracción dental',
            price: '$200',
            duration: 30,
        },
        {
            id: 3,
            name: 'Aplicación de resina',
            price: '$300',
            duration: 90,
        },
        {
            id: 4,
            name: 'Service 4',
            price: '$400',
            duration: 120,
        },
        {
            id: 5,
            name: 'Service 5',
            price: '$500',
            duration: 35,
        },
        {
            id: 6,
            name: 'Service 6',
            price: '$600',
            duration: 35,
        },
        {
            id: 7,
            name: 'Service 7',
            price: '$700',
            duration: 45,
        },
        {
            id: 8,
            name: 'Service 8',
            price: '$200',
            duration: 55,
        },
        {
            id: 9,
            name: 'Service 9',
            price: '$150',
            duration: 160,
        }
        
    ]

    return (
        <ScrollView contentContainerStyle={styles.cards_container}>

            <View style={styles.header}>
              <IconButton onPress={() =>  navigation.navigate('makeAppointment')}
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              />
              <View style={styles.header_title_container}>
                <Typography size={25} bold={true}>
                    Selecciona tu servicio
                </Typography>
              </View>
            </View>

            {
            dummyData.map(item => {
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
