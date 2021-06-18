import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Platform } from 'react-native';


function DismissKeyboard({children}) {

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback
            style={{flex: 1}} 
            onPress={dismissKeyboard} 
            disabled={Platform.OS === "web"}>
                {children}
        </TouchableWithoutFeedback>
    )
}

export default DismissKeyboard;
