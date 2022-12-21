import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Button, Modal, Pressable, TextInput, FlatList } from 'react-native'
import { DataStore } from 'aws-amplify'
import { Group } from '../models'
import GroupComponent from '../components/GroupComponent'
import '@azure/core-asynciterator-polyfill'

const Groups = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [groupName, setGroupName] = useState('')
    const [groups, setGroups] = useState([])

    useEffect(() => {
        //query the initial Group and subscribe to data updates
        const subscription = DataStore.observeQuery(Group).subscribe((snapshot) => {
          //isSynced can be used to show a loading spinner when the list is being loaded. 
          const { items, isSynced } = snapshot
          setGroups(items)
        });
    
        //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
        return function cleanup() {
          subscription.unsubscribe()
        }
    
    }, []);

    async function createNewGroup() {
        console.log(groupName)
        await DataStore.save(new Group({ groupName }))
    }

    const renderItem = ({ item }) => {
        <Text>{item.name}</Text>
    }
    
    return (
        <View style={styles.containter}>            
            {/** Querires and maps the groups from aws amplify datastore. */}
            <FlatList
                data={groups}
                keyExtractor={({ id }) => id}
                renderItem={renderItem}
            />

            {/** Modal that allows the user to add a new workout group. */}
            <View style={styles.containter}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    style={styles.showModal}
                >
                    {/** Stuff inside of modal. */}
                    <View style={styles.containter}>
                        <View style={styles.modalView}>
                            <Text>Enter new group name:</Text>
                            {/** TextInput for adding new workout group. */}
                            <TextInput
                                style={styles.input}
                                onChangeText={text => setGroupName(text)}
                                value={groupName}
                            />
                            {/** Button that adds new workout group based on user input. */}
                            <Pressable
                                onPress={createNewGroup}
                            >
                                <Text>Submit</Text>
                            </Pressable>
                            {/** Hide modal button. */}
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                                style={[styles.modalButton, styles.hideModalButton]}
                            >
                                <Text style={styles.modalText}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>

                </Modal>

                {/** Show modal button. */}
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={[styles.modalButton, styles.showModalButton]}
                >
                <Text style={styles.modalText}>Show Modal</Text>
                </Pressable>
                
            </View>
        </View>
            
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: "center",
        margin: 20
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        
    },
    hideModalButton: {
        backgroundColor: "#2196F3"
    },
    showModalButton: {
        backgroundColor: "#F194FF"
    },
    modalText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        height: 40,
        width: 200
    }
})

export default Groups