import { 
  Flex, 
  Button, 
  VStack, 
  FormLabel, 
  FormControl 
} from '@chakra-ui/react';

import { Input } from '../components/Form/Input';

export default function SignIn() {
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
          <Input 
            name="email" 
            type="email" 
            label="E-mal"
          />

          <Input 
            name="password" 
            type="password" 
            label="Senha"
          />
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
