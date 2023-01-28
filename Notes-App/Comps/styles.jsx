import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
    },
    btn: {
        backgroundColor: 'blue',
        borderRadius: 6,
        color: 'white',
        fontSize: 20,
        paddingHorizontal: 10,
    },
    input: {
        height: 40,
        margin: 12,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        width: 300,
    },
});

export default styles;
