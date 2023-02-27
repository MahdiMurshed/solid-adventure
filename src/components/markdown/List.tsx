export const ListItem = ({ children }: any) => (
  <li className="ml-2 list-disc ">{children}</li>
);

export const UnorderedList = ({ children }: any) => (
  <ul className="list-disc list-inside">{children}</ul>
);

export const OrderedList = ({ children }: any) => (
  <ol className="list-decimal list-inside">{children}</ol>
);
