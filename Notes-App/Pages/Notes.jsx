import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Comps/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../Comps/Note';
import { Input } from '@rneui/themed';

export default function Notes(props) {
    const [categoryId, setCategotyId] = useState(props.route.params.id);
    const [categoryName, setCategotyName] = useState(props.route.params.name);
    const [note, setNote] = useState('');
    const [notesToRender, setNotesToRender] = useState(<Text>Loading...</Text>);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        renderNotes();
    }, []);

    // useEffect(() => {
    //     renderNotes();
    // }, [notes]);

    async function renderNotes() {
        //await AsyncStorage.removeItem('notes');
        let notesFromSto = await AsyncStorage.getItem('notes');
        if (!notesFromSto) {
            setNotes([]);
        } else {
            notesFromSto = JSON.parse(notesFromSto);
            setNotes(notesFromSto);
        }

        let filteredNotes = notesFromSto.filter((note) => note.categoryId === categoryId);
        let index = 1;
        let toRender = filteredNotes.map((note) => {
            return <Note name={note.note} key={index++} />;
        });

        if (toRender.length === 0) {
            toRender = <Text>No notes created !</Text>;
        }
        setNotesToRender(toRender);
    }

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 10 }}></View>
            <Text style={{ fontSize: 30, color: 'green' }}>{categoryName} Notes</Text>
            <Input
                placeholder='Comment'
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={(value) => {
                    setNote(value);
                }}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                    //props.navigation.navigate('Add Note', { categoryId });
                    if (!note) {
                        return alert('Fill text before saveing');
                    }
                    await AsyncStorage.setItem('notes', JSON.stringify([...notes, { categoryId, note }]));
                    renderNotes();
                }}
            >
                <Text style={styles.btn}>Save Note!</Text>
            </TouchableOpacity>
            <View>{notesToRender}</View>
        </View>
    );
}
