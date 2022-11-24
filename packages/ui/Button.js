import { jsx as _jsx } from "react/jsx-runtime";
import { Button as ChakraButton } from '@chakra-ui/react';
export const Button = () => {
    return _jsx(ChakraButton, Object.assign({ style: { background: "red" } }, { children: "Boop" }));
};
