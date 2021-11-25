import React, {useContext, useEffect, useState} from 'react'
import ButtonRed from '../Atoms/Button_red';
import ButtonSmall from '../Atoms/Button_small';
import { AuthContext } from '../Context/context';
import Typography from '../Atoms/Typography';
import { View, Text, StyleSheet} from 'react-native'
import ButtonTextIconBg from '../Atoms/ButtonIconTextBg/IconTextButtonBg';
import {
    Doctor
} from '../Atoms/Icons';
import AscyncStorage from '@react-native-community/async-storage';
import user_api from '../../service/user';

const Profile = ({navigation}) => {

    const [user, setUser] = useState(null);

    const getUser = async () => {
        let userToken = await AscyncStorage.getItem('userToken');
        let response = await user_api.getUserData(userToken);
        setUser(response);
    }

    useEffect(() => {
        getUser();
        const willFocusSubscription = navigation.addListener('focus', () => {
            getUser();
        });
    }, [])

    const { signOut } = useContext(AuthContext);

    return (
        <View>
            {
                user ?
            <View style={styles.userInfo}>
                <Typography bold={true} size={25}>¡Hola, {`${user.user_name} ${user.last_name}`}!</Typography>
                <Typography bold={false} size={25}>correo: {user.email} </Typography>
            </View>
            :
            null
            }
            <View style={styles.btnBills}>
                <ButtonTextIconBg title={'open'} onPress={
                () =>  navigation.navigate('History')
                }
                icon={<Doctor height="70" width="70" color='#353535'/>}
                >
                    Historial de citas
                </ButtonTextIconBg>
            </View>
            <View style={styles.btnLogout}>
                <ButtonSmall onPress = {() => navigation.navigate("ChangeData")}>Cambiar datos</ButtonSmall>
                <ButtonRed onPress={() => signOut()}>Cerrar sesión</ButtonRed>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnLogout: {
        alignItems: 'center',
        marginTop: 30
    },


    btnBills: {
        marginTop: 50,
        alignItems: 'center',
    },

    userInfo: {
        alignItems: 'center',
        marginTop: '40%',
    }
  });

export default Profile
