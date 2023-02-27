import { TextInput, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

interface SearchProps extends TextInputProps {
  placeholder?: string;
  searchQuery: string;
  // eslint-disable-next-line no-unused-vars
  setSearchQuery: (query: string) => void;
}

export function Search({
  placeholder = "Search",
  searchQuery,
  setSearchQuery,
  ...props
}: SearchProps) {
  return (
    <TextInput
      icon={<IconSearch size={18} stroke={1.5} />}
      value={searchQuery}
      size="md"
      radius="lg"
      onChange={(event) => setSearchQuery(event.currentTarget.value)}
      // rightSection={
      //   <ActionIcon
      //     size={32}
      //     radius="lg"
      //     color="blue"
      //     variant="filled"
      //     className="bg-primary-blue"
      //   >
      //     {theme.dir === "ltr" ? (
      //       <IconArrowRight
      //         size={18}
      //         stroke={1.5}
      //         onClick={() => setSearchQuery(searchQuery)}
      //       />
      //     ) : (
      //       <IconArrowLeft
      //         size={18}
      //         stroke={1.5}
      //         onClick={() => setSearchQuery(searchQuery)}
      //       />
      //     )}
      //   </ActionIcon>
      // }
      placeholder={placeholder}
      rightSectionWidth={42}
      {...props}
    />
  );
}
