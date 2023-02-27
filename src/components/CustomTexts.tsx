import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "src/lib/motion";

type TText = {
  title: any;
  textStyles: any;
};

export const TypingText = ({
  title,
  textStyles,
}: {
  title: string;
  textStyles: any;
}) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }: TText) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-primary-gray ${textStyles}`}
  >
    {title}
  </motion.h2>
);
