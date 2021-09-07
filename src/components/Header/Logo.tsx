import React from 'react';
import { Text } from '@chakra-ui/react';

export function Logo() {
  return (
    <Text w="64" as="h1" fontSize="3xl" fontWeight="bold" letterSpacing="tight">
      dashgo
      <Text as="span" ml="1" color="pink.500">
        .
      </Text>
    </Text>
  );
}
