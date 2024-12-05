import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import { Image, FlatList, View, Text } from 'react-native';
import { Wrapper,Container, ListContainer, TextVagas } from './styles';
import BGTop from '../../assets/BGTop.png';
import Logo from '../../components/Logo';
import TaskCard from '../../components/TaskCard';


export default function List() {

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try{
        const response = await api.get('/tasks');
        setTasks(response.data);
      }catch(error){
        console.log(error);
      }finally{
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);
    
    return (
        <Wrapper>
            <Image source={BGTop} style={{maxHeight: 86}}/>

            <Container>

                <Logo />
                <TextVagas>{tasks.length} Tarefas encontradas!</TextVagas>
                <ListContainer>
                  {isLoading ? (
                    <Text>Carregando...</Text>
                  ) : (
                  <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => 
                        <TaskCard
                            id={item.id}
                            title={item.titulo} 
                            dataCreated={item.data_cadastro}
                            company={item.empresa}
                        />
                    }
                    showsVerticalScrollIndicator={true}
                    ListEmptyComponent={() => (
                        <View>
                            <Text>
                                Você ainda não tem tarefas cadastradas
                            </Text>
                            <Text>
                                Crie tarefas
                            </Text>
                        </View>
                    )}
                />)}
                   
                </ListContainer>

            </Container>
        </Wrapper>
    );
}
