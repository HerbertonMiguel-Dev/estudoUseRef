import React, { useState, useEffect, useMemo, useRef } from "react"; // Importa React e hooks useState, useEffect e useMemo para gerenciamento de estado e efeitos colaterais
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native"; // Importa componentes de layout e estilização do React Native
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage para armazenamento assíncrono de dados

// Componente principal da aplicação
export default function App() {
  const [input, setInput] = useState(''); // Estado para gerenciar o texto de entrada
  const [nome, setNome] = useState(''); // Estado para gerenciar o nome salvo

  const inputRef = useRef(null); // useRef é usado para criar uma referência mutável que não causa re-renderizações quando alterada

  // Efeito colateral que carrega o nome salvo do AsyncStorage ao montar o componente
  useEffect(() => {
    async function loadData() {
      await AsyncStorage.getItem('@nome').then((value) => {
        setNome(value); // Define o nome salvo no estado
      });
    }

    loadData(); // Chama a função para carregar os dados
  }, []);

  // Função que salva o nome no AsyncStorage
  async function gravaNome() {
    await AsyncStorage.setItem('@nome', input); // Salva o nome no AsyncStorage
    setNome(input); // Define o nome salvo no estado
    setInput(''); // Limpa o campo de entrada
  }

  const letrasNome = useMemo(() => {
    return nome.length; // Retorna o comprimento da string 'nome'
  }, [nome]); // A função só será recalculada quando 'nome' mudar

  function chamarInput() {
    inputRef.current.focus(); // Utiliza a referência criada pelo useRef para focar no campo de entrada
    // inputRef.current.clear(); // Outra funcionalidade possível: limpar o campo de entrada
  }

  // Retorna o layout da aplicação
  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          value={input} // Valor do campo de entrada
          onChangeText={(texto) => setInput(texto)} // Atualiza o estado de entrada quando o texto muda
          ref={inputRef} // Atribui a referência useRef ao componente TextInput
        />
        <TouchableOpacity onPress={gravaNome}>
          {/* Botão para salvar o nome */}
          <Text style={styles.botao}>+</Text> 
        </TouchableOpacity>
      </View>
      {/* Exibe o nome salvo */}
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.nome}>possui: {letrasNome} letras</Text>
      
      <TouchableOpacity onPress={chamarInput}>
        {/* Botão para focar no campo de entrada usando a referência useRef */}
        <Text style={styles.chamarInput}>Chamar Input</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos para os componentes
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    alignItems: 'center', // Alinha os itens ao centro horizontalmente
    marginTop: 35, // Adiciona margem no topo
  },
  viewInput: {
    flexDirection: 'row', // Alinha os itens na horizontal
    alignItems: 'center', // Alinha os itens ao centro verticalmente
  },
  input: {
    width: 350, // Largura do campo de entrada
    height: 40, // Altura do campo de entrada
    borderColor: '#000', // Cor da borda do campo de entrada
    borderWidth: 1, // Largura da borda do campo de entrada
    padding: 10, // Adiciona padding
  },
  botao: {
    backgroundColor: '#222', // Cor de fundo do botão
    color: '#fff', // Cor do texto do botão
    height: 40, // Altura do botão
    padding: 10, // Adiciona padding
    marginLeft: 4, // Adiciona margem à esquerda
  },
  nome: {
    marginTop: 15, // Adiciona margem no topo
    fontSize: 30, // Tamanho da fonte
    color: '#000',
  },
  chamarInput: {
    fontSize: 24,
    color: '#000',
  },
});
