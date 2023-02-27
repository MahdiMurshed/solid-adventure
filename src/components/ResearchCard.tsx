/* eslint-disable @next/next/no-img-element */
import { Badge } from "@mantine/core";
import { motion } from "framer-motion";
import Link from "next/link";
import { fadeIn } from "src/lib/motion";
import { IMaterialWithCategories } from "src/types";

interface Iprops {
  index: number;
  material: IMaterialWithCategories;
}

const ResearchCard = ({ material, index }: Iprops) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 1)}
    className="flex md:flex-row flex-col gap-4"
  >
    {/* <img
      src={imgUrl}
      alt="planet-01"
      className="md:w-[270px] w-full h-[250px] rounded-[32px] object-cover"
    /> */}
    <div className="w-full flex justify-between items-center">
      <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
        <Link
          href={`/materials/categories/${material.categories[0]?.id}`}
          className="uppercase text-primary-blue text-xs font-semibold tracking-widest
          leading-10"
        >
          <Badge
            variant="gradient"
            gradient={{ from: "teal", to: "blue", deg: 60 }}
          >
            {material.categories[0]?.name}
          </Badge>
        </Link>
        <h4 className="font-normal lg:text-[42px] text-[26px] text-primary-gray">
          {material.title}
        </h4>
      </div>

      <Link
        href={`/materials/${material.id}`}
        className="lg:flex hidden items-center justify-center w-[100px] h-[100px] rounded-full bg-transparent border-[1px] border-primary-gray"
      >
        <img
          src="/arrow.svg"
          alt="arrow"
          className="w-[40%] h-[40%] object-contain"
        />
      </Link>
    </div>
  </motion.div>
);

export default ResearchCard;
