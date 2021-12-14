import { Center, Container } from 'native-base'
import React, { useState } from 'react'
import Loading from '../layout/Loading'
import SurveyList from '../lists/SurveyList'

const SurveyContainer = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchSurveys = () => {
    setIsLoading(true)
  }

  return (
    <Container flex={1} maxWidth={'100%'} backgroundColor={'#fff'}  >
      <Center px={4} width={'100%'} mx={'auto'}>
        {isLoading ? <Loading /> : <SurveyList navigation={navigation} />}
      </Center>
    </Container>
  )
}

export default SurveyContainer
