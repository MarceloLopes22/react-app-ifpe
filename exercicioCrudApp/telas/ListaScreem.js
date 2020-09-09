import React, {useState, useEffect} from 'react';
import { ScrollView, View, Button } from 'react-native';
import { ListItem, Header  } from 'react-native-elements'
import axios from 'react-native-axios';
import Avatar from 'react-native-user-avatar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListarScreen({ navigation }) {
    

    const [dados,setDados] = useState([]);
    useEffect(()=>{

        function recuperarDados(){
            axios.get('http://professornilson.com/testeservico/clientes').then(function (response) {
                setDados(response.data);
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
        recuperarDados();
    },[])

    return(
        <View>
            <Header
            centerComponent={{ text: 'Lista', style: { color: '#fff' }}}
            rightComponent={
                <Button title="+" onPress={()=>navigation.navigate('Cadastro', {id: null})}></Button>
            }
            />
            <ScrollView>
            {
                dados.map((item, i) => (
                <ListItem key={i} bottomDivider  onPress={() => navigation.navigate("Cadastro", {
                    id: item.id,
                    nome: item.nome,
                    telefone: item.telefone,
                    cpf: item.cpf,
                    alterar: true
                })}>
                    <Avatar size={100} src="https://i.pinimg.com/564x/3e/73/43/3e7343d9b872cc27009b365beed5e159.jpg" />
                    <ListItem.Content>
                    <ListItem.Title>{item.nome}</ListItem.Title>
                    <ListItem.Subtitle>{item.telefone}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
                ))
            }
            </ScrollView>
        </View>
    )
} 
