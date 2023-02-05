import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../Comps/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from '../Comps/Note';
import { Input } from '@rneui/themed';

export default function Notes(props) {
    // Category id
    const [categoryId, setCategotyId] = useState(props.route.params.id);
    // Category name
    const [categoryName, setCategotyName] = useState(props.route.params.name);
    // Note text that come from the use input
    const [note, setNote] = useState('');
    // All Notes related to Categoty id in React Component format: <Note/>
    const [notesToRender, setNotesToRender] = useState(<Text>Loading...</Text>);
    // All Notes in JSON format: {categoryId:number, note:text}
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        renderNotes();
    }, []);

    // Support function for rendering Notes
    async function renderNotes() {
        //await AsyncStorage.removeItem('notes');

        // Get all notes from sto
        let notesFromSto = await AsyncStorage.getItem('notes');
        if (!notesFromSto) {
            returnsetNotes([]);
        } else {
            notesFromSto = JSON.parse(notesFromSto);
            setNotes(notesFromSto);
        }

        // Filter the Notes for the relevent Category id
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
                placeholder='Add Note!'
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={(value) => {
                    setNote(value);
                }}
            />
            <TouchableOpacity
                style={styles.btn}
                onPress={async () => {
                    if (!note) {
                        return alert('Fill text before saveing');
                    }
                    // Concat the new Note to the Notes array ans save in sto
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
