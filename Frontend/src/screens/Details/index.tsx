import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { 
    Wrapper,
    Container, 
    Header, 
    HeaderButtonContainer, 
    ButtonIcon, 
    ButtonText,
    ContentContainer,
    Title,
    Description
} from '../Details/styles';
import Logo from '../../components/Logo';
import theme from '../../theme';
import api from '../../services/api';
import { useNavigation, useRoute } from "@react-navigation/native";

import { TaskProps } from '../../utils/Types';

export default function Details() {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const [task, setTask] = useState<TaskProps | null>(null);


    const fetchTasks = async () => {
        try {
            const response = await api.get(`/tasks/${id}`);
            const data = response.data;
            setTask({
                id: data.id,
                title: data.titulo,
                date: data.dataCadastro,
                company: data.empresa,
                agente: data.agente,
                status: data.status,
                description: data.descricao,
                complexidade: data.complexidade,
                depreciacao: data.depreciacao,
                qualidade: data.qualidade,
                sustentabilidade: data.sustentabilidade
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [id]);

    return (
        <Wrapper>
            <Header>
                <HeaderButtonContainer onPress={() => navigation.goBack()}>
                    <ButtonIcon>
                        <Feather size={16} name="chevron-left" color={theme.COLORS.BLUE} />
                    </ButtonIcon>
                    <ButtonText>Voltar</ButtonText>
                </HeaderButtonContainer>
                <Logo />
            </Header>

            {task ? (
                <Container>
                    <ContentContainer>
                    <Description>{task.description || "Nenhuma descrição disponível"}</Description>
                        <Description>Empresa: {task.company || "N/A"}</Description>
                        <Description>Agente: {task.agente || "N/A"}</Description>
                        <Description>Status: {task.status || "N/A"}</Description>
                        <Description>Complexidade: {task.complexidade || "N/A"}</Description>
                        <Description>Depreciação: {task.depreciacao || "N/A"}</Description>
                        <Description>Qualidade: {task.qualidade || "N/A"}</Description>
                        <Description>Sustentabilidade: {task.sustentabilidade || "N/A"}</Description>
                    </ContentContainer>

                </Container>
            ) : (
                <Title>Tarefa não foi encontrada</Title>
            )}
        </Wrapper>
    );
}
