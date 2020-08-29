import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import colors from '../Colors';
import { AntDesign } from '@expo/vector-icons';
import tempData from '../tempData';

export default class AddListModal extends React.Component {
    backgroundColor = ["#197", "#f2a", "#1f0", "#73c", "#40d", "#a2f"];

    state = {
        name: "",
        color: this.backgroundColor[0],
    }
    createTodo = () => {
        const { name, color } = this.state;

        const list = {name, color};

        this.props.addList(list);

        this.setState({ name: "" });
        this.props.closeModal();
    }

    renderColor() {
        return this.backgroundColor.map(color => {
            return (
                <TouchableOpacity
                    key={color}
                    style={[styles.colorSelect, { backgroundColor: color }]}
                    onPress={() => this.setState({ color })}
                />
            )
        })
    }
    render() {
        return (
            <KeyboardAvoidingView style={styles.conteiner} behavior="height">

                {/* КНОПКА ЗАКРЫТИЯ */}
                <TouchableOpacity style={{ position: "absolute", top: 16, right: 16 }} onPress={this.props.closeModal}>
                    <AntDesign name="close" size={24} color={colors.light_blue} />
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: "center" }}>

                    {/* ЗАГЛАВИЕ */}
                    <Text style={{ alignSelf: "center", fontSize: 25, fontWeight: "bold" }}>
                        Create new list!
                    </Text>

                    {/* ПОЛЕ ВВОДА НАЗВАНИЯ СПИСКА */}
                    <TextInput style={styles.input}
                        placeholder="List name..."
                        onChangeText={text => this.setState({ name: text })} />

                    {/* ВЫБОР ЦВЕТА СПИСКА */}
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                    }}>
                        {this.renderColor()}
                    </View>

                    {/* КНОПКА СОЗДАНИЯ СПИСКА */}
                    <TouchableOpacity
                        style={[styles.createButt, { backgroundColor: this.state.color }]}
                        onPress={this.createTodo}>
                        <Text style={{ color: colors.wight, fontWeight: "600" }}>Create!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        padding: 5,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#888",
        borderRadius: 8,
        height: 50,
        marginTop: 8,
        paddingHorizontal: 16,
        fontSize: 20
    },
    createButt: {
        marginTop: 10,
        height: 50,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center"
    },
    colorSelect: {
        marginTop: 10,
        height: 30,
        width: 30,
        borderRadius: 8,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: "#888",
    }
});