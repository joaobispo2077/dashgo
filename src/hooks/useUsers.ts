import { useQuery } from 'react-query';
import { api } from '../services/api';

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getUsers(): Promise<User[]> {
  const response = await api.get<{ users: User[] }>('/users');
  const { data } = response;

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

  return users;
}

export const useUsers = () => {
  return useQuery('dashgo@users', getUsers, {
    staleTime: 1000 * 5,
  });
};
