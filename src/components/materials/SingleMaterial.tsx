import CustomBadge from "@components/CustomBadge";
import CustomLoader from "@components/CustomLoader";
import UserName from "@components/UserName";
import Tab from "@components/materials/MaterialAdd/Tab";
import { useMaterial } from "@hooks/material";
import { Mark, Tooltip } from "@mantine/core";
import { User } from "@prisma/client";
import Link from "next/link";
import { MdCancel } from "react-icons/md";
import { dateFormatter } from "src/lib/helpers";

const SingleMaterial = ({
  materialId,
  isOnPreview,
  handleCancelPreview,
}: {
  materialId: string;
  isOnPreview?: boolean;
  handleCancelPreview?: () => void;
}) => {
  const { material, isLoading } = useMaterial({ materialId });

  console.log({ material });

  if (isLoading) return <CustomLoader />;
  const {
    title,
    authors,
    supervisors,
    categories,
    tags,
    dateStarted,
    dateFinished,
  } = material;
  const categoryName = categories[0]?.name;
  return (
    <div className="px-10 py-10 md:w-2/3 mx-auto ">
      <div className="flex justify-between items-center">
        <Tooltip label="category" position="right-end" color="blue">
          <Link
            href={`/materials/categories/${categories[0]?.id ?? ""}`}
            className="uppercase  text-xs font-semibold tracking-widest
          leading-10"
          >
            <Mark color="blue" className="px-2 py-1">
              {categoryName}
            </Mark>
          </Link>
        </Tooltip>
        {isOnPreview && (
          <MdCancel
            className="w-6 h-6 cursor-pointer text-red-400"
            onClick={handleCancelPreview}
          />
        )}
      </div>
      <h1 className="text-4xl pb-4">{title}</h1>
      {dateStarted && (
        <span className="text-gray-600 text-sm pb-4 flex gap-2">
          <span>{dateFormatter(dateStarted) + " "}</span>
          {dateFinished && (
            <span>
              {" "}
              <span className="text-primary-blue font-semibold">
                {"   "}-{" "}
              </span>{" "}
              {dateFormatter(dateFinished)}
            </span>
          )}
        </span>
      )}

      <div className="flex gap-6 text-gray-700 text-sm py-2">
        {[...supervisors, ...authors].map((author: User) => (
          <Link
            key={author.id}
            href={`/users/${author.id}`}
            className="hover:underline"
          >
            <UserName
              image={author.image as string}
              name={author.name as string}
            />
          </Link>
        ))}
      </div>
      <div className="py-2 flex gap-2">
        {tags.map((tag, index) => (
          <CustomBadge index={index} key={tag.id}>
            {tag.name}
          </CustomBadge>
        ))}
      </div>

      <div className="pt-6">
        <Tab material={material} />
      </div>
    </div>
  );
};

export default SingleMaterial;
