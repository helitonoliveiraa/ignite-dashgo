import { 
  FormControl, 
  FormLabel, 
  FormErrorMessage,
  Input as ChakraInput, 
  InputProps as ChakraInputProps 
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from 'react-hook-form';

type InputProps = ChakraInputProps & {
  name: string;
  label?:string;
  error?: FieldError;
};

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> 
  = ({ name, label, error = null, ...inputProps }: InputProps, ref) => {
  return (
    <FormControl id={name} isInvalid={!!error}>
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

    {!!error && (
      <FormErrorMessage>
        {error.message}
      </FormErrorMessage>
    )}
  </FormControl>
  );
}

export const Input = forwardRef(InputBase); 