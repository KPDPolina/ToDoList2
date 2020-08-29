import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './Colors';
import ToDoList from './components/ToDoList';
import AddListModal from './components/addListModal';
import Fire from './Fire'

export default class App extends React.Component {
  state = {
    addTodoVisible: false,
    lists: [],
    loading:true,
    user:{}
  }

  componentDidMount(){
    firebase=new Fire((error,user)=>{
      if(error){
          return alert("Uh oh, something went wrong");
      }

      firebase.getLists(lists=>{
        this.setState({lists,user},()=>{
          this.setState({loading:false});
        });
      })

      this.setState({user});
    });

  }

  componentWillUnmount(){
    firebase.detach();
}

  toglleTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible })
  }

  renderList = list => {
    return <ToDoList list={list} updateList={this.updateList}/>
  }

  addList = list => {
    firebase.addList({
      name:list.name,
      color:list.color,
      todos:[]
    })
  };

  updateList = list => {
    firebase.updateList(list);
  }

  render() {
    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.blue}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>

        <Modal animationType="slide"
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toglleTodoModal()}>
          <AddListModal closeModal={() => this.toglleTodoModal()} addList={this.addList}/>
        </Modal>
        <StatusBar backgroundColor={colors.blue} barStyle='light-content' />

        <View style={styles.title}>
          <Text style={styles.titleText}>ToDo App</Text>
        </View>

        <View style={styles.addList}>
          <TouchableOpacity style={styles.plus} onPress={() => this.toglleTodoModal()}>
            <AntDesign name="plus" size={40} color={colors.blue} />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, paddingBottom: 5 }}>
          <FlatList
            data={this.state.lists}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (this.renderList(item))}
            keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.wight,
  },
  title: {
    flexDirection: 'row',
    height: 40,
    backgroundColor: colors.blue,
    justifyContent: "center"
  },
  titleText: {
    color: colors.wight,
    fontSize: 25,
    fontStyle: "italic",
  },
  addList: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  plus: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.light_blue,
    borderStyle: "dotted"
  }

});
