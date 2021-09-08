import { Flex, Button, Stack } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
};

const sigInFormASchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
});

export default function Home() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(sigInFormASchema),
  });
  const { errors } = formState;

  const handleSignIn: SubmitHandler<SignInFormData> = async (form) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(form);
    console.log('Entering...');
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <Input
            name="email"
            label="E-mail"
            type="email"
            placeholder="Exemplo: example@gmail.com"
            {...register('email')}
            error={errors.email}
          />
          <Input
            name="password"
            label="Senha"
            type="password"
            placeholder="Exemplo: **************"
            {...register('password')}
            error={errors.password}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}
