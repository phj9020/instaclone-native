import React from 'react';
import {Ionicons} from '@expo/vector-icons';

function TabIcon({ focused, iconName, color}) {
    return (
        <Ionicons name={focused ? iconName : `${iconName}-outline`} color={color} size={22} />
    )
}

export default TabIcon;
