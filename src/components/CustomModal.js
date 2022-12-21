import React from 'react'
import { View, Text, StyleSheet, Button, Modal } from 'react-native'

const CustomModal = () => {
    return (
        <Modal
            animationType='slide'
            visible={true}
        >
            <Text>Custom Modal</Text>
        </Modal>
    )
}

const styles = StyleSheet.create({

})

export default CustomModal