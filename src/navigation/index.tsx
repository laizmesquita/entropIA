import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Sustentabilidade from '../components/Sustentabilidade';

export type RootStackParamList = {
  Home: undefined;
  Sustentabilidade: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Sustentabilidade" component={Sustentabilidade} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
