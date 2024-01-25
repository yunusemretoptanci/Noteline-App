import React from "react";
import { Button, Flex, Card, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
function Home() {
  const { t } = useTranslation();
  return (
    <div className="gap-9 justify-center items-center w-full h-[100%] flex flex-col md:flex-row">
   
      <Card asChild size={"5"}  >
        <Link to="/join">
          <Text as="div" size="4" weight="bold" color="green">
          {t('home.join')}
          </Text>
        </Link>
      </Card>

      <Card asChild size={"5"}>
        <Link to="/host">
          <Text as="div" size="4" weight="bold" color="tomato">
          {t('home.host')}
          </Text>
        </Link>
      </Card>
    </div>
  );
}

export default Home;
