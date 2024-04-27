import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';

const App = () => {
  const [inputText, setInputText] = useState("")
  const addItem = () => {
    if (inputText) {
      setTodos([...todos, {
        id: Math.random() * 1000, title: inputText, completed: false,
      }]);
      setInputText("")
    };
  };
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: 'This is sample todo',
      completed: false,
    },
    {
      id: 2,
      title: 'Attnend the marrige',
      completed: true,
    },
    {
      id: 3,
      title: 'Footboll mach',
      completed: false,
    },
  ]);
  const TodoItem = ({ todo }) => (
    <View style={styles.itemView}>
      {todo.completed ? (
        <View style={styles.itemLeft}>
          <Image style={styles.chekimg}
            source={require('./src/astess/icons/360_F_481291655_abKa4ZaInSxHVz0a15DFclfxqKeLkESt-removebg-preview.png')} />
          <Text style={styles.itemTitle}>{todo.title}</Text>
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => markAsDone(todo)} style={styles.itemLeft}>
          <View style={styles.circleView}></View>
          <Text style={styles.itemTitle}>{todo.title}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.itemlevel}>
        {todo.completed && (
          <TouchableOpacity
            onPress={() => markAsDone(todo)}>
            <Image style={styles.undoicon}
              source={require('./src/astess/icons/png-clipart-blue-arrow-blue-angle-logo-text-symbol-undo-blue-angle-thumbnail-removebg-preview.png')} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => removeItem(todo)}>
          <Image style={styles.img}
            source={require('./src/astess/icons/download-removebg-preview.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const removeItem = todo => {
    setTodos(todos.filter(el => el.id !== todo.id));
  };
  const markAsDone = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item, 
            completed: !item.completed, 
          };
        };
        return item;
      }),
    );
  };
 

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>My ToDo</Text>
        <View style={styles.sectionView}>
          <Text style={styles.sectionTitle}>ToDo List</Text>
          {todos.filter((item) =>
            !item.completed).map((todo) =>
              <TodoItem key={todo.id}
                todo={todo} />)}
          <View style={styles.newItemView}>
            {/* <Text>+</Text> */}
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              style={styles.input}
              placeholder='Type new todo...' />
            <TouchableOpacity
              onPress={addItem}
              style={styles.addButton}>
              <Text>Add New</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.sectionTitle}>Completed Todos</Text>
          {todos.filter((item) =>
            item.completed).map((todo) =>
              <TodoItem key={todo.id}
                todo={todo} />)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 19,
  },
  sectionView: {
    paddingVertical: 30,
  },
  circleView: {
    width: 22,
    height: 22,
    borderRadius: 22 / 2,
    borderColor: '#000',
    borderWidth: 2,
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'normal',
    marginLeft: 13,
  },
  newItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  itemlevel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 0,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: 'skyblue',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 1,
    color: '#fff',
  },
  img: {
    width: 20,
    height: 30,
    // marginLeft: 100,
  },
  chekimg: {
    width: 28,
    height: 38,
  },
  undoicon: {
    width: 38,
    height: 38,
    marginRight: 14,
  },
});

export default App;
