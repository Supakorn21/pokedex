import { Logo, FilterDropdown, Button, Search, PokemonCard } from '@atomic';
import pokemonLogo from '@/assets/images/pokedex.png';
import styled from 'styled-components';
import { filter } from 'lodash';
import { pokemonInfo, pokemonApiV2 } from '@/utils';
import {
  regions,
  types,
  sortby,
  filterBySearch,
  filterByType,
  sortingBy
} from './helper';
import { Row, Col, Spin } from 'antd';
import { useState, useEffect } from 'react';

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

const PokemonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2rem;
  justify-content: space-around;
`;

const initial = {
  data: [],
  loading: false,
  error: null
};

const getQueryString = (region) => {
  if (!region) return null;

  let query = new URLSearchParams();
  query.append('limit', region?.limit);
  query.append('offset', region?.offset);

  return query.toString();
};

const getPokemonList = (pokemon = [], filters = {}) => {
  const { search, type, sortBy } = filters;

  // filter pokemon using lodash library
  const pokemonLists = filter(pokemon, (pokemon) => {
    let remove = false;

    if (search && !filterBySearch(pokemon, search)) {
      remove = true;
    }

    if (
      type &&
      type?.value !== 'all types' &&
      !filterByType(pokemon, type?.value)
    ) {
      remove = true;
    }

    return !remove;
  });

  const sortedPokemonList = pokemonLists.sort(sortingBy(sortBy?.value));
  // console.log({ sortedPokemonList });

  const result = sortedPokemonList.map((pokemon) => ({
    ...pokemon,
    image: pokemon?.sprites?.other?.dream_world?.front_default
  }));

  return result;
};

const SearchPage = () => {
  const [filters, setFilters] = useState({});
  const [state, setState] = useState(initial);

  const onFilterChange = (key, value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [key]: value
    }));
  };

  const queryString = getQueryString(filters?.region);

  const pokemonLists = getPokemonList(state?.data, filters);

  // console.log({ queryString });

  const fetchPokemonList = async () => {
    if (!queryString) return;

    let pokemonList = [];
    let fetchError = null;

    setState((prev) => ({
      ...prev,
      loading: true
    }));
    try {
      const response = await pokemonApiV2.get(`pokemon?${queryString}`);
      const pokemonResult = response?.data?.results;

      for (let pokemon of pokemonResult) {
        const response = await pokemonApiV2.get(`pokemon/${pokemon?.name}`);
        const monster = await response?.data;
        await pokemonList.push(monster);
      }
    } catch (error) {
      fetchError = error;
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      data: pokemonList,
      error: fetchError
    }));
  };

  // console.log({ pokemonLists });

  useEffect(() => {
    queryString && fetchPokemonList();
  }, [queryString]);

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
        {state?.loading ? (
          <Spin />
        ) : (
          [...pokemonLists].map((pokemon) => (
            <PokemonCard key={pokemon?.id} pokemon={pokemon} />
          ))
        )}
      </PokemonContainer>
    </Container>
  );
};

export default SearchPage;
