import { Text, Flex, Input, Button, VStack, FormLabel, FormControl } from '@chakra-ui/react';

export default function Home() {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      alignItems="center" 
      justifyContent="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <VStack spacing="4">
          <FormControl id="email">
            <FormLabel>E-mail</FormLabel>
            <Input 
              name="email" 
              type="email" 
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{
                background: "gray.900",
                borderColor: "pink.500"
              }}
              size="lg"
            />
          </FormControl>

          <FormControl id="password">
            <FormLabel>Senha</FormLabel>
            <Input 
              name="password" 
              type="password" 
              focusBorderColor="pink.500"
              bgColor="gray.900"
              variant="filled"
              _hover={{
                background: "gray.900",
                borderColor: "pink.500"
              }}
              size="lg"
            />
          </FormControl>
        </VStack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="pink"
        >
          Entrar
        </Button>
      </Flex>  
    </Flex>
  )
}
