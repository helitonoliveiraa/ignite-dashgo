import { 
  Box, 
  Flex, 
  Heading, 
  Button, 
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';

export default function UserList() {
  const { data, isLoading, isError } = useQuery('users', async () => {
    const response = await fetch('http://localhost:3000/api/users')
    const data = await response.json();

    return data;
  })
  
  console.log(data);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });



  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>

            <Link href="/users/create" passHref>
              <Button 
                as="a" 
                size="sm" 
                fontSize="sm" 
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>
        
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : isError ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários!</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th >
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th width="8" />
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td px={["4", "4", "6"]} >
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Text fontWeight="bold">Héliton Oliveira</Text>
                      <Text fontSize="sm" color="gray.300">heliton.oliveira88@gmail.com</Text>
                    </Td>
                    {isWideVersion && (
                      <Td>
                        <Text>04 Julho 2021</Text>
                      </Td>
                    )}
                    <Td>
                    {isWideVersion && (
                      <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        Editar
                      </Button>
                    )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px={["4", "4", "6"]} >
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Text fontWeight="bold">Héliton Oliveira</Text>
                      <Text fontSize="sm" color="gray.300">heliton.oliveira88@gmail.com</Text>
                    </Td>

                    {isWideVersion && (
                      <Td>
                        <Text>04 Julho 2021</Text>
                      </Td>
                    )}

                    <Td>
                    {isWideVersion && (
                      <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        Editar
                      </Button>
                    )}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td px={["4", "4", "6"]} >
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Text fontWeight="bold">Héliton Oliveira</Text>
                      <Text fontSize="sm" color="gray.300">heliton.oliveira88@gmail.com</Text>
                    </Td>
                    {isWideVersion && (
                      <Td>
                        <Text>04 Julho 2021</Text>
                      </Td>
                    )}
                    <Td>
                    {isWideVersion && (
                      <Button 
                        as="a" 
                        size="sm" 
                        fontSize="sm" 
                        colorScheme="purple"
                        leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                      >
                        Editar
                      </Button>
                    )}
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Pagination />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}