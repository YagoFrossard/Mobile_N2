import { StyleSheet, Text, View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import LoginPage from '../LoginPage';
import CadastroPage from '../CadastroPage';
import MensagensPage from '../MensagensPage';
import Conversa from '../Conversa';

const Stack = createNativeStackNavigator();
const headerHeight = Platform.OS === 'ios' ? 120 : StatusBar.currentHeight + 80;

export default function ContatosPage() {

    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="screen" detachInactiveScreens={true}>
                <Stack.Screen name="Login" component={LoginPage} options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 32,
                        color: '#FFF'
                    },
                    headerStyle: {
                        backgroundColor: '#2DBDF1',
                        height: headerHeight
                    }
                }}></Stack.Screen>
                <Stack.Screen name="Cadastro" component={CadastroPage} options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 32,
                        color: '#FFF'
                    },
                    headerStyle: {
                        backgroundColor: '#2DBDF1',
                        height: headerHeight
                    },
                    headerBackVisible: false
                }}></Stack.Screen>
                <Stack.Screen name="Mensagens" component={MensagensPage}  options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 32,
                        color: '#FFF'
                    },
                    headerStyle: {
                        backgroundColor: '#2DBDF1',
                        height: headerHeight
                    },
                    headerBackVisible: false
                }}></Stack.Screen>
                <Stack.Screen name="Conversa" component={Conversa}  options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontSize: 32,
                        color: '#FFF'
                    },
                    headerStyle: {
                        backgroundColor: '#2DBDF1',
                        height: headerHeight
                    },
                    headerBackVisible: true
                }}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}