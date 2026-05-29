import { Box, Flex, Text, Button, Image, Badge } from '@chakra-ui/react'
const FoodCard = ({ item,captureEvent}) => {
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

        <Button
          bg="#E8501A"
          color="white"
          w="100%"
          borderRadius="xl"
          py={5}
          fontSize="sm"
          fontWeight="700"
          _hover={{ bg: '#CB4617', transform: 'translateY(-1px)' }}
          transition="all 0.2s"
          onClick={() => {captureEvent("Select Order ")}}
        >
          Select Order 
        </Button>
      </Box>
    </Box>
  )
}

export default FoodCard;
