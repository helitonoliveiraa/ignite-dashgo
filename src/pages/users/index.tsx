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
import { useEffect, useState } from 'react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { useQuery } from 'react-query';

import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { api } from '../../services/api';
import { useUsers } from '../../services/hooks/useUsers';

export default function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, isFetching } = useUsers(currentPage);
  
  console.log(currentPage);

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
            <Heading size="lg" fontWeight="normal">
              Usuários

              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

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
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]} >
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize="sm" color="gray.300">{user.email}</Text>
                      </Td>
                      {isWideVersion && (
                        <Td>
                          <Text>{user.createdAt}</Text>
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
                  ))}
                </Tbody>
              </Table>

              <Pagination 
                totalCounOfRegisters={data.totalCount}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}