import { ResearchCard, TitleText, TypingText } from "@components/index";
import { useTopMaterials } from "@hooks/materials";
import { Loader } from "@mantine/core";
import { motion } from "framer-motion";
import { staggerContainer } from "src/lib/motion";
import styles from "styles";

const TopResearch = () => {
  const { isLoading, materials } = useTopMaterials();
  if (isLoading) {
    return (
      <div className="flex justify-center ">
        <Loader variant="bars" />
      </div>
    );
  }

  console.log({ materials });
  return (
    <section id="Top research" className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Top Research" textStyles="text-center" />
        <TitleText title={<>Top Research</>} textStyles="text-center" />
        <div className="mt-[50px] flex flex-col gap-[30px]">
          {materials.map((item, index: number) => (
            <ResearchCard
              key={`insight-${index}`}
              material={item}
              index={index + 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TopResearch;
