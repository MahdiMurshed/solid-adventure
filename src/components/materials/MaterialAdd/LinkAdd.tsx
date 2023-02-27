import { useLinks } from "@hooks/store";
import { memo } from "react";
import Links from "./Links";

export type LinkState =
  | {
      index: number;
      value: string;
      type: "label";
    }
  | {
      index: number;
      value: string;
      type: "url";
    };
const LinkAdd = () => {
  const [links, setLinks] = useLinks();
  return <Links setLinks={setLinks} links={links} readOnly={false} />;
};

export default memo(LinkAdd);
