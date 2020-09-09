import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, View, Image, Button, TextInput } from 'react-native';
import { Header } from 'react-native-elements';
import Avatar from 'react-native-user-avatar';
import axios from 'react-native-axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

const Separator = () => (
  <View style={styles.separator} />
);

const styles = StyleSheet.create({
  separator: {
    marginVertical: 3,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default function Cadastro ({navigation, route}) {

  [getNome,setNome] = useState();
  [getCpf,setCpf] = useState();
  [getTelefone,setTelefone] = useState();
  [getId,setId] = useState();

  useEffect(()=>{
    if(route.params){
          const { id } =  route.params
          const { nome } =  route.params
          const { telefone } =  route.params
          const { cpf } =  route.params

          setNome(nome)
          setTelefone(telefone)
          setCpf(cpf)
          setId(id)
    }
  },[])  

  async function salvar(){
    await axios.post('http://professornilson.com/testeservico/clientes',{
     nome:getNome,
     cpf:getCpf,
     telefone:getTelefone,  
    }
    )
    .then(function (response) {
        setNome('')
        setTelefone('')
        setCpf('')
        showMessage({
            message: "Registro salvo com sucesso!",
            type: "success",
          });
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}


  function excluir(){
    axios.delete('http://professornilson.com/testeservico/clientes/'+getId
   )
   .then(function (response) {
       setNome('')
       setTelefone('')
       setCpf('')
       showMessage({
           message: "Registro excluído com sucesso!",
           type: "success",
         });
     console.log(response);
   })
   .catch(function (error) {
       console.log(error);
   });
}

async function alterar(){
   await axios.put('http://professornilson.com/testeservico/clientes/'+getId,{
    nome:getNome,
    cpf:getCpf,
    telefone:getTelefone,  
   }
   )
   .then(function (response) {
       showMessage({
           message: "Registro alterado com sucesso!",
           type: "success",
         });
     console.log(response);
   })
   .catch(function (error) {
       console.log(error);
   });
}

    return (
      <View style={{flex: 3, alignItems: "center", justifyContent: "center"}}>
          <Header
            leftComponent={  
              <Button title="< Voltar" onPress={() => navigation.goBack()}></Button> 
            }
            centerComponent={{ text: 'Cadastro de Clientes', style: { color: '#fff' } }}
            />
          <FlashMessage position="top" /> 
          <ScrollView>
              <Image
              style={{
                width: 150,
                height: 150,
              }}
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/en/e/ea/Paper-%266-pencil-iconicWER6T.jpg',
                }}
              />
              
              <Text>Digite seu Nome</Text>
              <TextInput 
                style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 }}
                value={getNome} onChangeText={valor => setNome(valor)}/>

              <Text>Digite seu CPF</Text>
              <TextInput 
                style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 , paddingTop: 10}}
                value={getCpf} onChangeText={valor => setCpf(valor)}/>
              
              <Text>Digite seu Telefone</Text>
              <TextInput 
                style={{ height: 40,width:300, borderColor: 'gray', borderWidth: 1 , paddingTop: 10}}
                value={getTelefone} onChangeText={valor => setTelefone(valor)}/>
              
              { getId == null ? 
                <Button title="Salvar" style={{ justifyContent: "center"}} 
                onPress={() => salvar()} />
                : null
              }
             
              {getId != null ? 
                  <Button title="Alterar" onPress={() => alterar()} />
                  : null
              }    

              <Separator></Separator>       

              {getId != null ? 
                  <Button title="Excluir" style={{color: 'red'}} onPress={() => excluir()}/>
                  : null
              }         
          </ScrollView>
      </View>
    );
} 
