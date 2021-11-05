import React from 'react'
import {View} from 'react-native'
import AwesomeLoading from 'react-native-awesome-loading';


const Loading = () => {
    return (
        <View>
            <AwesomeLoading indicatorId={10} size={60} isActive={true}/>
        </View>
    )
}

export default Loading
