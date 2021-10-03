import { 
  Flex, 
  Button, 
  VStack} from '@chakra-ui/react';
  import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  console.log(errors);

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <VStack spacing="4">
          <Input 
            name="email" 
            type="email" 
            label="E-mal"
            error={errors.email}
            {...register('email', { required: 'E-mail obrigatório' })}
          />

          <Input 
            name="password" 
            type="password" 
            label="Senha"
            error={errors.password}
            {...register('password')}
          />
        </VStack>

        <Button
          type="submit"
          mt="6"
          size="lg"
          colorScheme="pink"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>  
    </Flex>
  )
}
