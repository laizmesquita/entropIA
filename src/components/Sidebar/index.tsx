import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, Item, ItemText } from './styles';

const Sidebar: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Item onPress={() => navigation.navigate('Home')}>
        <ItemText>Home</ItemText>
      </Item>
      <Item onPress={() => navigation.navigate('Sustentabilidade')}>
        <ItemText>Sustentabilidade</ItemText>
      </Item>
    </Container>
  );
};

export default Sidebar;
