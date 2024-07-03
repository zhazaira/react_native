import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Logout = () => {
  return (
    <View style={styles.container}>
      <Text>Logout Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Logout;
