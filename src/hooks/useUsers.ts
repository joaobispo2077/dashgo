import { useQuery } from 'react-query';
import { api } from '../services/api';

export const useUsers = () => {
  return useQuery(
    'dashgo@users',
    async () => {
      const response = await api.get('/users');
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
    },
    {
      staleTime: 1000 * 5,
    },
  );
};
