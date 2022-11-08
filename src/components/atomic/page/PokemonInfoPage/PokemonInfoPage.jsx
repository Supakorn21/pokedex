import { useSearchParams } from 'react-router-dom';

const PokemonInfoPage = () => {
  let [searchParams] = useSearchParams();

  const id = searchParams.get('id');
  return <div>PokemonInfoPage : {id}</div>;
};

export default PokemonInfoPage;
