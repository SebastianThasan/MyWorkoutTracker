import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import GroupComponentList from '../components/GroupComponentList'
import AddGroupNameModal from '../components/AddGroupNameModal'

const GroupsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      {/** Component that handles the displaying of the different workout groups in a list. */}
      <GroupComponentList />
      {/** Button that displays a modal for user to add a new workout group. */}
      <Pressable
        onPress={() => {
          setModalVisible(true)
        }}
        style={[styles.buttonContainer, styles.floatingButton]}
      >
        <Text style={styles.buttonText}>Add Group</Text>
      </Pressable>
      {/** Modal taht allows the user to add a new workout group. */}
      <AddGroupNameModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
    elevation: 6,
    shadowOffset: {
      height: 4,
      width: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
})

export default GroupsScreen