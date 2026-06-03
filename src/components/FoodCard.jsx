import { Box, Flex, Text, Button, Image, Badge, NumberInput, VStack, HStack } from '@chakra-ui/react'
import { useState, useContext } from 'react'
import { CartContext } from "../context/cartStore"
import { EventCaptureContext } from '../context/EventCaptureContex'
const FoodCard = ({ item }) => {
    const { captureEvent } = useContext(EventCaptureContext)
    const handleEventCapture = (eventname,eventSequence) => {
    try {
      captureEvent(eventname, eventSequence);
    } catch (error) {
      console.log(error.message)
    }
  }
    const [quantity, setQuantity] = useState(1);
    const { setCartItems } = useContext(CartContext);

    const handleCart = () => {
        setCartItems(prev => {
            const exists = prev.find(i => i.id === item.id);

            if (exists) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            
            return [...prev, { ...item, quantity }];
        });
        handleEventCapture("CATERING_ADD_TO_ORDER",4)
    }
    return (
        <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="sm"
            border="1px solid"
            borderColor="gray.100"
            transition="all 0.3s"
            _hover={{ transform: 'translateY(-8px)', boxShadow: '2xl' }}
            cursor="pointer"
        >
            <Box position="relative">
                <Image
                    src={item.image}
                    alt={item.name}
                    w="100%"
                    h="220px"
                    objectFit="cover"
                    fallbackSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"
                />
                {item.badge && (
                    <Badge
                        position="absolute"
                        top={3}
                        left={3}
                        bg="#E8501A"
                        color="white"
                        px={3}
                        py={1}
                        borderRadius="md"
                        fontSize="xs"
                        fontWeight="800"
                    >
                        {item.badge}
                    </Badge>
                )}
            </Box>

            <Box p={5}>
                <Flex justify="space-between" align="center" mb={2}>
                    <Text fontWeight="800" fontSize="lg" color="#1A1A1A">
                        {item.name}
                    </Text>
                    <Text fontWeight="800" fontSize="lg" color="#E8501A">
                        ${Number(item?.price || 0).toFixed(2)}
                    </Text>
                </Flex>

                <Text fontSize="sm" color="gray.500" mb={5} lineHeight="1.6">
                    {item.description}
                </Text>
                <VStack gap={4} align="stretch">
                    <HStack justify="space-between" align="center">
                        <Text
                            fontSize="sm"
                            fontWeight="600"
                            color="gray.700"

                        >
                            Quantity
                        </Text>

                        <NumberInput.Root
                            size="sm"
                            min={0}
                            defaultValue="1"
                            width="160px"
                            value={quantity}
                            onValueChange={(e) => setQuantity(Number(e.value))}
                        >
                            <NumberInput.Control />
                            <NumberInput.Input
                                textAlign="center"
                                borderRadius="full"
                                border="1px solid"
                                borderColor="gray.200"
                                fontWeight="600"
                                bg="white"
                            />
                        </NumberInput.Root>
                    </HStack>

                    <Button
                        bg="#E8501A"
                        color="white"
                        w="100%"
                        borderRadius="xl"
                        py={6}
                        fontSize="sm"
                        fontWeight="700"
                        _hover={{
                            bg: "#CB4617",
                            transform: "translateY(-1px)",
                        }}
                        transition="all 0.2s"
                        onClick={() => {handleCart()} }>
                        Add to Order
                    </Button>
                </VStack>
            </Box>
        </Box>
    )
}

export default FoodCard;
