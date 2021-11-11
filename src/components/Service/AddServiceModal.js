import React from 'react'
import { View, Text, StyleSheet, TextInput, SafeAreaView, CheckBox } from 'react-native'
import Modal from "react-native-modal";
import Typography from '../Atoms/Typography';


const AddServiceModal = ({isVisible}) => {
    return (
        <View>
            <Modal isVisible={isVisible}>
                <View style={{flex:1}}>
                    <Typography  size={16} bold={true}>
                        Nuevo servicio
                    </Typography>
                </View>
            </Modal>
        </View>
    )
}

export default AddServiceModal
