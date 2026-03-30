import { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { CheckBox } from '@rneui/themed';

const defaultTasks = [
  { key: '1', description: 'Go to the gym', completed: false },
  { key: '2', description: 'Respond to work emails', completed: false },
  { key: '3', description: 'Pick up prescription', completed: true },
];

export default function App() {
  const [tasks, setTasks] = useState(defaultTasks);
  const [inputText, setInputText] = useState('');

  const toggleTask = (key) => {
    setTasks(
      tasks.map((task) => {
        if (task.key === key) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const addTask = () => {
    if (inputText.trim() === '') return;
    const newTask = {
      key: String(Date.now()),
      description: inputText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setInputText('');
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskCard}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTask(item.key)}
          checkedColor="#fff"
          uncheckedColor="rgba(255,255,255,0.6)"
          containerStyle={styles.checkbox}
        />
        <Text style={[styles.taskText, item.completed && styles.taskDone]}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TODO</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="New task..."
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f5f0',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1c3a2b',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#d4e0d8',
  },
  addButton: {
    backgroundColor: '#1c3a2b',
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  taskCard: {
    backgroundColor: '#4a7c59',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    marginRight: 8,
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.6,
  },
});