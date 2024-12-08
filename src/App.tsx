import { useState, useEffect } from "react";
import { PersonCard } from "./PersonCard";
import { PersonPage } from "./PersonPage";

export type Person = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

type PersonResponse = {
  results: Person[];
  count: number;
  next: string | null;
  previous: string | null;
};

function App() {
  const [response, setResponse] = useState<PersonResponse>({
    results: [],
    count: 0,
    next: null,
    previous: null,
  });
  const [arePeopleLoading, setArePeopleLoading] = useState<boolean>(true);
  const [personView, setPersonView] = useState("");
  const [filteredCharacters, setFilteredCharacters] = useState<Person[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // fetch all pages at once, on mount. we need to do this for the neighbor list to be accurate.
  const fetchAllPages = async (url: string) => {
    let allResults: Person[] = [];
    let nextUrl: string | null = url;

    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data: PersonResponse = await response.json();
      allResults = allResults.concat(data.results);
      nextUrl = data.next;
    }

    return allResults;
  };

  useEffect(() => {
    const fetchData = async () => {
      const allData = await fetchAllPages("https://swapi.dev/api/people");
      setResponse({
        results: allData,
        count: allData.length,
        next: null,
        previous: null,
      });
      setArePeopleLoading(false);
    };
    fetchData();
  }, []);

  const getPlanetaryNeighbors = (matchingPerson: Person) => {
    if (!matchingPerson) return;
    // find the character's neighbors. remember that a person cannot be their own neighbor.
    return response.results.filter(
      (person) =>
        person.homeworld === matchingPerson.homeworld &&
        person.name !== matchingPerson.name
    );
  };

  const renderPeople = () => {
    if (arePeopleLoading) return null;
    else if (personView) {
      const matchingPerson = response.results.find(
        (person) => person.name === personView
      );
      if (!matchingPerson) return null;
      const planetaryNeighbors = getPlanetaryNeighbors(matchingPerson);
      return (
        <PersonPage
          person={matchingPerson}
          onClickBack={onClickBack}
          neighbors={planetaryNeighbors || []}
        />
      );
    } else if (searchQuery.length > 0) {
      return filteredCharacters.map((filteredCharacter) => {
        return (
          <PersonCard
            person={filteredCharacter}
            key={filteredCharacter.name}
            onClickPerson={() => onClickPerson(filteredCharacter.name)}
          />
        );
      });
    } else
      return response.results.map((person: Person) => {
        return (
          <PersonCard
            person={person}
            key={person.name}
            onClickPerson={() => onClickPerson(person.name)}
          ></PersonCard>
        );
      });
  };

  const onClickBack = () => {
    setPersonView("");
  };

  const onClickPerson = (name: string) => {
    setPersonView(name);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (arePeopleLoading) return null;
    setSearchQuery(e.target.value)
    const matchingCharacters = response.results.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilteredCharacters(matchingCharacters);
  };

  const renderSearchInput = () => {
    return (
      <div style={{ marginLeft: "60px" }}>
        <label>Search for a character: </label>
        <input onChange={onSearch} />
      </div>
    );
  };

  return (
    <>
      {renderSearchInput()}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          marginLeft: "50px",
        }}
      >
        {renderPeople()}
      </div>
    </>
  );
}

export default App;
