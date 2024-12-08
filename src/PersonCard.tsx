import type { Person } from "./App";

const PersonCard: React.FC<{ person: Person, onClickPerson: (name: string) => void }> = ({ person, onClickPerson }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        border: "1px solid black",
        margin: "10px",
        width: '200px',
        borderRadius: '8px'
      }}
      onClick={() => onClickPerson(person.name)}
    >
      {person.name}
    </div>
  );
};

export { PersonCard };
