import React, {useState} from 'react';
import {StyleSheet, TextInput, FlatList} from 'react-native';
import {
    Container,
    Header,
    Content,
    Text,
    View,
    Button,
    Input,
    Item,
    Icon,
    List,
    ListItem,
    Right,
    Left
} from 'native-base';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import {Ionicons} from '@expo/vector-icons';

export default function App(props) {

    const [enteredGoal, setEnteredGoal] = useState('');
    const [goals, setGoals] = useState([]);

    const handleEnteredGoal = (enteredText) => {
        setEnteredGoal(enteredText);
    };

    const handleAddGoal = () => {
        if (enteredGoal.length > 0) {
            setGoals(currentGoals => [
                ...currentGoals,
                {id: Math.random().toString(), value: enteredGoal}
            ]);
        }
    };

    const deleteGoal = (toRemove) => {
        const newArr = [...goals];
        newArr.splice(newArr.findIndex(item => item.id === toRemove), 1);
        setGoals(newArr);
    };
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    } else {
        return (
            <Container>
                <Header transparent/>
                <Content>
                    <View style={styles.screenContainer}>
                        <Item rounded>
                            <Input onChangeText={handleEnteredGoal}
                                   value={enteredGoal}
                                   placeholder='  Add an item'/>
                            <Icon active solid name='add' onPress={handleAddGoal}
                                  style={{fontSize: 20, color: 'green', paddingRight: 15}}/>
                        </Item>
                        <List
                            keyExtractor={(item, index) => item.id}
                            dataArray={goals}
                            renderRow={(item) =>
                                <ListItem>
                                    <Left>
                                        <Text>{item.value}</Text>
                                    </Left>
                                    <Right>
                                        <Icon active solid name='trash'/>
                                    </Right>
                                </ListItem>
                            }>
                        </List>
                    </View>
                </Content>
            </Container>
        );
    }
}

async function loadResourcesAsync() {
    await Promise.all([
        Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        }),
    ]);
}

function handleLoadingError(error) {
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    screenContainer: {
        fontFamily: 'Roboto',
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
    addButton: {},
    listItem: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',

    },
    listItemText: {
        flex: 1,

    },
    listItemDelete: {},
});
