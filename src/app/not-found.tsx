import { Column, GlitchFx, Heading, Media, Row, Text } from "@once-ui-system/core";

export default function NotFound() {
  return (
    <Column as="section" fillHeight center style={{ height: "100vh" }}>
      <Text marginBottom="s" variant="display-strong-xl">
        404
      </Text>
      <Heading marginBottom="l" variant="display-default-xs">
        Page Not Found
      </Heading>
      <Row>
        <GlitchFx fillWidth speed="medium">
          <Row maxWidth={18} height={18}>
            <Media
              radius="l"
              src="/images/not-found.png"
            />
          </Row>
        </GlitchFx>
      </Row>
      <Row marginTop="m">
        <Text onBackground="neutral-weak">The page you are looking for does not exist.</Text>
      </Row>
    </Column>
  );
}