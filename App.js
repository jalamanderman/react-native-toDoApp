import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';
import ButtonIcon from './components/ButtonIcon';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

    const [enteredGoal, setEnteredGoal] = useState('test');
    const [goals, setGoals] = useState([]);

    const handleEnteredGoal = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const handleAddGoal = () => {
        if (enteredGoal.length > 0) {
            setGoals(currentGoals => [
                ...currentGoals,
                {id: Math.random().toString() , value: enteredGoal}
            ]);
        }
    };

    const deleteGoal = (toRemove) => {
        const newArr = [...goals];
        newArr.splice(newArr.findIndex(item => item.id === toRemove), 1);
        setGoals(newArr);
    };

    return (
        <View style={styles.screenContainer}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder={''}
                    style={styles.input}
                    onChangeText={handleEnteredGoal}
                    value={enteredGoal}
                />
                <Button style={styles.addButton} onPress={handleAddGoal} title={'Add'}/>
            </View>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={goals}
                renderItem={itemData =>
                <View style={styles.listItem}>
                    <Text style={styles.listItemText}>{itemData.item.value}</Text>
                    <Ionicons name="md-trash" size={20} color="grey" onPress={() => deleteGoal(itemData.item.id)} />
                </View>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: 70,
    },
    input: {
        padding: 5,
        borderColor: 'grey',
        borderWidth: .5,
        flex: 1,
        marginRight: 10
    },
    addButton: {

    },
    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',

    },
    listItemText: {
        flex: 1,

    },
    listItemDelete: {

    },
});
