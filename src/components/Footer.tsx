import { social } from "@/resources/once-ui.config";
import {
    Button,
    Column,
    Row,
    Text,
} from "@once-ui-system/core";

const Footer = () => {
    return (
        <Column
            fillWidth
            padding="s"
            background="neutral-weak"
            borderTop="neutral-alpha-weak"
        >
            <Row
                fillWidth
                maxWidth="xl"
                horizontal="center"
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
                <Text variant="body-default-s" onBackground="neutral-weak" size="xs">
                    © 2025 Go IAM. Open source under Apache 2.0 License.
                </Text>
                <Row gap="m">
                    <Button
                        href={social.docs}
                        variant="tertiary"
                        size="s"
                        prefixIcon="book"
                    >
                        Docs
                    </Button>
                    <Button
                        href={social.github}
                        variant="tertiary"
                        size="s"
                        prefixIcon="github"
                        target="_blank"
                    >
                        GitHub
                    </Button>
                </Row>
            </Row>
        </Column >
    );
};


export default Footer;