import React from "react";
import { Button, Flex, Card, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div className="gap-9 justify-center items-center w-full h-[100%] flex flex-col md:flex-row">
   
      <Card asChild size={"5"}  >
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
    </div>
  );
}

export default Home;
