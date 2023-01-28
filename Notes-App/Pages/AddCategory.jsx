import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Comps/styles';

export default function AddCategory(props) {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState(null);
    const [categoryCounter, setCategotyCounter] = useState(null);

    useEffect(async () => {
        //AsyncStorage.clear();
        let categoriesFromSto = await AsyncStorage.getItem('categories');
        if (!categoriesFromSto) {
            setCategories([]);
        } else {
            setCategories(JSON.parse(categoriesFromSto));
        }

        let counterFromSto = await AsyncStorage.getItem('categoryCounter');
        if (!counterFromSto) {
            setCategotyCounter(1);
        } else {
            setCategotyCounter(JSON.parse(counterFromSto));
        }
        console.log(categoriesFromSto);
        console.log(counterFromSto);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Add Category</Text>
            <TextInput
                value={name}
                placeholder='Category Name'
                style={styles.input}
                onChangeText={(t) => {
                    setName(t);
                }}
            ></TextInput>
            <TouchableOpacity style={styles.btns} onPress={() => {}}>
                <Text
                    style={styles.btn}
                    onPress={async () => {
                        if (name === '') {
                            alert('Category must have a name !');
                            return;
                        }
                        await AsyncStorage.setItem(
                            'categories',
                            JSON.stringify([...categories, { id: categoryCounter, name }])
                        );
                        await AsyncStorage.setItem('categoryCounter', JSON.stringify(categoryCounter + 1));
                        props.navigation.navigate('Main Page');
                    }}
                >
                    SUBMIT
                </Text>
            </TouchableOpacity>
        </View>
    );
}
