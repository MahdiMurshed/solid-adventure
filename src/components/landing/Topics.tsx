import { TitleText, TopicCard, TypingText } from "@components/index";
import { motion } from "framer-motion";
import { useState } from "react";
import { EXPLORE_WORLDS } from "src/constants";
import { staggerContainer } from "src/lib/motion";
import styles from "styles";

const Topics = () => {
  const [active, setActive] = useState("world-2");

  return (
    <section id="Topics" className={`${styles.paddings}`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Topics" textStyles="text-center" />
        <TitleText title={<>Browse by topics</>} textStyles="text-center" />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {EXPLORE_WORLDS.map((world, index) => (
            <TopicCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Topics;
