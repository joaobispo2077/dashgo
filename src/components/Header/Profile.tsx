import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export type ProfileProps = {
  showProfileData?: boolean;
};

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>João Bispo</Text>
          <Text color="gray.300" fontSize="small">
            joaobispo2077@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="João Bispo"
        src="https://github.com/joaobispo2077.png"
      />
    </Flex>
  );
}
