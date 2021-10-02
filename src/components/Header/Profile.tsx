import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex align="center">
    <Box mr="4" textAlign="right">
      <Text>Héliton Oliveira</Text>
      <Text color="gray.300" fontSize="small">
        heliton.oliveira88@gmail.com
      </Text>
    </Box>

    <Avatar size="md" name="Héliton Oliveira" src="https://github.com/helitonoliveiraa.png" />
  </Flex>
  );
}