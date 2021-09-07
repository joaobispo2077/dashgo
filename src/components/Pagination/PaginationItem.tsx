import { Button } from '@chakra-ui/react';

export type PaginationItemProps = {
  isCurrent?: boolean;
  number: number;
};

export function PaginationItem({
  isCurrent = false,
  number,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        colorScheme="pink"
        disabled
        _disabled={{
          bgColor: 'pink.500',
        }}
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      bg="gray.700"
      _hover={{
        bg: 'gray.500',
      }}
    >
      {number}
    </Button>
  );
}
