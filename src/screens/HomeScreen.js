import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.containter}>
            <Text>Home Screen</Text>
            <Button
                title="My Groups"
                onPress={() => navigation.navigate('GroupsScreen')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
})

export default HomeScreen