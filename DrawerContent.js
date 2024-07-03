// DrawerContent.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const DrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContent}>
      <DrawerContentScrollView>
        <DrawerItem
          label="Личный кабинет"
          onPress={() => {
            navigation.navigate('Profile');
          }}
        />
        <DrawerItem
          label="Настройки"
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
        <DrawerItem
          label="Заявление"
          onPress={() => {
            navigation.navigate('Application');
          }}
        />
        <DrawerItem
          label="Выйти"
          onPress={() => {
            // Handle logout logic here
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 20,
  },
});

export default DrawerContent;
