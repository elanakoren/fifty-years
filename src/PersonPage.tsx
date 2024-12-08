import type { Person } from "./App";

export const PersonPage: React.FC<{
  person: Person;
  onClickBack: () => void;
  neighbors: Person[];
}> = ({ person, onClickBack, neighbors }) => {
  const renderBackButton = () => {
    return <div onClick={onClickBack}>Back</div>;
  };
  const renderPersonDetails = () => {
    return <>Name: {person.name}</>;
  };

  const renderNeighbors = () => {
    const neighborList = neighbors.map(neighbor => {
      return (<div key={neighbor.name}>{neighbor.name}</div>)
    })
    return (
      <div>
        Planetary neighbors:
        {neighborList.length > 0 ? neighborList : " No planetary neighbors"}
      </div>
    )
  }
  return (
    <div>
      {renderBackButton()}
      {renderPersonDetails()}
      {renderNeighbors()}
    </div>
  );
};
