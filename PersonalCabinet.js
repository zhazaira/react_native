import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PersonalCabinet = () => {
  return (
    <View style={styles.container}>
      <Text>Personal Cabinet Screen</Text>
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

export default PersonalCabinet;
