import React, { useState, useEffect } from 'react'
import { FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View, Platform } from 'react-native'
import { DataStore } from 'aws-amplify'
import { Group } from '../models'

const AddGroupNameModal = ({ modalVisible, setModalVisible }) => {
  const [name, setName] = useState('')

  async function addTodo() {
    await DataStore.save(new Group({ name }))
    setModalVisible(false)
    setName('')   
  }

  function closeModal() {
    setModalVisible(false)
  }

  return (
    <Modal
      animationType="fade"
      onRequestClose={closeModal}
      transparent
      visible={modalVisible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Pressable onPress={closeModal} style={styles.modalDismissButton}>
            <Text style={styles.modalDismissText}>X</Text>
          </Pressable>
          <TextInput
            onChangeText={setName}
            placeholder="Name"
            style={styles.modalInput}
          />
          <Pressable onPress={addTodo} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Save Todo</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const GroupComponentList = () => {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    //query the initial todolist and subscribe to data updates
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

  async function updateGroupName(updateValue, item) {
    //update the todo item with updateValue
    await DataStore.save(
      Todo.copyOf(item, updated => {
        updated.isComplete = updateValue
      })
    )
  }

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.groupContainer}
    >
      <Text>{item.name}</Text>

    </Pressable>
  )

  return (
    <FlatList
      data={groups}
      keyExtractor={({ id }) => id}
      renderItem={renderItem}
    />
  )
}

const GroupsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <GroupComponentList />
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
        style={[styles.buttonContainer, styles.floatingButton]}
      >
        <Text style={styles.buttonText}>Add Group</Text>
      </Pressable>
      <AddGroupNameModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  groupContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
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
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    padding: 16,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: '#4696ec',
    borderRadius: 99,
    paddingHorizontal: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 44,
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)', // dims the screen outside of the modal
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  modalInnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    padding: 16,
  },
  modalInput: {
    borderBottomWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  modalDismissButton: {
    marginLeft: 'auto',
  },
  modalDismissText: {
    fontSize: 20,
    fontWeight: '700',
  },
});

export default GroupsScreen