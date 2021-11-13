import React from 'react'
import {View, StyleSheet, ScrollView} from 'react-native'
import Typography from '../Atoms/Typography'
import {LeftArrow, Calendar, Tooth} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';



const SelectService = ({navigation}) => {

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
                <Typography size={30} bold={true}>
                    Agendar una cita
                </Typography>
              </View>
            </View>

            {
            dummyData.map(item => {
                return (
                    <View key={item.id} style={styles.cardService}>
                        <Typography size={25} bold={true}>{item.name}</Typography>
                        <Typography size={22} bold={false}>Precio: {item.price}</Typography>
                        <Typography size={20} bold={false}>Duración: {item.duration} minutos</Typography>
                    </View>
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

    cardService: {
        width: '96%',
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        elevation: 6,
        display: 'flex',
        direction: 'column',
        alignItems: 'center',
        justifyContent: 'center'
        
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
