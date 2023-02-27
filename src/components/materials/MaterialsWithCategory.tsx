import { useMaterialOfSpecificCategory } from "@hooks/materialOfSpecificCategory";
import { Carousel } from "@mantine/carousel";
import { Loader } from "@mantine/core";
import { Category } from "@prisma/client";
import { IconClick } from "@tabler/icons";
import Link from "next/link";
import MaterialCard from "./MaterialCard";

interface IMaterialsWithCategory {
  category: Category;
}

const MaterialsWithCategory = ({
  category: { name, id },
}: IMaterialsWithCategory) => {
  const { materials, isLoading } = useMaterialOfSpecificCategory({
    categoryId: id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center h-screen items-center">
        <Loader size="xs" variant="dots" />
      </div>
    );
  if (materials.length === 0) return null;

  return (
    <div className="pb-6 ">
      <div className="flex justify-between items-center border-b-[1px] border-primary-blue/20 pb-2  mb-4 px-2 md:flex-wrap">
        <h1 className="text-2xl  font-semibold">{name}</h1>
        <Link
          href={`/materials/categories/${id}`}
          className="text-primary-blue/90 flex gap-2 items-center"
        >
          <span>browse all</span>
          <IconClick />
        </Link>
      </div>
      <Carousel
        withIndicators
        height={200}
        slideSize="25%"
        slideGap="md"
        breakpoints={[
          { maxWidth: "md", slideSize: "50%" },
          { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
        ]}
        align="start"
      >
        {materials.map((material) => (
          <Carousel.Slide key={material.id}>
            <MaterialCard materialId={material.id} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
};

export default MaterialsWithCategory;
