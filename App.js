import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './src/screens/HomeScreen'
import Groups from './src/screens/Groups'
import GroupsScreen from './src/screens/GroupsScreen'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GroupsScreen" component={GroupsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
