import { Box, Text, Button, VStack, Icon, Flex } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
  const navigate = useNavigate();

  return (
    <Flex
      minH="93vh"
      align="center"
      justify="center"
      px={6}
      bg="gray.50"
    >
      <Box
        bg="white"
        p={{ base: 8, md: 12 }}
        borderRadius="2xl"
        boxShadow="lg"
        textAlign="center"
        maxW="420px"
        w="100%"
        border="1px solid"
        borderColor="gray.100"
      >
        <VStack gap={6}>

          {/* Icon Circle */}
          <Box
            bg="#FFF4F0"
            p={6}
            borderRadius="full"
            boxShadow="sm"
          >
            <Icon as={FiShoppingCart} w={12} h={12} color="#E8501A" />
          </Box>

          {/* Title */}
          <Text fontSize="2xl" fontWeight="900" color="gray.800">
            Your cart feels empty
          </Text>

          {/* Subtitle */}
          <Text fontSize="sm" color="gray.500" lineHeight="1.6">
            Looks like you haven’t added anything yet. Explore our fresh menu and
            build your perfect order.
          </Text>

          {/* CTA Button */}
          <Button
            bg="#E8501A"
            color="white"
            size="lg"
            width="100%"
            borderRadius="xl"
            fontWeight="700"
            _hover={{
              bg: "#CB4617",
              transform: "translateY(-2px)",
              boxShadow: "md"
            }}
            transition="all 0.2s"
            onClick={() => navigate("/")}
          >
            Browse Menu
          </Button>

          {/* Secondary hint */}
          <Text fontSize="xs" color="gray.400">
            Fresh food is just one click away 🍔
          </Text>

        </VStack>
      </Box>
    </Flex>
  );
};

export default CartEmpty;
