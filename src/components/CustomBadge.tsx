import { Badge } from "@mantine/core";
import { PropsWithChildren } from "react";
const COLORS = ["pink", "violet", "teal", "cyan", "indigo"] as const;

interface IProps extends PropsWithChildren {
  index: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CustomBadge = ({ index, children, size = "md" }: IProps) => {
  return (
    <Badge color={COLORS[index % 5]} variant="light" size={size}>
      {children}
    </Badge>
  );
};

export default CustomBadge;
