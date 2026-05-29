import { Box, Flex, Text, HStack, Icon } from '@chakra-ui/react'

const TopBar = () => {
  return (
    <Box bg="#E8501A" px={{ base: 4, md: 12, lg: 20 }} py={3}>
      <Flex justify="space-between" align="center" maxW="1400px" mx="auto">
        <HStack spacing={3}>
          <Text
            fontSize="sm"
            fontWeight="700"
            color="white"
            cursor="pointer"
            letterSpacing="wide"
            _hover={{ textDecoration: 'underline' }}
          >
            SIGN IN
          </Text>
          <Text fontSize="sm" color="white" fontWeight="400">
            /
          </Text>
          <Text
            fontSize="sm"
            fontWeight="700"
            color="white"
            cursor="pointer"
            letterSpacing="wide"
            _hover={{ textDecoration: 'underline' }}
          >
            SIGN UP
          </Text>
        </HStack>
      </Flex>
    </Box>
  )
}

export default TopBar