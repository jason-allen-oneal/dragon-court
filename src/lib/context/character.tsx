import { createContext, useContext, useState, PropsWithChildren } from 'react';

type characterContextType = {
  inCharacter: boolean;
  setInCharacter: (c: boolean) => void;
  enterCharacter: () => void;
  exitCharacter: () => void;
  exitGame: () => void;
};

const characterContextDefault: characterContextType = {
  inCharacter: false,
  setInCharacter: (e: boolean) => {},
  enterCharacter: () => {},
  exitCharacter: () => {},
  exitGame: () => {},
};

export const CharacterContext = createContext(characterContextDefault);

export function CharacterProvider(props: PropsWithChildren) {
  const [inCharacter, setInCharacter] = useState(false);
  
  const enterCharacter = () => {
    setInCharacter(true);
  };
  
  const exitCharacter = () => {
    setInCharacter(false);
  };
  
  const exitGame = () => {
  
  };
  
  return (
    <CharacterContext.Provider value={{ inCharacter, setInCharacter, enterCharacter, exitCharacter, exitGame }}>
      {props.children}
    </CharacterContext.Provider>
  );
}

export function useCharacterContext() {
  return useContext(CharacterContext);
}