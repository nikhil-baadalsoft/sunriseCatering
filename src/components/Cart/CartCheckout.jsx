import { useState, useContext } from "react";
import { EventCaptureContext } from '../../context/EventCaptureContex'
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  NativeSelect,
  Separator,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cartStore";
 
const CartCheckout = ({
  deliveryDetails: controlledDeliveryDetails,
  setDeliveryDetails: controlledSetDeliveryDetails,
  queryString = "",
}) => {
  const [localDeliveryDetails, setLocalDeliveryDetails] = useState({
    fullName: "",
    phone: "",
    pickupLocation: "",
    pickupTime: "",
  });
 
  const deliveryDetails =
    controlledDeliveryDetails ?? localDeliveryDetails;
 
  const setDeliveryDetails =
    controlledSetDeliveryDetails ?? setLocalDeliveryDetails;
 
  const { cartItems } = useContext(CartContext);
 
  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 1),
    0
  );
 
  const navigate = useNavigate();
  const { captureEvent } = useContext(EventCaptureContext)
 const handleEventCapture = (eventname,eventSequence) => {
      try {
        captureEvent(eventname, eventSequence);

      } catch (error) {
        console.log(error.message)
      }
    }
  const handleCheckout = () => {
    const checkoutData = {
      deliveryDetails,
      cartItems,
      subtotal,
    };
 
    sessionStorage.setItem(
      "checkout-data",
      JSON.stringify(checkoutData)
    );
    handleEventCapture("CATEGORY_PROCEED_TO_CHECKOUT", 8)
    navigate("/checkout", {
      state: checkoutData,
    });
  };
 
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
          <Text
            fontSize="lg"
            fontWeight="800"
            color="gray.800"
          >
            Order Details
          </Text>
 
          <Text
            fontSize="sm"
            color="gray.500"
          >
            Review your pickup and customer
            information
          </Text>
        </Box>
 
        <Separator />
 
        {/* FULL NAME */}
        <Box>
          <Text
            fontSize="sm"
            mb={1}
            fontWeight="600"
          >
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
          <Text
            fontSize="sm"
            mb={1}
            fontWeight="600"
          >
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
 
        {/* PICKUP LOCATION */}
        <Box>
          <Text
            fontSize="sm"
            mb={1}
            fontWeight="600"
          >
            Pickup Location
          </Text>
 
          <Input
            placeholder="Enter pickup location"
            value={
              deliveryDetails.pickupLocation
            }
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                pickupLocation:
                  e.target.value,
              })
            }
          />
        </Box>
 
        {/* PICKUP TIME */}
        <Box>
          <Text
            fontSize="sm"
            mb={2}
            fontWeight="600"
          >
            Pickup Time
          </Text>
 
          <NativeSelect.Root>
            <NativeSelect.Field
              value={deliveryDetails.pickupTime}
              onChange={(e) =>
                setDeliveryDetails({
                  ...deliveryDetails,
                  pickupTime:
                    e.target.value,
                })
              }
            >
              <option value="">
                Select pickup time
              </option>
 
              {Array.from(
                { length: 73 },
                (_, index) => {
                  const startHour = 9;
                  const startMinute = 30;
 
                  const totalMinutes =
                    startHour * 60 +
                    startMinute +
                    index * 10;
 
                  const hours =
                    Math.floor(
                      totalMinutes / 60
                    );
 
                  const minutes =
                    totalMinutes % 60;
 
                  const formattedHour =
                    hours % 12 === 0
                      ? 12
                      : hours % 12;
 
                  const ampm =
                    hours >= 12
                      ? "PM"
                      : "AM";
 
                  const timeLabel = `${formattedHour}:${minutes
                    .toString()
                    .padStart(
                      2,
                      "0"
                    )} ${ampm}`;
 
                  return (
                    <option
                      key={index}
                      value={timeLabel}
                    >
                      {timeLabel}
                    </option>
                  );
                }
              )}
            </NativeSelect.Field>
 
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
 
        <Separator />
 
        {/* ORDER PREVIEW */}
        <Box>
          <Text
            fontWeight="700"
            mb={3}
            fontSize="md"
          >
            Cart Summary
          </Text>
 
          <VStack
            align="stretch"
            gap={2}
          >
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Box
                  key={
                    item.cartItemId
                  }
                  display="flex"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize="sm"
                  >
                    {item.name} ×{" "}
                    {item.quantity}
                  </Text>
 
                  <Text
                    fontSize="sm"
                    fontWeight="600"
                  >
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </Text>
                </Box>
              ))
            ) : (
              <Text
                color="gray.500"
                fontSize="sm"
              >
                No items in cart
              </Text>
            )}
 
            <Separator mt={2} />
 
            <Box
              display="flex"
              justifyContent="space-between"
            >
              <Text
                fontWeight="700"
              >
                Subtotal
              </Text>
 
              <Text
                fontWeight="700"
                color="#E8501A"
              >
                $
                {subtotal.toFixed(2)}
              </Text>
            </Box>
          </VStack>
        </Box>
 
        <Separator />
 
        {/* ACTION BUTTONS */}
        <VStack gap={3}>
          <Button
            w="100%"
            variant="outline"
            colorScheme="gray"
            onClick={() =>{
              handleEventCapture("CATEGORY_ADD_MORE_ITEMS",7)
              navigate(`/${queryString}`)}
            }
          >
            Add more items
          </Button>
 
          <Button
            w="100%"
            bg="#E8501A"
            color="white"
            _hover={{
              bg: "#CB4617",
            }}
            onClick={handleCheckout}
          >
            Proceed to Checkout • $
            {subtotal.toFixed(2)}
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};
 
export default CartCheckout; 