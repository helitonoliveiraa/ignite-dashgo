import { useState } from 'react';
import { GetServerSideProps } from 'next';
import NextLink from 'next/link';
import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { RiAddLine } from "react-icons/ri";
import { Box, Flex, Heading, Text, Table, Tbody, Td, Th, Thead, Tr, Checkbox, useBreakpointValue, Spinner, Link } from '@chakra-ui/react';
import { dehydrate } from "react-query/hydration";

import { queryClient } from '../../services/queryClient';
import { getUsers } from '../../services/hooks/useUses';

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from '../../services/hooks/useUses';
import { api } from '../../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type UserListProps = {
  users: User[];
  totalCount: number;
};

export default function UserList({ users }: UserListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(currentPage, {
    // initialData: users,
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutes
    });
  };

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

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários

              { !isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              ) }  
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar nono
              </Button>
            </NextLink>
          </Flex>
        
          { isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
            <Table colorScheme="whiteAlpha">
              <Thead>
                <Tr>
                  <Th px={["4", "4", "6"]} color="gray.300" width="8">
                    <Checkbox colorScheme="pink" />
                  </Th>
                  <Th>Usuário</Th>
                  { isWideVersion && <Th>Data de cadastro</Th> }
                  <Th w="8"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.users.map(user => (
                  <Tr key={user.id}>
                    <Td px={["4", "4", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                          <Text fontWeight="bold">{user.name}</Text>
                        </Link>
                        <Text fontSize="sm" color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    { isWideVersion && <Td>04 de abril, 2021</Td> }
                    <Td>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            <Pagination 
              totalCountOfRegisters={data.totalCount}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
            </>
          ) }
        </Box>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const { users, totalCount } = await getUsers(1);

  await queryClient.prefetchQuery("users", () => getUsers(1), {
    staleTime: Infinity,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}