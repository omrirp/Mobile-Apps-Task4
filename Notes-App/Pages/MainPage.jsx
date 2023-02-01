import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Comps/styles';
import Category from '../Comps/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainPage(props) {
    const [categories, setCategories] = useState(<Text>Loading...</Text>);

    useEffect(async () => {
        let categoriesFromSto = await AsyncStorage.getItem('categories');
        let toRender;
        if (!categoriesFromSto) {
            toRender = <Text>'No category cteated!'</Text>;
        } else {
            toRender = <Text>Loading...</Text>;
            categoriesFromSto = JSON.parse(categoriesFromSto);
            toRender = categoriesFromSto.map((category) => {
                return <Category name={category.name} id={category.id} key={category.id} navigate={props.navigation.navigate} />;
            });
        }
        setCategories(toRender);
    }, []);

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}></View>

            <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'red', backgroundColor: 'grey', borderRadius: 8 }}>Notes App</Text>
            <View style={styles.btns}>
                <TouchableOpacity
                    style={styles.btns}
                    onPress={() => {
                        props.navigation.navigate('Add Category');
                    }}
                >
                    <Text style={styles.btn}>Add Categories</Text>
                </TouchableOpacity>
            </View>

            <View>{categories}</View>
        </View>
    );
}
