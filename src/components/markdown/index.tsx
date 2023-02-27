import Code from "./Code";
import { MyH1, MyH2, MyH3, MyH4, MyH5, MyH6 } from "./Headings";
import { OrderedList, UnorderedList } from "./List";
import { Table } from "./Table";

const overrides = {
  h1: MyH1,
  h2: MyH2,
  h3: MyH3,
  h4: MyH4,
  h5: MyH5,
  h6: MyH6,
  code: Code,
  ul: UnorderedList,
  ol: OrderedList,
  table: Table,
};

export default overrides;
