import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex, Text } from "@chakra-ui/layout";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Héliton Oliveira</Text>
        <Text color="gray.300" fontSize="small">
          heliton@gmail.com
        </Text>
      </Box>

      <Avatar 
        size="md"
        name='Héliton Oliveira' 
        src="https://avatars.githubusercontent.com/u/45343619?v=4" 
      />
  </Flex>
  );
}