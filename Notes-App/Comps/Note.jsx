import { View, Text } from 'react-native';
import React from 'react';

export default function Note(props) {
    return (
        <View
            style={{
                width: 250,
                backgroundColor: 'purple',
                borderRadius: 8,
                marginTop: 10,
                height: 50,
                width: 300,
                flex: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: 'white' }}>{props.name}</Text>
        </View>
    );
}
