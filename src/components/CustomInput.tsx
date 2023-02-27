import { Text, TextInput } from "@mantine/core";

export function CustomTextInput({ label, ...others }: any) {
  return (
    <div>
      <Text component="label" htmlFor={label} size="sm" weight={500}>
        {label}
      </Text>

      <TextInput
        mt={8}
        mb={10}
        id={label}
        radius="md"
        withAsterisk
        {...others}
      />
    </div>
  );
}
