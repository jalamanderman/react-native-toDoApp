import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput, FlatList} from 'react-native';

export default function App() {

    const [enteredGoal, setEnteredGoal] = useState('');
    const [goals, setGoals] = useState([]);

    const handleEnteredGoal = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const handleAddGoal = () => {
        setGoals(currentGoals => [
            ...currentGoals,
          {id: Math.random().toString() , value: enteredGoal}
          ]);
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
                    <Text>{itemData.item.value}</Text>
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
    listItem: {
        paddingVertical: 10,

    },
    addButton: {
        // alignItems: 'center',
        // justifyContent: 'center',
    }
});
