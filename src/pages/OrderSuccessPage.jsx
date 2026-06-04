import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Separator,
    Text,
    VStack,
} from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { EventCaptureContext } from '../context/eventCaptureStore'

const OrderSuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { captureEvent } = useContext(EventCaptureContext);
    const handleEventCapture = (eventname) => {
        try {
            sessionStorage.removeItem("checkout-data");
            captureEvent(eventname);
            navigate("/");

        } catch (error) {
            console.log(error.message)
        }
    }

    const { deliveryDetails, cartItems, subtotal } =
        location.state || {};

    return (
        <Box
            minH="100vh"
            bg="gray.50"
            py={12}
        >
            <Container maxW="3xl">
                <Box
                    bg="white"
                    borderRadius="3xl"
                    p={10}
                    boxShadow="sm"
                >
                    <VStack gap={6}>
                        {/* Success Icon */}
                        <Flex
                            w="90px"
                            h="90px"
                            borderRadius="full"
                            bg="green.100"
                            align="center"
                            justify="center"
                        >
                            <Text
                                fontSize="4xl"
                                color="green.500"
                                fontWeight="bold"
                            >
                                ✓
                            </Text>
                        </Flex>

                        <Heading
                            textAlign="center"
                            color="gray.800"
                        >
                            Order Confirmed!
                        </Heading>

                        <Text
                            color="gray.600"
                            textAlign="center"
                        >
                            Your order has been placed
                            successfully and is being prepared.
                        </Text>

                        <Box
                            w="100%"
                            p={5}
                            bg="orange.50"
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="orange.200"
                        >
                            <Text
                                fontWeight="700"
                                fontSize="lg"
                                mb={4}
                            >
                                Pickup Details
                            </Text>

                            <VStack
                                align="stretch"
                                gap={3}
                            >
                                <Flex justify="space-between">
                                    <Text color="gray.500">
                                        Customer
                                    </Text>
                                    <Text fontWeight="600">
                                        {deliveryDetails?.fullName ||
                                            "-"}
                                    </Text>
                                </Flex>

                                <Flex justify="space-between">
                                    <Text color="gray.500">
                                        Phone
                                    </Text>
                                    <Text fontWeight="600">
                                        {deliveryDetails?.phone ||
                                            "-"}
                                    </Text>
                                </Flex>

                                <Flex justify="space-between">
                                    <Text color="gray.500">
                                        Pickup Location
                                    </Text>
                                    <Text fontWeight="600">
                                        {deliveryDetails?.pickupLocation ||
                                            "-"}
                                    </Text>
                                </Flex>

                                <Flex justify="space-between">
                                    <Text color="gray.500">
                                        Pickup Time
                                    </Text>
                                    <Text
                                        color="orange.500"
                                        fontWeight="700"
                                    >
                                        {deliveryDetails?.pickupTime ||
                                            "-"}
                                    </Text>
                                </Flex>
                            </VStack>
                        </Box>

                        <Box w="100%">
                            <Heading
                                size="md"
                                mb={4}
                            >
                                Order Summary
                            </Heading>

                            <VStack
                                align="stretch"
                                gap={3}
                            >
                                {cartItems?.map((item) => (
                                    <Flex
                                        key={item.cartItemId}
                                        justify="space-between"
                                    >
                                        <Box>
                                            <Text fontWeight="600">
                                                {item.name}
                                            </Text>

                                            <Text
                                                color="gray.500"
                                                fontSize="sm"
                                            >
                                                Qty: {item.quantity}
                                            </Text>
                                        </Box>

                                        <Text fontWeight="600">
                                            $
                                            {(
                                                item.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </Text>
                                    </Flex>
                                ))}

                                <Separator />

                                <Flex justify="space-between">
                                    <Text
                                        fontWeight="700"
                                        fontSize="xl"
                                    >
                                        Total Paid
                                    </Text>

                                    <Text
                                        fontWeight="700"
                                        fontSize="2xl"
                                        color="green.500"
                                    >
                                        $
                                        {subtotal?.toFixed(2)}
                                    </Text>
                                </Flex>
                            </VStack>
                        </Box>

                        <Button
                            mt={4}
                            size="lg"
                            bg="orange.500"
                            color="white"
                            _hover={{
                                bg: "orange.600",
                            }}
                            onClick={() => {
                                handleEventCapture("CATERING_BACK_TO_HOME", 10)

                            }}
                        >
                            Back to Home
                        </Button>
                    </VStack>
                </Box>
            </Container>
        </Box>
    );
};

export default OrderSuccessPage;
