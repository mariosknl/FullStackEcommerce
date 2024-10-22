import { login, signup } from "@/api/auth";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useAuth((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);
  const isLoggedIn = useAuth((state) => !!state.token);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      console.log("success: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: () => {
      console.log("error");
    },
  });

  const signupMutation = useMutation({
    mutationFn: () => signup(email, password),
    onSuccess: (data) => {
      console.log("success sign up: ", data);
      if (data.user && data.token) {
        setUser(data.user);
        setToken(data.token);
      }
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

  if (isLoggedIn) {
    return <Redirect href="/" />;
  }

  return (
    <FormControl
      isInvalid={loginMutation.error || signupMutation.error}
      className="p-4 border max-w-[960px] rounded-lg border-outline-300 bg-white m-2"
    >
      <VStack space="xl">
        <Heading className="text-typography-900 leading-3 pt-3">Login</Heading>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Email</Text>
          <Input>
            <InputField value={email} onChangeText={setEmail} type="text" />
          </Input>
        </VStack>
        <VStack space="xs">
          <Text className="text-typography-500 leading-1">Password</Text>
          <Input className="text-center">
            <InputField
              value={password}
              onChangeText={setPassword}
              type={showPassword ? "text" : "password"}
            />
            <InputSlot className="pr-3" onPress={handleState}>
              <InputIcon
                as={showPassword ? EyeIcon : EyeOffIcon}
                className="text-darkBlue-500"
              />
            </InputSlot>
          </Input>
        </VStack>
        <HStack space="sm">
          <Button
            variant="outline"
            className="flex-1"
            onPress={() => signupMutation.mutate()}
          >
            <ButtonText>Sign up</ButtonText>
          </Button>
          <Button className="flex-1" onPress={() => loginMutation.mutate()}>
            <ButtonText>Sign in</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </FormControl>
  );
}
