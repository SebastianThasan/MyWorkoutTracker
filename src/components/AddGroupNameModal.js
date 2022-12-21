import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
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
              style={styles.input}
            />
            <Pressable onPress={addTodo} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Save Todo</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
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
    modalDismissButton: {
        marginLeft: 'auto',
    },
    modalDismissText: {
        fontSize: 20,
        fontWeight: '700',
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: '#4696ec',
        borderRadius: 99,
        paddingHorizontal: 8,
    }
})

export default AddGroupNameModal