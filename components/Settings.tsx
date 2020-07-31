import React, { useState } from "react";
import { Card, Label, Text, Button, Select, Box, useColorMode, Badge } from "theme-ui";
import { readDict, postMetadataUpdate, toDict } from "../lib/metadataUtils";

export default (props) => {
  // TODO: add type safety: interfaces for style and stripeAccount
  const defaultStyle = { colorMode: "light" };
  const stripeAccount = readDict(props.metadata, "stripeAccount");
  const remoteStyle = readDict(props.metadata, "style", defaultStyle);
  const [style, setStyle] = useState(remoteStyle);
  const [colorMode, setColorMode] = useColorMode();
  if (colorMode != style.colorMode) {
    setColorMode(colorMode);
  }

  const updateStyle = async function (style) {
    try {
      const newVal = await postMetadataUpdate("style", style, props.customerId, props.username);
      setStyle(toDict(newVal));
    } catch (e) {
      console.error(e);
    }
  };

  const connectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_CONNECT_CLIENT_ID}&scope=read_write&state=${props.username}`;

  return (
    <Card
      sx={{
        p: 3,
        my: 2,
        bg: "outline",
        border: "2px solid",
        borderColor: "primary",
      }}
    >
      <Box pb={2}>
        <Label>{stripeAccount ? "Tips enabled" : "Enable tips"}</Label>
        {!stripeAccount && (
          <Text variant="small">
            To let people leave tips, connect your Stripe account.{" "}
            <Button
              variant="tinywide"
              onClick={() => {
                window.location.assign(connectUrl);
              }}
            >
              Connect Stripe
            </Button>{" "}
            <Button
              variant="tinywide"
              onClick={() => {
                console.log("TODO");
              }}
            >
              Learn more
            </Button>
          </Text>
        )}
        {stripeAccount && (
          <Text variant="small">
            Flexjar is connected to your Stripe account{" "}
            <Badge variant="tiny">{stripeAccount.name}</Badge>
          </Text>
        )}
      </Box>

      <Label>Style</Label>
      <Select
        defaultValue={style.colorMode}
        onChange={(e) => {
          const newMode = e.target.value;
          const newStyle = { colorMode: newMode };
          setStyle(newStyle);
          updateStyle(newStyle);
          setColorMode(newMode);
        }}
      >
        <option>light</option>
        <option>darkNectarine</option>
      </Select>
    </Card>
  );
};