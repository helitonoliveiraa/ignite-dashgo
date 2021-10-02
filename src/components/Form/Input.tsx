import { 
  FormControl, 
  FormLabel, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";

type InputProps = ChakraInputProps & {
  name: string;
  label?:string;
};

export function Input({ name, label, ...inputProps }: InputProps) {
  return (
    <FormControl id={name}>
    {!!label && <FormLabel>{label}</FormLabel>}
    <ChakraInput 
      name={name} 
      focusBorderColor="pink.500"
      bgColor="gray.900"
      variant="filled"
      _hover={{
        background: "gray.900",
        borderColor: "pink.500"
      }}
      size="lg"
      {...inputProps}
    />
  </FormControl>
  );
}