import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

type ProfileProps = {
  showProfileData?: boolean;
};

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Héliton Oliveira</Text>
          <Text color="gray.300" fontSize="small">
            heliton.oliveira88@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Héliton Oliveira" src="https://github.com/helitonoliveiraa.png" />
    </Flex>
  );
}