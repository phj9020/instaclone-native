import React from 'react';
import {View, StatusBar, ActivityIndicator} from 'react-native';

function ScreenLayout({loading, children}) {
    return (
        <View style={{backgroundColor: "black", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <StatusBar style="light" />
            {loading ? <ActivityIndicator color="white" /> : children }
        </View>
    )
}

export default ScreenLayout;
