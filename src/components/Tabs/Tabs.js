import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput, SafeAreaView, CheckBox } from 'react-native'


const Tab = createBottomTabNavigator();

const Tabs = () => {

    const Home = () => {
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Citas" component={Home} />
            <Tab.Screen name="Servicios" component={Home} />
            <Tab.Screen name="Perfil" component={Home} />
        </Tab.Navigator>
    )
}

export default Tabs

