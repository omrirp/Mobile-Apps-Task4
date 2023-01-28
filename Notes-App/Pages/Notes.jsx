import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Comps/styles';

export default function Notes(props) {
    const [categoryId, setCategotyId] = useState(props.route.params.id);
    const [categoryName, setCategotyName] = useState(props.route.params.name);

    useEffect(() => {
        console.log(categoryId, categoryName);
    }, [categoryId, categoryName]);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}></View>
            <Text style={{ fontSize: 30, color: 'green' }}>{categoryName} Notes</Text>

        </View>
    );
}
