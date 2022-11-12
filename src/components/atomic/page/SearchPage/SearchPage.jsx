import { Logo, FilterDropdown, Button, Search, PokemonCard } from '@atomic';
import pokemonLogo from '@/assets/images/pokedex.png';
import styled from 'styled-components';
import { pokemonInfo } from '@/utils';
import { regions, types, sortby } from './helper';
import { Row, Col } from 'antd';
import { useState } from 'react';

const Container = styled.div`
  text-align: center;
`;

const StyledRow = styled(Row)`
  max-width: 1000px;
  margin: auto;
  margin-top: 2rem;
`;

const regionDropdownItems = regions.map((r) => {
  return {
    ...r,
    key: r?.name,
    value: r?.name,
    label: `${r?.name}(${r?.offset} - ${r?.limit + r?.offset})`
  };
});

const typeDropdownItems = types.map((t) => ({
  key: t,
  value: t,
  label: t
}));

const sortbyDeopdownItems = sortby.map((s) => ({
  key: s,
  value: s,
  label: s
}));

const getFetchPokemonFilters = (filters) => {
  return filters;
};

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: space-around;
`;

const SearchPage = () => {
  const [filters, setFilters] = useState({});

  const onFilterChange = (key, value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [key]: value
    }));
  };

  const pokeMonFilters = getFetchPokemonFilters(filters);

  return (
    <Container>
      <Logo src={pokemonLogo} width={200} />
      <StyledRow>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="REGION"
            items={regionDropdownItems}
            onChange={(item) => onFilterChange('region', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="TYPE"
            items={typeDropdownItems}
            onChange={(item) => onFilterChange('type', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <FilterDropdown
            label="SORT BY"
            items={sortbyDeopdownItems}
            onChange={(item) => onFilterChange('sortBy', item)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Search
            label={'SEARCH'}
            placeholde="typing . . ."
            onChange={(value) => onFilterChange('search', value)}
          />
        </Col>
      </StyledRow>
      <PokemonContainer>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <PokemonCard key={x} pokemon={pokemonInfo} />
        ))}
      </PokemonContainer>
    </Container>
  );
};

export default SearchPage;
