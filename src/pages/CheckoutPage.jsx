import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Text,
  VStack,
  HStack,
  Separator,
} from "@chakra-ui/react";
 
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { EventCaptureContext } from '../context/eventCaptureStore'
import { useContext } from "react";
 
 
const CheckoutPage = () => {
  const location = useLocation();
  const { captureEvent } = useContext(EventCaptureContext);
   const handleEventCapture = (eventname) => {
      try {
        captureEvent(eventname);

      } catch (error) {
        console.log(error.message)
      }
    }

 
  const storedData = JSON.parse(
    sessionStorage.getItem("checkout-data")
  );
 
  const checkoutData = location.state || storedData || {};
 
  const deliveryDetails =
    checkoutData.deliveryDetails || {};
 
  const cartItems = checkoutData.cartItems || [];
 
  const subtotal = checkoutData.subtotal || 0;
  const navigate = useNavigate();
  const handlePayment = () => {
    handleEventCapture("CATERING_PAYMENT",9)
  navigate("/order-success", {
    state: {
      deliveryDetails,
      cartItems,
      subtotal,
    },
  });
};
 
 
 
  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <Container maxW="7xl">
        {/* Header */}
        <VStack align="start" gap={1} mb={10}>
          <Text
            color="orange.500"
            fontSize="sm"
            fontWeight="bold"
            letterSpacing="3px"
            textTransform="uppercase"
          >
            Sunrise Bagels • Checkout
          </Text>
 
          <Heading size="4xl" color="gray.900">
            Payment Details
          </Heading>
 
          <Text color="gray.600" fontSize="lg">
            Complete your order securely.
          </Text>
        </VStack>
 
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "2fr 1fr",
          }}
          gap={8}
          alignItems="start"
        >
          {/* Payment Form */}
          <Box
            bg="white"
            p={8}
            borderRadius="3xl"
            boxShadow="sm"
          >
            <Heading size="xl" mb={8}>
              Payment Information
            </Heading>
 
            <VStack gap={6} align="stretch">
              <Box>
                <Text mb={2} fontWeight="600">
                  Cardholder Name
                </Text>
 
                <Input
                  size="lg"
                  placeholder="John Doe"
                  borderRadius="xl"
                />
              </Box>
 
              <Box>
                <Text mb={2} fontWeight="600">
                  Card Number
                </Text>
 
                <Input
                  size="lg"
                  placeholder="1234 5678 9012 3456"
                  borderRadius="xl"
                />
              </Box>
 
              <HStack align="start" gap={4}>
                <Box flex={1}>
                  <Text mb={2} fontWeight="600">
                    Expiry Date
                  </Text>
 
                  <Input
                    size="lg"
                    placeholder="MM/YY"
                    borderRadius="xl"
                  />
                </Box>
 
                <Box flex={1}>
                  <Text mb={2} fontWeight="600">
                    CVV
                  </Text>
 
                  <Input
                    size="lg"
                    placeholder="123"
                    borderRadius="xl"
                  />
                </Box>
              </HStack>
 
              <Button
                size="lg"
                bg="orange.500"
                color="white"
                _hover={{
                  bg: "orange.600",
                }}
                mt={4}
                borderRadius="xl"
                 onClick={handlePayment}
              >
                Pay ${subtotal.toFixed(2)}
              </Button>
            </VStack>
          </Box>
 
          {/* Order Summary */}
          <Box
            bg="white"
            p={8}
            borderRadius="3xl"
            boxShadow="sm"
          >
            <Heading size="xl" mb={8}>
              Order Summary
            </Heading>
 
            {/* Customer Details */}
           
<Box
  p={5}
  borderRadius="2xl"
  bg="orange.50"
  border="1px solid"
  borderColor="orange.200"
  mb={6}
>
  <Text
    fontWeight="700"
    fontSize="xl"
    mb={4}
    color="gray.800"
  >
    Pickup Details
  </Text>
 
  <VStack align="start" gap={3}>
    <Box>
      <Text
        fontSize="xs"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Customer Name
      </Text>
 
      <Text
        fontSize="md"
        fontWeight="600"
      >
        {deliveryDetails.fullName || "-"}
      </Text>
    </Box>
 
    <Box>
      <Text
        fontSize="xs"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Phone Number
      </Text>
 
      <Text
        fontSize="md"
        fontWeight="600"
      >
        {deliveryDetails.phone || "-"}
      </Text>
    </Box>
 
    <Box>
      <Text
        fontSize="xs"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Pickup Location
      </Text>
 
      <Text
        fontSize="md"
        color="gray.700"
      >
        {deliveryDetails.pickupLocation || "-"}
      </Text>
    </Box>
 
    <Box>
      <Text
        fontSize="xs"
        color="gray.500"
        textTransform="uppercase"
        letterSpacing="1px"
      >
        Pickup Time
      </Text>
 
      <Text
        color="orange.500"
        fontWeight="700"
        fontSize="md"
      >
        {deliveryDetails.pickupTime || "-"}
      </Text>
    </Box>
  </VStack>
</Box>
            {/* Items */}
            <VStack gap={4} align="stretch">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <Flex
                    key={item.cartItemId}
                    justify="space-between"
                    align="center"
                  >
                    <Box>
                      <Text fontWeight="600">
                        {item.name}
                      </Text>
 
                      <Text
                        fontSize="sm"
                        color="gray.500"
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
                ))
              ) : (
                <Text color="gray.500">
                  No items in cart
                </Text>
              )}
 
              <Separator my={2} />
 
              <Flex justify="space-between">
                <Text
                  fontWeight="700"
                  fontSize="xl"
                >
                  Subtotal
                </Text>
 
                <Text
                  fontWeight="700"
                  fontSize="xl"
                >
                  ${subtotal.toFixed(2)}
                </Text>
              </Flex>
 
              <Flex justify="space-between">
                <Text
                  fontWeight="700"
                  fontSize="2xl"
                >
                  Total
                </Text>
 
                <Text
                  fontWeight="700"
                  fontSize="3xl"
                  color="orange.500"
                >
                  ${subtotal.toFixed(2)}
                </Text>
              </Flex>
            </VStack>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};
 
export default CheckoutPage;
