import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {useForm, Controller, SubmitHandler } from 'react-hook-form'
import qs from 'query-string';

import { TextInput,Text, Button  } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';

import IconTranslate from 'react-native-vector-icons/MaterialCommunityIcons'

import { languages } from '../helpers';
import { FormTranslate } from '../interface';
import { useTraslate } from '../hooks';

export const Translate = () => {
  const [traducido, setTraducido] = useState("");

  const { control, handleSubmit, formState: { errors } } = useForm<FormTranslate>();

  const traslatePost = useTraslate();

  const onSubmit:SubmitHandler<FormTranslate> = ({language,text}) => {
    const encoded = qs.stringify({
      source_language: 'es',
      target_language: language,
      text: text,
    });
    traslatePost.mutate(encoded,{
      onSuccess: (data)=> {
        setTraducido(data?.data.translatedText!)
      },
      onError: (error)=>{
        console.log(error.message);
      }
    })
  }
  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text 
          style={style.title}
          variant='titleLarge'
        >
          Traductor, primera tarea
        </Text>
        <Controller
          name='text'
          control={control}
          rules={{
            required: true
          }}
          render={({field:{value,onBlur,onChange}})=>(
            <TextInput
              mode="outlined"
              onBlur={onBlur}
              label="Escribir en español"
              placeholder="traducir..."
              multiline={true}
              style={style.inputText}
              textColor='black'
              onChangeText={e => onChange(e)}
              value={value}
            />
          )}
        
        />
      </View>

      <View>
        <Text 
          style={style.title}
          variant='titleMedium'
        >
          Traduzca a cualquier idioma
        </Text>

        <View style={style.selector}>
          <Controller
            control={control}
            name='language'
            rules={{
              required: true
            }}
            render={({field:{onChange,value}})=>(
              <RNPickerSelect
                style={{placeholder:{color: "white"}}}
                value={value}
                onValueChange={(value) => {
                  onChange(value)
                }}
                items={languages}
              />
            )}
          />
        </View>
      </View>

      <Button
        mode='contained'
        style={style.button}
        onPress={handleSubmit(onSubmit)}
        disabled={traslatePost.isPending}
      >
        <View style={style.buttonContainer}>
          {
            traslatePost.isPending
            ?(
              <IconTranslate name='translate-off' size={30} color="#fff" />
            )
            :(
              <IconTranslate name='translate' size={30} color="#fff" />
            )
          }
          <Text
          variant='bodyMedium'
          style={style.buttonText}
          >Traducir</Text>
        </View>
      </Button>

      <Text
      variant='bodyLarge'
      style={{color: "black"}}
      >
        Traduccion: <Text
          variant='bodyMedium'
          style={style.traslateResponse}
        >
        {traducido}
        </Text>
      </Text>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container :{
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputText:{
    backgroundColor:"white",
    color: 'black'
    
  },
  title:{
    marginVertical: 5,
    fontWeight: "700",
    color: "black"
  },
  selector: {
    backgroundColor: "#d58cfc",
    borderRadius: 30,
    width: "100%"
  },
  button:{
    marginVertical: 20,
    display: "flex",
    width: '100%',
    height: 45,
    alignSelf: "center",
    backgroundColor: "#9a2edb",
    justifyContent: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonText:{
    color: "white",
    marginLeft: 5,
  },
  traslateResponse:{ 
    fontWeight: "700",
    fontSize: 17,
    color: "black"
  }
})
