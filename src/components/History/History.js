import React, {useState, useEffect} from 'react'
import Typography from '../Atoms/Typography';
import Button from '../Atoms/Button';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native'
import {LeftArrow,Ghost} from '../Atoms/Icons'
import IconButton from '../Atoms/ButtonIcon/IconButton';
import ServiceCard from '../Atoms/ServiceCard/ServiceCard';
import Input from '../Atoms/Input'
import {Search} from '../Atoms/Icons'
import SelectService from '../SelectService/SelectService'
import ServiceItem from '../ServiceItem/ServiceItem';
import HistoryItem from '../HistoryItem/HistoryItem';

const History = ({navigation}) => {

  
    const dummyData = [
        {
            id: 1,
            name: 'Limpieza bucal',
            price: '$100',
            duration: 60,
            date: '12/12/2020',
        },
        {
            id: 2,
            name: 'Extracción dental',
            price: '$200',
            duration: 30,
            date: '12/12/2020',
        },
        {
            id: 3,
            name: 'Aplicación de resina',
            price: '$300',
            duration: 90,
            date: '12/12/2020',
        },
        {
            id: 4,
            name: 'Service 4',
            price: '$400',
            duration: 120,
            date: '12/12/2020',
        },
        {
            id: 5,
            name: 'Service 5',
            price: '$500',
            duration: 35,
            date: '12/12/2020',
        },
        {
            id: 6,
            name: 'Service 6',
            price: '$600',
            duration: 35,
            date: '12/12/2020',
        },
        {
            id: 7,
            name: 'Service 7',
            price: '$700',
            duration: 45,
            date: '12/12/2020',
        },
        {
            id: 8,
            name: 'Service 8',
            price: '$200',
            duration: 55,
            date: '12/12/2020',
        },
        {
            id: 9,
            name: 'Service 9',
            price: '$150',
            duration: 160,
            date: '12/12/2020',
        }
        
    ]

    const [history, setHistory] = useState([])

    useEffect(() => {
        setHistory(dummyData)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <IconButton onPress={() =>  navigation.navigate('Tabs')}
                icon={<LeftArrow height="24" width="24" color='#787878'/>}
              />
              <View style={styles.header_title_container}>
                <Typography size={35} bold={true}>
                    Historial de citas
                </Typography>
              </View>
            </View>

            <SafeAreaView style={styles.module_main}>

            <ScrollView contentContainerStyle={styles.cards_container}>

              {
              history.map(item => {
                  return (
                      <HistoryItem
                          navigation={navigation}
                          dataService={item}
                      />
                  )
              })
              }
            </ScrollView>
              
              
            </SafeAreaView>     
        </View>
    )
}

const styles = StyleSheet.create({


    container: {
      flex: 1,
      margin: 20,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },

    module_main: {
      display: 'flex',
      alignItems: 'flex-start',
      marginTop: 10,
      paddingBottom: 60,
    },

    text_indication: {
      display: 'flex',
      alignSelf: 'flex-start',
    },

    cards_container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
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

  });

  

export default History
