import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  createdAt: string;
};

export type getUsersResponse = {
  users: Omit<User, 'created_at'>[];
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
    createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }),
  }));

  return { users, totalCount };
}

export const useUsers = (page: number, options?: UseQueryOptions) => {
  return useQuery(['dashgo@users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutes,
    ...options,
  }) as UseQueryResult<getUsersResponse>;
};
