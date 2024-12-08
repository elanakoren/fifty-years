import type { Person } from "./App";
import './App.css';

export const PersonPage: React.FC<{
  person: Person;
  onClickBack: () => void;
  neighbors: Person[];
}> = ({ person, onClickBack, neighbors }) => {
  const renderBackButton = () => {
    return (
      <div className="back-button-container">
        <button className="back-button" onClick={onClickBack}>Back</button>
      </div>
    );
  };

  const renderPersonDetails = () => {
    return (
      <div>
        <div>Name: {person.name}</div>
        <div>Eye color: {person.eye_color}</div>
        <div>Gender: {person.gender}</div>
        <div>Height: {person.height}</div>
        <div>Mass: {person.mass}</div>
        <div>Skin color: {person.skin_color}</div>
        <div>Birth year: {person.birth_year}</div>
      </div>
    );
  };

  const renderNeighbors = () => {
    const neighborList = neighbors.map((neighbor) => {
      return <li key={neighbor.name}>{neighbor.name}</li>;
    });
    return (
      <div className="neighbor-list">
        Planetary neighbors:
        {neighborList.length > 0 ? (
          <ul className="neighbor-list-container">{neighborList}</ul>
        ) : (
          " None"
        )}
      </div>
    );
  };

  return (
    <div>
      {renderBackButton()}
      {renderPersonDetails()}
      {renderNeighbors()}
    </div>
  );
};
