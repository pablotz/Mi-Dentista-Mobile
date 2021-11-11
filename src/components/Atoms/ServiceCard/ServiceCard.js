import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Typography from '../Typography';
import IconButton from '../ButtonIcon/IconButton';
import { Add } from '../Icons';

export default function ServiceCard({cardColor,text,icon}) {
  
    const cardStyle = StyleSheet.create({
        service_card: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',            
            alignItems: 'center',            
        },
        icon_button: {
            backgroundColor: '#1BD15D',
        },
        text_description: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 60,
            width: 250,
            backgroundColor: cardColor,
            borderRadius: 15,
        },        
    })

    return ( 
        <View style={cardStyle.service_card}>
            <View style={cardStyle.text_description}>
                {icon}  
                <Typography  size={14} bold={false}>              
                    {text}
                </Typography>
            </View>
            {/* <IconButton style={{backgroundColor: '#1BD15D'}}
                icon={<Add height="24" width="24" color='#fff'/>}/> */}
        </View>
    )

}