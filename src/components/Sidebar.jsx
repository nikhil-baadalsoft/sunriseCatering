import { Box, Text, VStack, Separator } from '@chakra-ui/react'
import { menuItems } from './menuItems'
import { useContext } from 'react'
import { EventCaptureContext } from '../context/eventCaptureStore'

const Sidebar = ({ activeCategory, setActiveCategory }) => {
  const { captureEvent } = useContext(EventCaptureContext)
  const handleEventCapture = (key,eventname) => {
    try {
      setActiveCategory(key);
      captureEvent(eventname);
      

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <Box
      w={{ base: '100%', md: '260px' }}
      minW={{ md: '260px' }}
      bg="#F5EFE0"
      py={8}
      px={6}
      borderRight="1px solid"
      borderColor="gray.200"
      minH="100vh"
    >
      <VStack align="stretch" gap={0}>

        {/* Home */}
        <Text
          fontSize="sm"
          color="gray.600"
          cursor="pointer"
          py={3}
          px={2}
          _hover={{ color: '#1A1A1A', fontWeight: '600' }}
          transition="all 0.2s"
        >
          Home
        </Text>

        <Separator borderColor="gray.300" />

        <Text
          fontSize="sm"
          fontWeight="800"
          color="#1A1A1A"
          cursor="pointer"
          py={2}
          px={2}
          borderLeft={activeCategory === 'all' ? '3px solid #E8501A' : '3px solid transparent'}
          bg={activeCategory === 'all' ? 'white' : 'transparent'}
          _hover={{ bg: 'white', borderLeft: '3px solid #E8501A' }}
          transition="all 0.2s"
          onClick={() => handleEventCapture('all',"ALL_CATERINGLIST_CLICK",4)}
        >
          All Categories
        </Text>
        {menuItems.map((item) => (
          <Text
            key={item.id}
            fontSize="sm"
            color={activeCategory === item.key ? '#1A1A1A' : 'gray.700'}
            fontWeight={activeCategory === item.key ? '700' : '400'}
            cursor="pointer"
            py={2}
            px={2}
            borderLeft={activeCategory === item.key ? '3px solid #E8501A' : '3px solid transparent'}
            bg={activeCategory === item.key ? 'white' : 'transparent'}
            _hover={{ bg: 'white', borderLeft: '3px solid #E8501A', color: '#1A1A1A' }}
            transition="all 0.2s"
            onClick={() => handleEventCapture(item.key,"SIDEBAR_CATERING_CLICK",3)}
          >
            {item.name}
          </Text>
        ))}

        <Separator borderColor="gray.300" my={2} />

        <Text
          fontSize="sm"
          color="gray.700"
          cursor="pointer"
          py={2}
          px={2}
          _hover={{ color: '#1A1A1A', fontWeight: '600' }}
          transition="all 0.2s"
        >
          Place New Order
        </Text>

        <Separator borderColor="gray.300" />

        <Text
          fontSize="sm"
          color="gray.700"
          cursor="pointer"
          py={2}
          px={2}
          _hover={{ color: '#1A1A1A', fontWeight: '600' }}
          transition="all 0.2s"
        >
          My Catering Account
        </Text>
        <Separator borderColor="gray.300" />
      </VStack>
    </Box>
  )
}

export default Sidebar
