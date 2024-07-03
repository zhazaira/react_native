import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Grades from './Grades';
import Schedule from './Schedule';
import SideMenu from './SideMenu';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
    <Stack.Screen name="Grades" component={Grades} options={{ title: 'Grades' }} />
    <Stack.Screen name="Schedule" component={Schedule} options={{ title: 'Schedule' }} />
  </Stack.Navigator>
);

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main" drawerContent={(props) => <SideMenu {...props} />}>
        <Drawer.Screen name="Main" component={MainStack} options={{ title: 'Main' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
