import type { Person } from "./App";

const PersonCard: React.FC<{ person: Person, onClickPerson: (name: string) => void }> = ({ person, onClickPerson }) => {
  return (
    <div
      className="person-card"
      onClick={() => onClickPerson(person.name)}
    >
      {person.name}
    </div>
  );
};

export { PersonCard };
