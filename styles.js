import { StyleSheet } from 'react-native';

export const lightTheme = StyleSheet.create({
    colors : {
        backgroundColor: '#474747',
        color: 'white',
        borderColor: 'rgb(219,219,219)',
    },
    accent: {
        backgroundColor: '#0095f6',
    }
});

export const darkTheme = StyleSheet.create({
    colors : {
        backgroundColor: 'black',
        color: '#faf7ff',
        borderColor: 'rgb(205, 217, 229)',
    },
    accent: {
        backgroundColor: '#c395fe',
    }
})