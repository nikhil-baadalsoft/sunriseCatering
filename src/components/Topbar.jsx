import { Box, Flex, Text, HStack } from '@chakra-ui/react'
import { FiShoppingCart } from "react-icons/fi";
import { useContext } from 'react'
import { CartContext } from "../context/cartStore"
import {useNavigate } from 'react-router-dom';
import { EventCaptureContext } from '../context/eventCaptureStore'
const TopBar = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();
    const { captureEvent } = useContext(EventCaptureContext)
    const handleEventCapture = (eventname) => {
    try {
      captureEvent(eventname);
      navigate("/cart")
    } catch (error) {
      console.log(error.message)
    }
  }
    return (
        <Box bg="#E8501A" px={{ base: 4, md: 12, lg: 20 }} py={3}>
            <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
                <HStack gap={3}>
                    <Text
                        fontSize="sm"
                        fontWeight="700"
                        color="white"
                        cursor="pointer"
                        letterSpacing="wide"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        SIGN IN
                    </Text>
                    <Text fontSize="sm" color="white" fontWeight="400">
                        /
                    </Text>
                    <Text
                        fontSize="sm"
                        fontWeight="700"
                        color="white"
                        cursor="pointer"
                        letterSpacing="wide"
                        _hover={{ textDecoration: 'underline' }}
                    >
                        SIGN UP
                    </Text>
                </HStack>
                <Box position="relative" cursor="pointer" onClick={()=>{handleEventCapture("CATERING_ADD_TO_CART",4)}}>
                    <FiShoppingCart size={24} color="white" />

                    <Box
                        position="absolute"
                        top="-8px"
                        right="-10px"
                        bg="white"
                        color="#E8501A"
                        borderRadius="full"
                        minW="20px"
                        h="20px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="xs"
                        fontWeight="700"
                    >
                        {cartItems.length}
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default TopBar
