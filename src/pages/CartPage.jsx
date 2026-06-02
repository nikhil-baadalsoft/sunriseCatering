import { Flex } from "@chakra-ui/react";
import CartCheckout from "../components/Cart/CartCheckout";
import CartEmpty from "../components/Cart/CartEmpty";
import CartItemsSection from "../components/Cart/CartItemsSection";
import { useContext } from "react";
import { CartContext } from "../context/cartStore";

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <>
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={6}
          align="flex-start"
          p={6}
        >

          <Flex flex={2}  w="100%">
            <CartItemsSection />
          </Flex>

          <Flex flex={1}>
            <CartCheckout />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default CartPage;