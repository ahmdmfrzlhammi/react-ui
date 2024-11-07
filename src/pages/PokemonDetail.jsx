import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-red-500 text-center text-xl">Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="card bg-blue-200 text-red-700 shadow-xl w-full max-w-md rounded-lg overflow-hidden">
        <figure className="flex justify-center p-6 bg-white">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain"
          />
        </figure>
        <div className="card-body p-6">
          <h2 className="text-2xl font-bold text-center text-sky-700 mb-4">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <p className="text-center text-lg"><strong>Number:</strong> {pokemon.id}</p>
          <p className="text-center text-lg"><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(", ")}</p>
          <div className="mt-4">
            <p className="text-lg font-semibold text-center">Stats</p>
            <ul className="text-center space-y-2">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name} className="text-sm">
                  {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-actions flex justify-center mb-12">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-primary bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-900"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
