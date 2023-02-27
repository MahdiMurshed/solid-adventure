import { Button } from "@mantine/core";
import clsx from "clsx";
import { IButton } from "src/types";

const CustomButton = ({
  handleSubmit,
  size = "md",
  radius = "sm",
  disabled = false,
  outlined = false,
  className = "",
  loading = false,
  children,

  ...rest
}: IButton) => {
  const variant = !outlined
    ? "bg-primary-blue"
    : "bg-primary-bg text-black hover:bg-transparent";
  return (
    <Button
      radius={radius}
      size={size}
      className={clsx(variant, className)}
      onClick={handleSubmit}
      disabled={disabled}
      loading={loading}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
