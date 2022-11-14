import styled from 'styled-components';
import { Row, Col } from 'antd';
import { Text } from '@atomic';
const Content = styled.div`
  background-color: #ffffff40;
  border-radius: 1.2rem;
  padding: 1rem;
`;

const PokemonData = ({ pokemon }) => {
  return (
    <div>
      <Text>About</Text>
      <Content>
        <Text fontSize={'.8rem'}>{pokemon?.about}</Text>
      </Content>
      <Text>Ability</Text>
      <Content>
        {pokemon?.abilities.map(({ ability }) => (
          <div key={ability?.name}>
            <Text fontSize={'.8rem'}>- {ability?.name}</Text>
          </div>
        ))}
      </Content>
      <Text>Base Stats</Text>
      <Content>
        <Row>
          {pokemon?.stats.map(({ base_stat, stat }, idx) => (
            <Col key={idx} xs={12} sm={12}>
              <Text fontSize={'.8rem'}>
                {stat?.name} - {base_stat}
              </Text>
            </Col>
          ))}
        </Row>
      </Content>
    </div>
  );
};

export default PokemonData;
