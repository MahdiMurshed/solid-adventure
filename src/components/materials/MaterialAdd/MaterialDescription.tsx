import Heading from "@components/Headings";
import Link from "next/link";
import { IMaterial } from "src/types";
import FileCard from "./FileCard";

interface IProps {
  material: IMaterial;
}
const MaterialDescription = ({
  material: { abstract, files, links },
}: IProps) => {
  return (
    <div className="px-6">
      <Heading variant="h4">Abstract</Heading>
      <p className="py-4 text-gray-700 leading-7">{abstract}</p>
      <Heading variant="h4">Files</Heading>
      <div>
        <div className="flex gap-6 py-6">
          {files.map((file, index) => (
            <FileCard file={file} key={index} />
          ))}
        </div>
      </div>
      <Heading variant="h4">Links</Heading>
      <div>
        <div className="flex gap-6 py-6">
          {links.map(({ label, url }, index) => (
            <ul key={index} className="list-disc px-4">
              <li className="hover:underline hover:text-primary-blue">
                <Link href={url} target="_blank">
                  {label}
                </Link>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaterialDescription;
