import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons";

const TableHelper = ({ filter, setFilter }) => {
  return <GlobalFilter filter={filter} setFilter={setFilter} />;
};

export default TableHelper;

import { useState } from "react";

export const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const onChange = (value) => {
    setFilter(value || undefined);
  };
  return (
    <TextInput
      placeholder="Search user"
      value={value || ""}
      onChange={(e) => {
        setValue(e.currentTarget.value);
        onChange(e.currentTarget.value);
      }}
      variant="filled"
      icon={<IconSearch />}
      size="md"
      radius="md"
      sx={{
        width: "100%",
        margin: "1rem 0px",
      }}
    />
  );
};
