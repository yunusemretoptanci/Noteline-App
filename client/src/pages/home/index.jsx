import React from 'react'
import {Button, Flex, Card, Text} from '@radix-ui/themes';

function Home() {
  return (
    <Flex gap="9" justify={"center"} align="center" width={"100%"} height={"100%"} direction={{
        initial: "column",
        md: "row",
    }}>
   <Card asChild size={"5"}>
  <a href="#">
    <Text as="div" size="4" weight="bold" color='green'>
      JOIN
    </Text>
  </a>
</Card>

<Card asChild size={"5"}>
  <a href="#">
    <Text as="div" size="4" weight="bold" color='tomato'>
      HOST
    </Text>
  </a>
</Card>
    </Flex>
  )
}

export default Home