import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Categories from './Pages/Categiries';
import Notes from './Pages/Notes';
import MainPage from './Pages/MainPage';
import AddCategory from './Pages/AddCategory';

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Main Page'>
                <Stack.Screen name='Main Page' component={MainPage} />
                <Stack.Screen name='Notes' component={Notes} />
                <Stack.Screen name='Add Category' component={AddCategory} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
});
