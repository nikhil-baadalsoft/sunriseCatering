import { useState } from 'react'
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import FoodCard from '../components/FoodCard'
import MenuCard from '../components/MenuCard'
import Sidebar from '../components/Sidebar'
import { alldaybreakfast } from "../components/data/Alldaybreakfast"
import { Bagelandshamear } from "../components/data/BagelsandShmear"
import { beverages } from "../components/data/beverages"
import { IndividualMeal } from "../components/data/IndividualMeals"
import { LunchClassics } from "../components/data/LunchClassics"
import { SidesandSweets } from "../components/data/SidesandSweets"
import { menuItems as allMenuItems } from '../components/menuItems'


const CateringPage = () => {
    const [activeCategory, setActiveCategory] = useState('all')

    const getData = () => {
        switch (activeCategory) {
            case 'breakfast':
                return alldaybreakfast
            case 'bagels':
                return Bagelandshamear
            case 'beverages':
                return beverages
            case 'individual':
                return IndividualMeal
            case 'lunch':
                return LunchClassics
            case 'sweets':
                return SidesandSweets
            case 'all':
            default:
                return allMenuItems
        }
    }

    const menuItems = getData()

    return (
        <Flex minH="100vh" direction={{ base: 'column', md: 'row' }} bg="white">
            <Sidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <Box flex={1} px={{ base: 6, md: 10 }} py={8}>
                <Text
                    fontSize="lg"
                    fontWeight="900"
                    color="#1A1A1A"
                    letterSpacing="widest"
                    textTransform="uppercase"
                    mb={8}
                    borderBottom="2px solid"
                    borderColor="gray.100"
                    pb={4}
                >
                    {activeCategory === 'all' ? 'All Catering Menu Categories' : 'Catering Menu Items'}
                </Text>

                <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={6}>
                {activeCategory === 'all' ? (
                    allMenuItems.map((item, index) => (
                        <MenuCard key={`${item.key}-${item.id}-${index}`} item={item} setActiveCategory={setActiveCategory}/>
                    ))
                ) : (
                    menuItems.map((item, index) => (
                        <FoodCard key={`${activeCategory}-${item.id}-${index}`} item={item}  />
                    ))
                )}
                </SimpleGrid>
            </Box>
        </Flex >
    )
}

export default CateringPage
