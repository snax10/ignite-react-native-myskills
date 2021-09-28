import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');
 
  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }
    setMySkills(oldState => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(skill => skill.id !== id));
  }

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGretting('Good Morning');
    } else if (currentHour < 18) {
      setGretting('Good Afternoon');
    } else {
      setGretting('Good Night');
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome, Carlos Santos
      </Text>

      <Text style={styles.greetings}>
        {gretting}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#999"
        onChangeText={setNewSkill}
      />

      <Button
        title="Add"
        onPress={handleAddNewSkill}
      />


      <Text style={[styles.title, { marginVertical: 50 }]}>
        My skills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    fontSize: 18,
    padding: 10,
    marginTop: 30,
    borderRadius: 7,
  },
  greetings: {
    color: '#FFF',
  }
});
