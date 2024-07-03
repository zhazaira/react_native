import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import LogoImage from './assets/logo.png';
import { Picker } from '@react-native-picker/picker';

const Grades = () => {
  const [gradeTypes, setGradeTypes] = useState([]);
  const [disciplines, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gradesLoading, setGradesLoading] = useState(false);

  useEffect(() => {
    fetchGradeTypes();
  }, []);

  const fetchGradeTypes = async () => {
    try {
      const response = await axios.get('http://192.168.0.11:8000/api/type-of-grades/');
      setGradeTypes(response.data);
      fetchDisciplines(); 
    } catch (error) {
      console.error('Error fetching grade types:', error);
      setLoading(false);
    }
  };

  const fetchDisciplines = async () => {
    try {
      const response = await axios.get('http://192.168.0.11:8000/api/subjects/');
      setDisciplines(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching disciplines:', error);
      setLoading(false);
    }
  };

  const fetchGrades = async (disciplineId) => {
    setGradesLoading(true);
    try {
      const response = await axios.get(`http://192.168.0.11:8000/api/grades/?subject=${disciplineId}`);
      setGrades(response.data);
    } catch (error) {
      console.error('Error fetching grades:', error);
    } finally {
      setGradesLoading(false);
    }
  };

  const getGradeForType = (grades, gradeTypeId) => {
    const grade = grades.find(grade => grade.grade_type === gradeTypeId);
    return grade ? grade.grade : '';
  };

  const handleDisciplineChange = async (disciplineId) => {
    setSelectedDiscipline(disciplineId);
    await fetchGrades(disciplineId);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={LogoImage} style={styles.logo} />
        <Text style={styles.profileTitle}>Журнал оценок</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Выберите дисциплину:</Text>
        <Picker
          selectedValue={selectedDiscipline}
          style={styles.picker}
          onValueChange={(itemValue) => handleDisciplineChange(itemValue)}
        >
          <Picker.Item label="Выберите дисциплину..." value={null} color="#0000ff" />
          {disciplines.map((discipline) => (
            <Picker.Item key={discipline.id} label={discipline.name} value={discipline.id} color="#0000ff" />
          ))}
        </Picker>
      </View>

      {gradesLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.gradesContainer}>
          {gradeTypes.map((type) => (
            <View key={type.id} style={styles.gradeItem}>
              <View style={styles.gradeHeader}>
                <Text style={styles.gradeHeaderText}>{type.title}</Text>
              </View>
              <Text style={styles.gradeText}>{getGradeForType(grades, type.id)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  pickerContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: '#0000ff', 
  },
  picker: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  gradesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  gradeItem: {
    width: '45%', 
    aspectRatio: 1, 
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  gradeHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
    borderRadius: 5,
  },
  gradeHeaderText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#0000ff', 
  },
  gradeText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#0000ff', 
  },
});

export default Grades;
