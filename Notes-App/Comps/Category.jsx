import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Category(props) {
    return (
        <TouchableOpacity
            onPress={() => {
                props.navigate('Notes', { id: props.id, name: props.name });
            }}
        >
            <View
                style={{
                    width: 250,
                    backgroundColor: 'orange',
                    borderRadius: 8,
                    marginTop: 10,
                    height: 50,
                    width: 300,
                    flex: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text style={{ fontSize: 30, textAlign: 'center' }}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
}
