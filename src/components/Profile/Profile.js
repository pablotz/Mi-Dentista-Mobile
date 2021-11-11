import React, {useContext} from 'react'
import ButtonRed from '../Atoms/Button_red';
import ButtonSmall from '../Atoms/Button_small';
import { AuthContext } from '../Context/context';
import Typography from '../Atoms/Typography';
import { View, Text, StyleSheet} from 'react-native'

const Profile = () => {

    const { signOut } = useContext(AuthContext);


    return (
        <View>
            <View style={styles.userInfo}>
                <Typography bold={true} size={25}>¡Hola, Pablo Hernández Castillo!</Typography>
                <Typography bold={false} size={25}>correo: pablotroll100@gmail.com</Typography>
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
        marginTop: '60%',
    },

    userInfo: {
        alignItems: 'center',
        marginTop: '40%',
    }
  });

export default Profile
