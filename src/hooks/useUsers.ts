import { useQuery } from 'react-query';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

type getUsersResponse = {
  users: User[];
  totalCount: number;
};

export async function getUsers(page: number): Promise<getUsersResponse> {
  const response = await api.get<{ users: User[] }>('/users', {
    params: {
      page,
    },
  });
  const { data, headers } = response;

  const totalCount = Number(headers['x-total-count']) || 0;

  const users = data.users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users, totalCount };
}

export const useUsers = (page: number) => {
  return useQuery(['dashgo@users', page], () => getUsers(page), {
    staleTime: 1000 * 5,
  });
};
