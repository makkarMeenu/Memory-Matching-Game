import React, { useEffect, useState } from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Box,
  Button,
} from "native-base";
import MemoryCard from "./components/MemoryCard";
import "./app.css";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
  interface ICustomTheme extends MyThemeType {}
}
export default function App() {
  const memoryGameArray = [
    "abc",
    "cde",
    "fgh",
    "ijk",
    "lmn",
    "opq",
    "rst",
    "uvw",
  ];
  const [memoryCards, setMemoryCards]: any = useState([]);
  const [turns, setTurns] = useState(0);
  const [chosenCard, setChosenCard]: any = useState(null);
  const [chosenCard2, setChosenCard2]: any = useState(null);
  const [disabledCard, setDisabledCard] = useState(false);

  function getMemoryCards() {
    const doubleArray = [...memoryGameArray, ...memoryGameArray];
    const memoryGameShuffledArray = doubleArray
      .sort(() => Math.random() - 0.5)
      .map((item) => ({ item, id: Math.random() }));
    return memoryGameShuffledArray;
  }

  function setNewGame() {
    setMemoryCards(getMemoryCards());
    setTurns(0);
  }

  function increaseTurn() {
    setChosenCard(null);
    setChosenCard2(null);
    setTurns((turns) => turns + 1);
    setDisabledCard(false);
  }

  useEffect(() => {
    setNewGame();
  }, []);

  useEffect(() => {
    if (chosenCard && chosenCard2) {
      setDisabledCard(true);
      if (
        chosenCard.id !== chosenCard2.id &&
        chosenCard.item === chosenCard2.item
      ) {
        setMemoryCards((memoryCards: any) => {
          return memoryCards.map((card: any) => {
            if (card.item === chosenCard.item) {
              return { ...card, isMatched: true };
            } else {
              return card;
            }
          });
        });
        increaseTurn();
      } else {
        setTimeout(() => {
          increaseTurn();
        }, 1000);
      }
    }
  }, [chosenCard, chosenCard2]);

  function handleCardPress(item: any) {
    console.log(item, "dhdh");
    chosenCard && chosenCard.id !== item.id
      ? setChosenCard2(item)
      : setChosenCard(item);
  }
  return (
    <NativeBaseProvider>
      <Center mt="5">
        <VStack justifyContent="space-between">
          <VStack space="6">
            <Heading>Memory Matching game</Heading>
            <Button
              nativeID="btn"
              alignSelf="center"
              onPress={() => {
                setNewGame();
              }}
            >
              New Game
            </Button>
          </VStack>
        </VStack>
      </Center>
      <Center mt="auto">
        <HStack space="5">
          <Text fontSize="lg" fontWeight="semibold">
            Turns: {turns}
          </Text>
        </HStack>
      </Center>

      <Center flexDirection="row" flexWrap="wrap" m="auto">
        {memoryCards.map((item: any) => {
          return (
            <VStack>
              <MemoryCard
                item={item}
                handleCardPress={() => {
                  handleCardPress(item);
                }}
                open={
                  chosenCard === item || chosenCard2 === item || item.isMatched
                }
                disabledCard={disabledCard}
                chosenCard={chosenCard}
              />
            </VStack>
          );
        })}
      </Center>
    </NativeBaseProvider>
  );
}
