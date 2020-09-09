import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListaScreem from './telas/ListaScreem';
import CadastroScreem from './telas/CadastroScreem';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Listar">
        <Stack.Screen name="Listar" component={ListaScreem} 
        options={{title:"Lista"}}/>
        <Stack.Screen name="Cadastro" component={CadastroScreem} 
        options={{title:"Cadastro de Crientes"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
