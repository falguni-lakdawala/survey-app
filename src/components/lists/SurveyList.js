import { FlatList, Text, View } from 'native-base'
import React from 'react'
import SurveyItem from '../listItems/SurveyItem'
import data from '../../../assets/data.json'

const SurveyList = ({ navigation }) => {
  // const data = [
  //   {
  //     "name": "Survey 1",
  //     "label": "First survey",    },
  //   {
  //     "name": "Survey 2",
  //     "label": "Second survey",
  //   }
  // ]
  return (
    <FlatList
      data={data} flex={1} flexGrow={1} width={'100%'}
      mx={'auto'}
      renderItem={({ item }) => (
        <SurveyItem
          name={item.survey.name}
          label={item.survey.label}
          navigation={navigation}
        />
      )}
      my={5}
    />
  )
}

export default SurveyList
