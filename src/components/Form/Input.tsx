import { 
  FormControl, 
  FormLabel, 
  Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

type InputProps = ChakraInputProps & {
  name: string;
  label?:string;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, ...inputProps }: InputProps, ref) => {
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
      ref={ref}
      {...inputProps}
    />
  </FormControl>
  );
}

export const Input = forwardRef(InputBase); 