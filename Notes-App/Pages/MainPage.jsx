import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Comps/styles';
import Category from '../Comps/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function MainPage(props) {
    const [categories, setCategories] = useState(<Text>Loading...</Text>);

    // Render the Main page when the app is opened for the first time
    useEffect(() => {
        renderCategories();
    }, []);

    // Render the Main page each time the app returns to it
    useFocusEffect(
        React.useCallback(() => {
            renderCategories();
        }, [])
    );

    // Support function for rendering Categories
    async function renderCategories() {
        let categoriesFromSto = await AsyncStorage.getItem('categories');
        let toRender;
        if (!categoriesFromSto) {
            toRender = <Text>'No category cteated!'</Text>;
        } else {
            categoriesFromSto = JSON.parse(categoriesFromSto);
            toRender = categoriesFromSto.map((category) => {
                // Need to pass to Category the navigate function to gain the ability to navigate
                return <Category name={category.name} id={category.id} key={category.id} navigate={props.navigation.navigate} />;
            });
        }
        setCategories(toRender);
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}></View>

            <Text style={{ fontSize: 40, fontWeight: 'bold', color: 'red', backgroundColor: 'grey', borderRadius: 8 }}>Notes App</Text>
            <View style={styles.btns}>
                <TouchableOpacity
                    style={styles.btns}
                    onPress={() => {
                        // Navigate back to Main page after the Category was added
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
