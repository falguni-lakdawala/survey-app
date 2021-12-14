import React, { useState, useEffect } from 'react'
import Loading from '../layout/Loading'
import { Box, Button, Center, Text, HStack, ChevronRightIcon, ChevronLeftIcon, Checkbox } from 'native-base'
import surveyData from '../../../assets/data.json'
import SliderComponent from '../subComponents/SliderComponent'
import RadioComponent from '../subComponents/RadioComponent'
import IntUnitComponent from '../subComponents/IntUnitComponent'

const SurveyDetailContainer = ({ navigation, route }) => {
  const { label, name } = route.params
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState(surveyData.filter(x => x.survey.name == name)[0].survey);
  const [question, setQuestion] = useState();
  const [value, setValue] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentKey, setCurrKey] = useState("initial_question");
  const [finish, setFinish] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);


  useEffect(() => {
    loadData();
  }, []);


  function loadData(){
    let surveyObj = surveyData.filter(x => x.survey.name == name)[0].survey;
    setData(surveyObj);

    Object.keys(surveyObj.questions).map((key, i) => {
      if(key == surveyObj[currentKey]){
        setQuestion(surveyObj.questions[key]);
        
        if(surveyObj.questions[key].answer_type == "bool"){
          setValue("Yes")
        }
        
        setIsLoading(false);
        
      }
    })
  }

  const onchange = (answer) => {
    setValue(answer)
    console.log("Answer>", answer);
  }


  const onRadioChange = (answer) => {
    setValue(answer)
    console.log("Answer>", answer);
  }

  const addAnswer = () =>{

    let next_question_key;
    let custom;
    
    if(currentKey == "initial_question"){
      let k = data[currentKey];
      let array = [...answers, { [k] : value }]
      setAnswers(array)
      console.log(answers);

      next_question_key = data.questions[data[currentKey]].next_question["default"];
      custom = data.questions[data[currentKey]].next_question["custom"];
    }
    else{
      let array = [...answers, { [currentKey] : value}]
      setAnswers(array)
      console.log(answers);
      next_question_key = data.questions[currentKey].next_question["default"];
      custom = data.questions[currentKey].next_question["custom"];
    }

    if(custom != undefined && custom != null){

      if(question.answer_type == "bool"){
        if(value == "Yes"){
            let d = custom.filter( x=> x.answer == true)[0];
            next_question_key = d.next;
        }
        else{
          let d = custom.filter( x=> x.answer == false)[0];
          next_question_key = d.next;
        }
      }
      else if(question.answer_type == "int"){
        let min, max;
        min = custom[0].answer[0];
        max = custom[0].answer[1];
        
        if(value <= min && value >= max){
          next_question_key = custom[0].next;
        }
      }

      if(next_question_key == null && next_question_key == 'null'){
        setFinish(true);
      }
    }
    
    if(next_question_key != null && next_question_key != "null"){
      let q = data.questions[next_question_key]
      setCurrKey(next_question_key);
      setQuestion(q);
      
      if(q.answer_type == "int"){
        setValue(0);
      }
      else if(q.answer_type == "bool"){
        setValue("Yes");
      }
      

      if(data.questions[next_question_key].next_question["default"] == null || 
      data.questions[next_question_key].next_question["default"] == 'null'){
        setFinish(true);
      }
    }
    
  }

  const showAnswers = () =>{
    addAnswer();
    setShowAnswer(true);
  } 

  return (
    <>
    {
      
      isLoading ? <Loading /> : question && showAnswer == false ?
      
      <Box width='100%' backgroundColor={'#fff'} flexGrow={1} 
      width={'100%'} mx={'auto'}>
            <Center py={10} mx={'auto'} alignItems={'center'} width={'90%'} minWidth={'90%'}>
              <Text >{question.question_text}</Text>
              {/* handle int data type within 0-10 range */}
               {
                  question.answer_type == 'int' && 
                  question.answer_max <= 10 &&
                  <SliderComponent min={question.answer_min} 
                  max={question.answer_max}  defaultValue={value}
                  answer={value} onchange={(e) => { onchange(e) }}/>
               }
              {/* handle int data type more than 10 range  */}
               {  question.answer_type == 'int' &&  
                  question.answer_max > 10 &&
                  <IntUnitComponent
                    unit={question.answer_unit}
                    onchange={(e) => { onchange(e) }}
                  />
               }
              {/* handle bool data type */}
              {
                  question.answer_type == 'bool' && 
                  <RadioComponent
                    val1="Yes" val2="No"
                    onchange={(e) => { onRadioChange(e) }}
                  />
               }
              
               {
                 finish ? <Button px={3} py={3} mt={5} alignItems={'center'}
                 variant='ghost'
                 onPress={() =>
                  showAnswers()
                 }> Finish </Button> :
                 
                 <HStack pt={10} width={'80%'} alignContent={'space-between'}>
                   <Button px={3} pt={3} mt={-1} alignItems={'flex-end'} mr={'auto'}
                    variant='ghost'
                    onPress={() =>
                      addAnswer()
                    }
                  >
                  <ChevronLeftIcon backgroundColor={'#606060'} color={'#FFF'} borderRadius={'50%'}/>
                  </Button>

                  <Button px={3} pt={3} mt={-1} alignItems={'flex-end'} ml={'auto'}
                    variant='ghost'
                    onPress={() =>
                     addAnswer()
                    }
                  >
                  <ChevronRightIcon backgroundColor={'#606060'} color={'#FFF'} borderRadius={'50%'}/>
                  </Button>       
                 </HStack>
                
               }
            </Center>
      </Box>
      :
      
        <Box width='100%' backgroundColor={'#fff'} flexGrow={1} 
        width={'100%'} mx={'auto'}>
              
              {
                answers.map((val, i) => {
                  return (
                    <Center py={10} mx={'auto'} alignItems={'center'} width={'90%'}>
                      <Text>Question:  { data.questions[Object.keys(JSON.parse(JSON.stringify(val)))[0]].question_text  }</Text>
                      <Text>Answer:  { val[Object.keys(JSON.parse(JSON.stringify(val)))[0]]}</Text>
                    </Center>
                  )
                })
              }            
        </Box>
      
    }
    </>
  )
}

export default SurveyDetailContainer
