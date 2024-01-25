import React from "react";
import { Button, Flex, Card, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
function Home() {
  return (
    <Flex
      gap="9"
      justify={"center"}
      align="center"
      width={"100%"}
      height={"100%"}
      direction={{
        initial: "column",
        md: "row",
      }}
    >
      <Card asChild size={"5"}>
        <Link to="/join">
          <Text as="div" size="4" weight="bold" color="green">
            JOIN
          </Text>
        </Link>
      </Card>

      <Card asChild size={"5"}>
        <Link to="/host">
          <Text as="div" size="4" weight="bold" color="tomato">
            HOST
          </Text>
        </Link>
      </Card>
    </Flex>
  );
}

export default Home;
