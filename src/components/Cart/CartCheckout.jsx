import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  NativeSelect,
  Separator,
  Badge,
} from "@chakra-ui/react";

const defaultBranch = {
  name: "Sunrise Catering",
  address: "Pickup location will be confirmed with your order.",
  phone: "",
  hours: "Open daily",
};

const CartCheckout = ({
  deliveryDetails: controlledDeliveryDetails,
  setDeliveryDetails: controlledSetDeliveryDetails,
  selectedBranch = defaultBranch,
  navigate = () => {},
  queryString = "",
  handlePayment = () => {},
}) => {
  const [localDeliveryDetails, setLocalDeliveryDetails] = useState({
    fullName: "",
    phone: "",
  });

  const deliveryDetails =
    controlledDeliveryDetails ?? localDeliveryDetails;

  const setDeliveryDetails =
    controlledSetDeliveryDetails ?? setLocalDeliveryDetails;

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="2xl"
      p={6}
      boxShadow="md"
      w="100%"
      maxW="420px"
      h="fit-content"
    >
      <VStack align="stretch" gap={5}>

        {/* TITLE */}
        <Box>
          <Text fontSize="lg" fontWeight="800" color="gray.800">
            Order Details
          </Text>
          <Text fontSize="sm" color="gray.500">
            Review your pickup and customer information
          </Text>
        </Box>

        <Separator />

        {/* FULL NAME */}
        <Box>
          <Text fontSize="sm" mb={1} fontWeight="600">
            Full Name
          </Text>
          <Input
            placeholder="Enter your name"
            value={deliveryDetails.fullName}
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                fullName: e.target.value,
              })
            }
          />
        </Box>

        {/* PHONE */}
        <Box>
          <Text fontSize="sm" mb={1} fontWeight="600">
            Phone Number
          </Text>
          <Input
            placeholder="Enter phone number"
            value={deliveryDetails.phone}
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                phone: e.target.value,
              })
            }
          />
        </Box>

        <Separator />

        {/* STORE INFO */}
        <Box
          p={4}
          bg="gray.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.100"
        >
          <Text fontWeight="700" fontSize="sm">
            {selectedBranch.name}
          </Text>

          <Text fontSize="xs" color="gray.600">
            {selectedBranch.address}
          </Text>

          {selectedBranch.phone && (
            <Text fontSize="xs" color="gray.600">
              {selectedBranch.phone}
            </Text>
          )}

          <Badge mt={2} colorScheme="green">
            {selectedBranch.hours}
          </Badge>
        </Box>

        {/* PICKUP TIME */}
        <Box>
          <Text fontSize="sm" mb={2} fontWeight="600">
            Pickup Time
          </Text>

          <NativeSelect.Root>
            <NativeSelect.Field>
            {Array.from({ length: 73 }, (_, index) => {
              const startHour = 9;
              const startMinute = 30;
              const totalMinutes =
                startHour * 60 + startMinute + index * 10;

              const hours = Math.floor(totalMinutes / 60);
              const minutes = totalMinutes % 60;
              const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
              const ampm = hours >= 12 ? "PM" : "AM";

              return (
                <option key={index}>
                  {formattedHour}:{minutes.toString().padStart(2, "0")} {ampm}
                </option>
              );
            })}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        <Separator />

        {/* ACTION BUTTONS */}
        <VStack gap={3}>
          <Button
            w="100%"
            variant="outline"
            colorScheme="gray"
            onClick={() => navigate(`/${queryString}`)}
          >
            Add more items
          </Button>

          <Button
            w="100%"
            bg="#E8501A"
            color="white"
            _hover={{ bg: "#CB4617" }}
            onClick={handlePayment}
          >
            Proceed to checkout
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default CartCheckout;
