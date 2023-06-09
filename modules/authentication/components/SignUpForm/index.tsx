'use client';

import { useForm } from 'react-hook-form';
import { Button, VStack, Container } from '@chakra-ui/react';
import { InputText } from '@ui/InputText';
import { useAsync } from '@hooks/useAsync';
import { signUp } from '@auth/auth-service';
import { useUser } from '@user/presentation/hooks/useUser';
import { SignUpFormFields } from './SignUpForm.interface';

export const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUpFormFields>();
  const { setUser } = useUser();

  const onSubmit = useAsync(
    async (data: SignUpFormFields) => {
      const user = await signUp({
        email: data.email,
        name: data.name,
        password: data.password,
      });

      setUser(user);
    },
    {
      onSuccess: {
        redirect: '/',
      },
    }
  );

  return (
    <Container as="section" maxWidth="md">
      <VStack as="form" onSubmit={handleSubmit(onSubmit.execute)}>
        <InputText
          label="Nombre"
          type="text"
          control={control}
          name="name"
          rules={{ required: true }}
        />
        <InputText
          label="Email"
          type="email"
          control={control}
          name="email"
          rules={{ required: true }}
        />
        <InputText
          label="Contraseña"
          type="password"
          control={control}
          name="password"
          rules={{ required: true }}
        />
        <Button type="submit" isLoading={onSubmit.status === 'loading'}>
          Submit
        </Button>
      </VStack>
    </Container>
  );
};
