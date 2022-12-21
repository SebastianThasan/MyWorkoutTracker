import React, { useState, useEffect } from 'react'
import { FlatList, Pressable, TextInput, StyleSheet, Text, View } from 'react-native'
import { DataStore } from 'aws-amplify'
import { Group } from '../models'

const GroupComponentList = () => {
    const [name, setName] = useState()
    const [groups, setGroups] = useState([])
  
    useEffect(() => {
      //query the initial group list and subscribe to data updates
      const subscription = DataStore.observeQuery(Group).subscribe((snapshot) => {
        //isSynced can be used to show a loading spinner when the list is being loaded. 
        const { items, isSynced } = snapshot
        setGroups(items)
      })
  
      //unsubscribe to data updates when component is destroyed so that you don’t introduce a memory leak.
      return function cleanup() {
        subscription.unsubscribe()
      }
  
    }, [])
  
    async function deleteGroup(item) {
      try {
        await DataStore.delete(item)
      } catch (e) {
        console.log('Delete failed: $e')
      }
    }
  
    async function updateGroup(updateValue, item) {
      //update the group item with updateValue
      await DataStore.save(
        Group.copyOf(item, updated => {
          updated.isComplete = updateValue
        })
      )
    }

    const updateName = (text, item) => {
        console.log(text)
    }
  
    const renderItem = ({ item }) => (
        <View style={styles.groupContainer}>
            <TextInput
                onChangeText={setName}
                onSubmitEditing={updateName(name)}
                placeholder="Empty workout group"
                style={styles.input}
                editable={true}
            >
                <Text>{item.name}</Text>
            </TextInput>
            <Pressable onPress={() => deleteGroup(item)}>
                <Text stle={styles.deleteText}>X</Text>
            </Pressable>
        </View>
    )
  
    return (
      <FlatList
        data={groups}
        keyExtractor={({ id }) => id}
        renderItem={renderItem}
      />
    )
}

const styles = StyleSheet.create({
    groupContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        elevation: 4,
        flexDirection: 'row',
        marginHorizontal: 8,
        marginVertical: 4,
        padding: 8,
        shadowOffset: {
          height: 1,
          width: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },
    input: {
        borderBottomWidth: 1,
        marginBottom: 16,
        padding: 8,
    },
    deleteText: {
        fontSize: 20,
        fontWeight: '700',
    },
})

export default GroupComponentList