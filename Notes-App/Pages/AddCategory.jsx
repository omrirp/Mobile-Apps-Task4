import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Comps/styles';
import { Input } from '@rneui/themed';

export default function AddCategory(props) {
    // Name of the Category that come from the user input
    const [name, setName] = useState('');
    // JSON Object arrat of Category in format of : {id:number, name:string}
    const [categories, setCategories] = useState(null);
    // Category counter
    const [categoryCounter, setCategotyCounter] = useState(null);

    useEffect(async () => {
        // Get Categories from sto
        let categoriesFromSto = await AsyncStorage.getItem('categories');
        if (!categoriesFromSto) {
            setCategories([]);
        } else {
            setCategories(JSON.parse(categoriesFromSto));
        }

        // Get Category counter from sto
        let counterFromSto = await AsyncStorage.getItem('categoryCounter');
        if (!counterFromSto) {
            setCategotyCounter(1);
        } else {
            setCategotyCounter(JSON.parse(counterFromSto));
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Add Category</Text>
            <Input
                placeholder='Add Category!'
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={(t) => {
                    setName(t);
                }}
            />
            <TouchableOpacity style={styles.btns} onPress={() => {}}>
                <Text
                    style={styles.btn}
                    onPress={async () => {
                        if (name === '') {
                            alert('Category must have a name !');
                            return;
                        }
                        // Concat the new Category, increment categoryCounter and save in sto
                        await AsyncStorage.setItem('categories', JSON.stringify([...categories, { id: categoryCounter, name }]));
                        await AsyncStorage.setItem('categoryCounter', JSON.stringify(categoryCounter + 1));
                        // Navigate back to Main page
                        props.navigation.navigate('Main Page');
                    }}
                >
                    SUBMIT
                </Text>
            </TouchableOpacity>
        </View>
    );
}
