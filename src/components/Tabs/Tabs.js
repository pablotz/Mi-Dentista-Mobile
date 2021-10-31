import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, TextInput, SafeAreaView, CheckBox, Image } from 'react-native'


const Tab = createBottomTabNavigator();

const ICON_HEIGHT = 28;
const ICON_WIDTH = 28;
const ICON_COLOR_FOCUS = '#2361b8';
const ICON_COLOR_NEUTRAL = '#999999';

const tabOptions = {
    showLabel: false,
    tabBarActiveTintColor: 'green',
    tabBarInactiveTintColor: 'gray',
    tabfontSize: 30,
    tabBarLabelStyle: {
        fontSize: 18,
        fontFamily: 'Roboto-Bold',
    },
        style: { height: 300 },
}

const Tabs = () => {

    const Home = () => {
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
    
    return (
        <Tab.Navigator
        
        screenOptions={({ route }) => ({
            tabBarShowLabel: false,
            tabBarStyle: { 
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                borderRadius: 20,
                height: 70,
            },
        })}

        >
            <Tab.Screen name="Home" component={Home}
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                       <Image source={require('../../Assets/icons/home.png')} 
                       style={{ 
                           width: ICON_WIDTH, 
                           height: ICON_HEIGHT,
                           tintColor: focused ? ICON_COLOR_FOCUS : ICON_COLOR_NEUTRAL,
                           opacity: focused ? 1 : 0.8,

                        }} 
                       />
                       <Text style={ focused ? styles.tabLabel_focused :  styles.tabLabel_neutral}>Inicio</Text>

                    </View>
                ),
            }}
            />
            <Tab.Screen name="Servicios" component={Home} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../Assets/icons/thooth.png')} 
                        style={{ 
                            width: ICON_WIDTH, 
                            height: ICON_HEIGHT,
                            tintColor: focused ? ICON_COLOR_FOCUS : ICON_COLOR_NEUTRAL,
                            opacity: focused ? 1 : 0.8,

                        }} 
                        />
                    <Text style={ focused ? styles.tabLabel_focused :  styles.tabLabel_neutral}>Servicios</Text>
                    </View>
                ),
            }}/>
            
            <Tab.Screen name="Agendar cita" component={Home} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../Assets/icons/calendar.png')} 
                        style={{ 
                            width: ICON_WIDTH, 
                            height: ICON_HEIGHT,
                            tintColor: focused ? ICON_COLOR_FOCUS : ICON_COLOR_NEUTRAL,
                            opacity: focused ? 1 : 0.8,

                        }} 
                        />
                        <Text style={ focused ? styles.tabLabel_focused :  styles.tabLabel_neutral}>Citas</Text>
                    </View>
                ),
            }}/>
            <Tab.Screen name="Perfil" component={Home} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../Assets/icons/user.png')} 
                        style={{ 
                            width: ICON_WIDTH, 
                            height: ICON_HEIGHT,
                            tintColor: focused ? ICON_COLOR_FOCUS : ICON_COLOR_NEUTRAL,
                            opacity: focused ? 1 : 0.8,

                        }} 
                        />
                        <Text style={ focused ? styles.tabLabel_focused :  styles.tabLabel_neutral}>Perfil</Text>
                    </View>
                ),
            }}/>
        </Tab.Navigator>
    )
}

export default Tabs

const styles = StyleSheet.create({
    tabLabel_focused: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: '#2361b8',
    },
    tabLabel_neutral: {
        fontSize: 15,
        fontFamily: 'Roboto-Regular',
        color: '#999999',
    }
})

