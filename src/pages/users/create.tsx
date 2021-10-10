import { 
  Box, 
  Flex,
  Heading,
  Divider,
  SimpleGrid,
  VStack,
  HStack,
  Button
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import * as yup from 'yup';

import { Input } from '../../components/Form/Input';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { queryClient } from '../../services/queryClient';

type createUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const createUserSchema = yup.object({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória')
    .min(6, 'No mínimo 6 caractres'),
    password_confirmation: yup.string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password'), null], 'As senha não batem')
});

export default function CreateUser() {
  const router = useRouter();
  
  const createUser = useMutation(
    async (user: createUserFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date(),
      }
    });

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(createUserSchema),
  });

  const handleCreateUser: SubmitHandler<createUserFormData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push('/users');
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box 
          as="form"
          onSubmit={handleSubmit(handleCreateUser)}
          flex="1" 
          borderRadius={8} 
          bg="gray.800" 
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
        
          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input 
                name="name" 
                label="Nome" 
                error={errors.name}
                {...register('name')}
              />
              <Input 
                name="email" 
                label="E-mail" 
                type="email" 
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input 
                name="password" 
                label="Senha" 
                type="password" 
                error={errors.password}
                {...register('password')}
              />
              <Input 
                name="password_confirmation" 
                label="Confirmação da senha" 
                type="password" 
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
            <Link href="/users" passHref>
              <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
            </Link>
              <Button 
                type="submit" 
                colorScheme="pink"
                isLoading={isSubmitting}
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