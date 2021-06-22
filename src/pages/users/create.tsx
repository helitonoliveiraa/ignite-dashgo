import Link from 'next/link';
import { Button } from "@chakra-ui/button";
import { Box, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

import { Input } from "../../components/Form/input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string()
    .min(6, 'No mínino 6 caracteres').required('Senha obrigatória'),
  password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'As senhas devem ser identicas')
});

export default function createUser() {
  const router = useRouter();

  const createUser = useMutation(async (user: CreateUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);

    router.back();
  }

  return (
    <Box>
      <Header />

      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"
      >
        <Sidebar />

        <Box 
          as="form" 
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="name" 
                label="Nome completo"
                error={formState.errors.name}
                ref={register}
                {...register('name')}  
              />
              <Input 
                name="email" 
                type="email" 
                label="E-mail"  
                error={formState.errors.email}
                ref={register}
                {...register('email')} 
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input 
                name="password" 
                type="password" 
                label="Senha" 
                error={formState.errors.password} 
                ref={register}
                {...register('password')}   
              />
              <Input 
                name="password_confirmation" 
                type="password" 
                label="Confirmação da senha"
                error={formState.errors.password_confirmation}
                ref={register}
                {...register('password_confirmation')}   
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme='whiteAlpha'>Cancelar</Button>
              </Link>

              <Button 
                type="submit" 
                colorScheme='pink'
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}