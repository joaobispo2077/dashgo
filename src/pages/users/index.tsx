import NextLink from 'next/link';
import { useState } from 'react';
import {
  useBreakpointValue,
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Checkbox,
  Tbody,
  Text,
  Spinner,
  Stack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine, RiRefreshLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from '../../hooks/useUsers';
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [isReloadButtonDisable, setIsReloadButtonDisable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch, error } = useUsers(currentPage);
  const isReloading = !isLoading && isFetching;

  const isDesktopScreen = useBreakpointValue({
    base: false,
    lg: true,
  });

  const handleReloadUserList = () => {
    refetch();

    setIsReloadButtonDisable(true);

    setTimeout(() => {
      setIsReloadButtonDisable(false);
    }, 5000);
  };

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(
      ['dashgo@user', userId],
      async () => {
        const response = await api.get(`/users/${userId}`);
        return response.data;
      },
      {
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    );
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {isReloading && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Stack direction={['column', 'row']} spacing="3">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                onClick={handleReloadUserList}
                transition="filter 0.25s ease-in-out"
                _hover={{ cursor: 'pointer', filter: 'brightness(80%)' }}
                disabled={isReloadButtonDisable}
              >
                Atualizar
              </Button>
              <NextLink href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar usuário
                </Button>
              </NextLink>
            </Stack>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={['4', '4', '6']} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isDesktopScreen && <Th>Data de cadastro</Th>}
                    {isDesktopScreen && <Th width="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={['4', '4', '6']}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td px={['4', '4', '6']}>
                        <Box>
                          <ChakraLink
                            color="purple.400"
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                          >
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isDesktopScreen && <Td>{user.createdAt}</Td>}
                      {isDesktopScreen && (
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            transition="filter 0.25s ease-in-out"
                            _hover={{
                              cursor: 'pointer',
                              filter: 'brightness(80%)',
                            }}
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
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
          )}
        </Box>
      </Flex>
    </Box>
  );
}
