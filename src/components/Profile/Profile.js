import React, {useContext} from 'react'
import {View, Text} from 'react-native'
import Button from '../Atoms/Button';
import { AuthContext } from '../Context/context';



const Profile = () => {

    const { signOut } = useContext(AuthContext);


    return (
        <View>
            <Button onPress={() => signOut()}>Iniciar sesión</Button>
        </View>
    )
}

export default Profile
