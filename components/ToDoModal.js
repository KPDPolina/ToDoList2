import React from 'react';
import { StyleSheet, Keyboard, Text, View, SafeAreaView, FlatList, TouchableOpacity, KeyboardAvoidingView, TextInput, Alert, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../Colors';
import { MaterialIcons } from '@expo/vector-icons';
import {Swipeable} from 'react-native-gesture-handler'

export default class ToDoModal extends React.Component {
    state = {
        newTodo: ""
    };

    createTwoButtonAlert = () =>
      Alert.alert(
        "Alert Title",
        "My Alert Msg",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
    );

    toglleTodoComplited = index =>{
        let list = this.props.list;
        list.todos[index].completed =  !list.todos[index].completed;

        this.props.updateList(list);
    };

    addTodo = () => {
        let list = this.props.list
        list.todos.push({title: this.state.newTodo, completed: false})

        this.props.updateList(list)
        this.setState({newTodo: ""})

        Keyboard.dismiss()
    }

    renderTodo = (todo, index) => {
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toglleTodoComplited(index)}>
                    <FontAwesome name={todo.completed ? "square" : "square-o"} size={24} color="black" style={{ width: 32 }} />
                </TouchableOpacity>
                <Text style={[styles.todo, { color: colors.black }]}>{todo.title}</Text>
            </View>
        );
    };

    render() {
        const list = this.props.list;

        const taskCount = list.todos.length;
        const completedCount = list.todos.filter(todo => todo.completed == true).length;

        return (
            <KeyboardAvoidingView style={{flex: 1}} behavior="height" >

                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}
                        onPress={this.props.closeModal}>
                        <AntDesign name="close" size={24} color={colors.light_blue} />
                    </TouchableOpacity>

                    <View style={[styles.section]}>
                        <View>
                            <Text style={styles.title}>{list.name}</Text>
                            <Text style={styles.tasksCount}>
                                Done {completedCount} of {taskCount} tasks
                        </Text>
                        </View>

                        <View style={[styles.section, { flex: 3 }]}>
                            <FlatList
                                data={list.todos}
                                renderItem={({ item, index }) => this.renderTodo(item, index)}
                                keyExtractor={(_, index)=> index.toString()}
                                contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 32 }}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                    <View style={[styles.footer]}>
                        <TextInput style={[styles.input, { borderColor: list.color }]} 
                        onChangeText={text => this.setState({newTodo: text})}
                        value={this.state.newTodo} />
                        <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                            <AntDesign name="plus" size={20} color={colors.wight} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </KeyboardAvoidingView>

        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 30,
        alignSelf: "center",
        marginTop: 60,
    },
    tasksCount: {
        color: colors.light_blue,
        alignSelf: "center"
    },
    section: {
        // height: "90%",
        flex: 1,
        alignSelf: "stretch",
        // backgroundColor: "#999"
    },
    footer: {
        paddingHorizontal: 16,
        paddingBottom: 25,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 3,
        // backgroundColor: "#022"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderRadius: 8,
        marginRight: 8,
        paddingHorizontal: 8,
    },
    addTodo: {
        padding: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: colors.black,
        fontSize: 20,
        fontWeight: "600"
    }
});