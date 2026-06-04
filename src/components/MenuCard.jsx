import { Box, Image, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { EventCaptureContext } from '../context/eventCaptureStore'

const MenuCard = ({ item, setActiveCategory }) => {
  const { captureEvent } = useContext(EventCaptureContext)

  const handleEventCapture = (key) => {
    try {
      setActiveCategory(key);
      captureEvent("CATERING_LIST_CLICK");

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      cursor="pointer"
      h="220px"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '2xl'
      }}
      onClick={() => { handleEventCapture(item.key) }}
    >
      <Image
        src={item.image}
        alt={item.name}
        w="100%"
        h="100%"
        objectFit="cover"
        fallbackSrc="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80"
      />

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="50%"
        bgGradient="linear(to-t, blackAlpha.800, transparent)"
      />

      {item.badge && (
        <Box
          position="absolute"
          top={3}
          left={3}
          bg="#E8501A"
          borderRadius="md"
          px={3}
          py={2}
        >
          <Text fontSize="xs" fontWeight="900" color="white" lineHeight="1.2">
            NEW!
          </Text>
          <Text fontSize="xs" fontWeight="700" color="white" lineHeight="1.2">
            Hot Honey
          </Text>
          <Text fontSize="xs" fontWeight="700" color="white" lineHeight="1.2">
            Shmear
          </Text>
        </Box>
      )}

      {/* Category Name - Bottom overlay */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="#E8501A"
        py={3}
        px={4}
      >
        <Text
          fontSize="sm"
          fontWeight="900"
          color="white"
          letterSpacing="widest"
          textTransform="uppercase"
        >
          {item.name}
        </Text>
      </Box>
    </Box>
  )
}

export default MenuCard
