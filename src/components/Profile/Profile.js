import React, {useContext} from 'react'
import ButtonRed from '../Atoms/Button_red';
import ButtonSmall from '../Atoms/Button_small';
import { AuthContext } from '../Context/context';
import Typography from '../Atoms/Typography';
import { View, Text, StyleSheet} from 'react-native'
import ButtonTextIconBg from '../Atoms/ButtonIconTextBg/IconTextButtonBg';
import {
    Doctor
} from '../Atoms/Icons';

const Profile = ({navigation}) => {

    const { signOut } = useContext(AuthContext);

    return (
        <View>
            <View style={styles.userInfo}>
                <Typography bold={true} size={25}>¡Hola, Pablo Hernández Castillo!</Typography>
                <Typography bold={false} size={25}>correo: pablotroll100@gmail.com</Typography>
            </View>
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
                <ButtonSmall>Cambiar contraseña</ButtonSmall>
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
