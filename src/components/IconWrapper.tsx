import { ActionIcon, Tooltip } from "@mantine/core";

const IconWrapper = ({ label, color, children }: any) => {
  return (
    <Tooltip label={label} color={color}>
      <ActionIcon>{children}</ActionIcon>
    </Tooltip>
  );
};

export default IconWrapper;
