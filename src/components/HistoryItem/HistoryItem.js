import React, {useState} from 'react'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import Typography from '../Atoms/Typography'

const HistoryItem = ({dataService, setSlctService, navigation}) => {

    const [data, setData] = useState(dataService)
    const [serviceHere, setServiceHere] = useState(null)

    const {name, price, duration, id, date} = data

    return (
    <TouchableHighlight 
        style={styles.cardService}
        key={id} 
        >
            <View>
                <Typography size={25} bold={true}>{name}</Typography>
                <Typography size={20} bold={false}>Fecha: {date}</Typography>
                <Typography size={20} bold={false}>Duración: {duration} minutos</Typography>
                <Typography size={22} bold={false}>Precio: {price}</Typography>
            </View>
    </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
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
})

export default HistoryItem
