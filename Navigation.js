import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Grades from './Grades';
import Schedule from './Schedule';
import PersonalCabinet from './PersonalCabinet';
import Settings from './Settings';
import Application from './Application';
import Logout from './Logout';
import { Image, View, Text, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? require('./assets/home_active.png') : require('./assets/home_active.png');
          } else if (route.name === 'Grades') {
            iconName = focused ? require('./assets/grades_logo.png') : require('./assets/grades_logo.png');
          } else if (route.name === 'Schedule') {
            iconName = focused ? require('./assets/schedule_logo.png') : require('./assets/schedule_logo.png');
          }

          return <Image source={iconName} style={{ width: 20, height: 20 }} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Grades" component={Grades} />
      <Tab.Screen name="Schedule" component={Schedule} />
    </Tab.Navigator>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Меню</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="MainTabs"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="MainTabs" component={MainTabs} options={{ drawerLabel: 'На главную' }} />
        <Drawer.Screen name="PersonalCabinet" component={PersonalCabinet} options={{ drawerLabel: 'Личный кабинет' }} />
        <Drawer.Screen name="Settings" component={Settings} options={{ drawerLabel: 'Настройки' }} />
        <Drawer.Screen name="Application" component={Application} options={{ drawerLabel: 'Заявление' }} />
        <Drawer.Screen name="Logout" component={Logout} options={{ drawerLabel: 'Выйти' }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    backgroundColor: 'blue',
    padding: 20,
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Navigation;
