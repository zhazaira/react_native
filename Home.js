import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LogoImage from './assets/logo.png'; 

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <Text>This is where your main content would go.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
