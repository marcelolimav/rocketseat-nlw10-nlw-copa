import { useState } from "react";
import { Heading, Text, VStack, useToast } from "native-base";
import { Alert } from "react-native";

import Logo from "../assets/logo.svg";
import { api } from "../services/api";

import { Button } from "../components/Button";

import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function New() {
  const [title, setTitle] = useState("");
  const [loading, setIsLoading] = useState(false);
  const toast = useToast();

  async function handlePollCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Informe um nome para o seu bolão.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);

      const data = { title: title.trim().toUpperCase() };

      const response = await api.post("/polls", data);

      console.log(response);

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      setTitle("");
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível criar o seu bolão.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" />
      <VStack mt={8} mx={5} alignItems="center">
        <Logo />
        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR SEU BOLÃO"
          onPress={handlePollCreate}
          isLoading={loading}
        />
        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código que poderá usar para
          convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
