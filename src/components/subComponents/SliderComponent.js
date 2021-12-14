import React, { useEffect } from 'react'
import { Slider, Center, Box } from 'native-base';

const SliderComponent = (props) => {

  const [onChangeValue, setOnChangeValue] = React.useState(0);
  const handleChange = v => {
    setOnChangeValue(Math.floor(v));
    props.onchange(v);
  }

  useEffect(() => {
    setOnChangeValue(props.defaultValue);
    props.onchange(props.defaultValue);
  }, [props.defaultValue]);

  return (
    <Box mx={5} width="80%" mt={4}>
    <Center>{onChangeValue}</Center>
    <Slider
      defaultValue={props.defaultValue} minValue={props.min} maxValue={props.max} step={1}
      colorScheme="gray" size="sm" 
      onChange={handleChange}
      onValueChange={handleChange}
    >
      <Slider.Track>
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
  </Box>
  )
}

export default SliderComponent
