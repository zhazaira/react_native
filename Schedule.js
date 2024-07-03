import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import LogoImage from './assets/logo.png';

const Schedule = () => {
  const [dayOfWeekData, setDayOfWeekData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchDayOfWeekData = async () => {
      try {
        const response = await axios.get('http://192.168.0.11:8000/api/day-of-weeks/');
        setDayOfWeekData(response.data);
      } catch (error) {
        console.error('Error fetching day of week data:', error);
      }
    };

    fetchDayOfWeekData();
  }, []);

  const handleDaySelect = async (day) => {
    if (dayOfWeekData.length === 0) {
      console.error('Day of week data not loaded yet');
      return;
    }

    try {
      const selectedDateObj = new Date(day.dateString);
      const dayOfWeekId = selectedDateObj.getDay() === 0 ? 7 : selectedDateObj.getDay(); 

      const response = await axios.get(`http://192.168.0.11:8000/api/schedules/?day_of_week=${dayOfWeekId}`);
      setScheduleData(response.data);
      setSelectedDate(day.dateString);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      setScheduleData([]); 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={LogoImage} style={styles.logo} />
      </View>

      <Calendar
        onDayPress={(day) => handleDaySelect(day)}
      />

      <Text style={styles.subHeader}>Schedule for {selectedDate ? selectedDate : 'selected day'}:</Text>
      {scheduleData.length > 0 ? (
        <FlatList
          data={scheduleData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.scheduleItem}>
              <Text style={styles.scheduleText}>Time Start: {item.time_start}</Text>
              <Text style={styles.scheduleText}>Time End: {item.time_end}</Text>
              <Text style={styles.scheduleText}>Subject: {item.subject.name}</Text>
              <Text style={styles.scheduleText}>Teacher: {item.teacher.first_name} {item.teacher.last_name}</Text>
              <Text style={styles.scheduleText}>Room: {item.room}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No schedule for selected day</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  scheduleItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  scheduleText: {
    marginBottom: 5,
  },
});

export default Schedule;
