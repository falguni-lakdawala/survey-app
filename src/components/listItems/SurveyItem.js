import { Box, Button, Heading, ChevronRightIcon, HStack } from 'native-base'
import React from 'react'

const SurveyItem = props => {
  const { name, label, navigation  } = props

  return (
    <Box borderRadius={20} px={5} py={5} alignItems={'space-between'}
    mb={5} backgroundColor={'#F8F8F8'} > 
      <HStack >
        <Heading size='sm' flexGrow={1}>{name}</Heading>
        <Button px={3} py={0} mt={-1} alignItems={'flex-end'}
            variant='ghost'
            onPress={() =>
              navigation.navigate('Show', {
                label, name
              })
            }
          >
          <ChevronRightIcon backgroundColor={'#606060'} color={'#FFF'} borderRadius={'50%'}/>
        </Button>
      </HStack>
    </Box>
  )
}

export default SurveyItem
