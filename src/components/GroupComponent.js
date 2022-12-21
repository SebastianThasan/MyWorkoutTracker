import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import { DataStore } from 'aws-amplify'
import { Group } from '../models'

const GroupComponent = () => {
    const [name, setName] = useState()

    const updateName = () => {
        console.log("in updateName function")
        console.log(name)
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={text}
            />
            <Pressable
                onPress={updateName}
            >
                <Text>Update Group Name</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row'
    },
    input: {
        borderWidth: 1,
        height: 40,
        width: 100
    }
})

export default GroupComponent