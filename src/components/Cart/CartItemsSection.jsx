import { Box, Button, Image, Text, HStack, NumberInput } from "@chakra-ui/react";
import { useContext } from 'react'
import { CartContext } from "../../context/cartStore"

const CartItemsSection = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item.quantity || 1),
    0,
  );

  const handleQuantityChange = (cartItemId, value) => {
    const qty = Number(value);

    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: qty < 1 ? 1 : qty }
          : item
      )
    );
  };

  const removeItem = (cartItemId) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };
  
  return (
    <Box w="100%">
      <Box className="cartItems">
        {cartItems.map((item, index) => (
          <Box
            key={item.cartItemId ?? `${item.id}-${index}`}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={4}
            mb={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="xl"
            bg="white"
          >
            {/* LEFT SIDE */}
            <HStack gap={4}>
              <Image
                src={item.image}
                alt={item.name}
                boxSize="70px"
                objectFit="cover"
                borderRadius="md"
              />

              <Box>
                <Text fontWeight="700">{item.name}</Text>
                <Text fontSize="sm" color="gray.500">
                  ${item.price.toFixed(2)} each
                </Text>
              </Box>
            </HStack>

            {/* RIGHT SIDE */}
            <Box textAlign="right">
              <NumberInput.Root
                size="sm"
                min={1}
                value={item.quantity}
                width="140px"
                onValueChange={(e) =>
                  handleQuantityChange(item.cartItemId, e.value)
                }
              >
                <NumberInput.Control />
                <NumberInput.Input
                  textAlign="center"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="gray.200"
                  fontWeight="600"
                />
              </NumberInput.Root>

              <Text fontWeight="700" color="#E8501A" mt={2}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>

              <Button
                size="xs"
                mt={2}
                colorScheme="red"
                variant="ghost"
                onClick={() => removeItem(item.cartItemId)}
              >
                Remove
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* SUBTOTAL */}
      <Box mt={6} p={4} textAlign="right" borderTop="2px solid" borderColor="gray.200">
        <Text fontSize="lg" fontWeight="800">
          Subtotal: ${subtotal.toFixed(2)}
        </Text>
      </Box>
    </Box>
  );
};

export default CartItemsSection;
