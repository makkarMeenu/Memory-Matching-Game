import { Box, Center, Pressable, Text } from "native-base";
import React from "react";
const MemoryCard = ({
  item,
  handleCardPress,
  open,
  disabledCard,
  chosenCard,
}: any) => {
  function handlePress(item: any) {
    if (!disabledCard) handleCardPress(item);
  }
  return (
    <Center w="100" h="100" m="1">
      <Center h="100%" w="100%">
        <Text>{item.item}</Text>
      </Center>
      <Pressable
        position="absolute"
        h="100%"
        w="100%"
        bg={open ? "transparent" : "pink.800"}
        onPress={() => {
          handlePress(item);
        }}
      />
    </Center>
  );
};

export default MemoryCard;
