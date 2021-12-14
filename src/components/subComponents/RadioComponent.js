import React from 'react'
import { Radio, VStack } from "native-base"

const RadioComponent = (props) => {

    const [value, setValue] = React.useState(props.val1)

    const handleChange = v => {
        setValue(v);
        props.onchange(v);
    }


    return (
    <VStack my={5}>
        <Radio.Group
        name="myRadioGroup"
        accessibilityLabel="radio button"
        value={value}
        onChange={(nextValue) => {
            handleChange(nextValue);
        }}
        >
        <Radio value={props.val1} my={1}>
            {props.val1}
        </Radio>
        <Radio value={props.val2} my={1}>
            {props.val2}
        </Radio>
        </Radio.Group>
    </VStack>
    )

}

export default RadioComponent
