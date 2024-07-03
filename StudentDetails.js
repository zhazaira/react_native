import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StudentDetails = ({ route }) => {
  const { student } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Details:</Text>
      <View style={styles.detailsContainer}>
        <Text>{`First Name: ${student.first_name}`}</Text>
        <Text>{`Middle Name: ${student.middle_name}`}</Text>
        <Text>{`Last Name: ${student.last_name}`}</Text>
        <Text>{`Date of Birth: ${student.date_of_birth}`}</Text>
        <Text>{`Email: ${student.email}`}</Text>
        <Text>{`Phone: ${student.phone}`}</Text>
        <Text>{`Faculty: ${student.faculty}`}</Text>
        <Text>{`Speciality: ${student.speciality}`}</Text>
        <Text>{`Status: ${student.status}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default StudentDetails;
