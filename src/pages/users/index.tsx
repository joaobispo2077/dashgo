import Link from 'next/link';
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
  HStack,
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine, RiRefreshLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from '../../hooks/useUsers';

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

            <HStack spacing="3">
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="blue"
                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                onClick={handleReloadUserList}
                _hover={{ cursor: 'pointer' }}
                disabled={isReloadButtonDisable}
              >
                Atualizar
              </Button>
              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar usuário
                </Button>
              </Link>
            </HStack>
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
                          <Text fontWeight="bold">{user.name}</Text>
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
