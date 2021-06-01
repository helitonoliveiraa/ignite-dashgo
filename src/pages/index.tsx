import { Flex, Button, Stack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Input } from '../components/Form/input';

type SignInFormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  console.log(formState.errors);

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data);
  }

  return (
    <Flex 
      w="100vw" 
      h="100vh"
      align="center"
      justifyContent="center"
    >
      <Flex 
        as="form" 
        width="100%" 
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input 
            name="email" 
            type="email" 
            label="E-mail"
            error={formState.errors.email}
            ref={register}
            {...register('email')}
          />

          <Input 
            name="password" 
            type="password" 
            label="Senha" 
            error={formState.errors.password}
            ref={register}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
