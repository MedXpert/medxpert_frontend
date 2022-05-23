import {View, Switch, StyleSheet} from 'react-native'
import React, {useState} from 'react';
import {CustomText} from '../../components/general/CustomText';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const Emergency = ()=>{
    const[isEnabled, setIsEnabled] = useState(false);
    
    const toggleSwitch = ()=>{
        setIsEnabled(!isEnabled);
    };

    return(
        <View style={StyleSheet.container}>
            <View style={styles.paddingHr25}>
                <CustomText fontWeight='bold'
                content = "Choose contact method incase of emergency"
                fontColor = {colors.gray}
                customStyles={styles.textSpacing}
                    />
                    
            </View>

        </View>
    )
}
const styles= StyleSheet.create({
    container:{},
    selectButton:{},
    alignRow:{},
    paddingHr25:{},
    padding20:{},
    textSpacing:{},
    textSpacingBig:{},
    padding15:{},
    timeBox:{},
    switchBox:{},
    previousButton:{},
    customText:{},
    sequence:{},
    sequenceText:{}


})


export default Emergency;