import 'react-native-url-polyfill/auto';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from './src/theme';

import Login from './src/screens/Login';
import FormScreen from './src/screens/Form';
import DashboardScreen from './src/screens/DashboardScreen';
import Details from './src/screens/Details';
import List from './src/screens/List';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

function EmptyScreen() {
  return null;
}

function CustomTabBarButton({
  iconName,
  label,
  focused,
  onPress,
  activeColor,
  inactiveColor,
  isLogout,
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      }}
      onPress={
        isLogout
          ? () => {
              Alert.alert("Logout", "Você deseja realmente sair?", [
                { text: "Cancelar", style: "cancel" },
                { text: "Sair", onPress: () => navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                  })
                },
              ]);
            }
          : onPress
      }
    >
      <Ionicons
        name={iconName}
        size={20}
        color={isLogout ? "red" : focused ? activeColor : inactiveColor} 
      />
      <Text
        style={{
          color: isLogout ? "red" : focused ? activeColor : inactiveColor, 
          fontWeight: isLogout ? "normal" : "bold",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function Auth() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.COLORS.GRAY_01,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarButton: ({ focused, ...props }) => (
            <CustomTabBarButton
              {...props}
              iconName="grid"
              label="Dashboard"
              focused={focused} 
              activeColor={theme.COLORS.BLUE} 
              inactiveColor={theme.COLORS.GRAY_03} 
              onPress={() => props.onPress()} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tarefas"
        component={List}
        options={{
          tabBarButton: ({ focused, ...props }) => (
            <CustomTabBarButton
              {...props}
              iconName="construct"
              label="Tarefas"
              focused={focused} 
              activeColor={theme.COLORS.BLUE} 
              inactiveColor={theme.COLORS.GRAY_03} 
              onPress={() => props.onPress()} 
            />
          ),
        }}
      />
      <Tab.Screen
        name="Logout"
        component={EmptyScreen}
        options={{
          tabBarButton: ({ ...props }) => (
            <CustomTabBarButton
              {...props}
              iconName="log-out-outline"
              label="Sair"
              focused={false} 
              activeColor="red" 
              inactiveColor="red"
              isLogout
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FormScreen" component={FormScreen} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}