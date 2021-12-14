import React from 'react'
import { HStack, Text } from "native-base"
import { TextInput, StyleSheet } from "react-native"

const IntUnitComponent = (props) => {

    const [value, setValue] = React.useState(0)

    const handleChange = v => {
        setValue(v);
        props.onchange(v);
    }


    return (
        <HStack my={5}>
            <TextInput style={styles.input}
                onChangeText={handleChange}
                value={value}
                keyboardType="numeric"
            />
            <Text style={styles.text} px={3}>{props.unit}</Text>
        </HStack>
    )

}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      padding: 10,
    },
    text: {
        height: 40,
        marginTop: 15,
        marginBottom: 12,
        paddingTop: 20,
        paddingBottom: 10,
    }
  });
  
export default IntUnitComponent
