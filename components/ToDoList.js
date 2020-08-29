import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import colors from '../Colors';
import ToDoModal from './ToDoModal';

export default class ToDoList extends React.Component {
    state = {
        showListVisible: false
    }

    toglleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }

    render() {
        const list = this.props.list;

        const completedCount = list.todos.filter(todo => todo.completed == true).length;
        const remainingCount = list.todos.length;

        return (
            <View>
                <Modal
                    animationType="slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toglleListModal()}>
                        
                    <ToDoModal
                        list={list}
                        closeModal={() => this.toglleListModal()}
                        updateList={this.props.updateList} />
                </Modal>

                <TouchableOpacity
                    style={[styles.listConteiner, { backgroundColor: list.color }]}
                    onPress={() => this.toglleListModal()}>

                    <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>

                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.count}>/</Text>
                        <Text style={styles.count}>{completedCount}</Text>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }

};

const styles = StyleSheet.create({
    listConteiner: {
        // flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        alignItems: "center"
    },
    listTitle: {
        fontSize: 18,
        color: colors.wight,
    },
    count: {
        color: colors.wight,
        fontSize: 15,
    }
})