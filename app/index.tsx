import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, View, TextInput, Button, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { apiConfig } from '@/api/axios';

// Tipo de dados esperados do JSON
type Modelo = {
    id: number;
    imagem: string;
    titulo: string;
    corpo_redacao: string;
};

// Função de truncamento do texto
const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};


// Componente principal
export default function GroupCard() {
    const [modelos, setModelos] = useState<Modelo[]>([]); // Estado para armazenar os modelos
    const [titulo, setTitulo] = useState('');
    const [corpoRedacao, setCorpoRedacao] = useState('');
    const [linkImagem, setLinkImagem] = useState('');

    // Função para buscar os modelos da rota "/modelos"
    const fetchModelos = async () => {
        try {
            const response = await apiConfig.get('/modelos');
            setModelos(response.data); // Atualiza a lista de modelos
        } catch (error) {
            console.error('Erro ao buscar modelos:', error);
        }
    };

    // Efeito para buscar os modelos ao montar o componente
    useEffect(() => {
        fetchModelos();
    }, []);

    // Função para criar um novo modelo
    const criarNovoModelo = async () => {
        try {
            const response = await apiConfig.post('/novomodelo', {
                imagem: linkImagem,
                titulo,
                corpo_redacao: corpoRedacao
            });

            if (response.status === 200) {
                Alert.alert('Sucesso', 'Modelo criado com sucesso!');
                // Limpar campos após sucesso
                setTitulo('');
                setCorpoRedacao('');
                setLinkImagem('');
                // Atualizar a lista de modelos
                fetchModelos();
            } else {
                Alert.alert('Erro', 'Erro ao criar o modelo, tente novamente mais tarde');
            }
        } catch (error) {
            console.error('Erro ao criar modelo:', error);
            Alert.alert('Erro', 'Erro ao criar o modelo, tente novamente mais tarde');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.formContainer}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Título"
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Link da Imagem"
                        value={linkImagem}
                        onChangeText={setLinkImagem}
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Corpo da Redação"
                        multiline
                        numberOfLines={6}
                        value={corpoRedacao}
                        onChangeText={setCorpoRedacao}
                    />
                    <Button title="CRIAR NOVO" color="#ed9121" onPress={criarNovoModelo} />
                </View>
            </ScrollView>
            <ScrollView style={styles.modelContainer}>
                {modelos.map((modelo) => (
                    <Container key={modelo.id}>
                        <ImageSection>
                            <GroupImage
                                source={{ uri: modelo.imagem || 'https://via.placeholder.com/350x150?text=Image+Placeholder' }}
                            />
                        </ImageSection>
                        <TextSection>
                            <Title>{modelo.titulo}</Title>
                            <Description>{truncateText(modelo.corpo_redacao, 200)}</Description>
                            <ButtonContainer>
                                <CustomButton onPress={() => {}}>
                                    <ButtonText>EDITAR</ButtonText>
                                </CustomButton>
                                <CustomButton>
                                    <ButtonText>EXCLUIR</ButtonText>
                                </CustomButton>
                            </ButtonContainer>
                        </TextSection>
                    </Container>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    formContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    modelContainer: {
        flex: 2,
        padding: 10,
    },
    form: {
        flex: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    textArea: {
        height: 100,
    },
});

const Container = styled.View`
    width: 100%;
    background-color: #FFFFFF;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 10px;
`;

const ImageSection = styled.View`
    flex-direction: row;
    justify-content: center;
`;

const GroupImage = styled.Image`
    width: 100%;
    height: 150px;
    resize-mode: cover;
    border-radius: 6px;
`;

const TextSection = styled.View`
    padding: 10px 0;
`;

const Title = styled.Text`
    font-size: 18px;
    color: #000000;
    margin-bottom: 5px;
`;

const Description = styled.Text`
    font-size: 16px;
    color: #000000;
    margin-bottom: 10px;
`;

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const CustomButton = styled.TouchableOpacity`
    background-color: #ed9121;
    padding: 10px;
    border-radius: 5px;
    flex: 0.48;
    justify-content: center;
    align-items: center;
`;

const ButtonText = styled.Text`
    color: #FFFFFF;
    font-size: 14px;
`;
