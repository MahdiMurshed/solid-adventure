import { TypingText } from "@components/index";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "src/lib/motion";
import styles from "styles";

export const title = "RESEARCH ARCHIVE";

const About = () => (
  <section id="About" className={`${styles.paddings} relative z-10`}>
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title={`| ABOUT THIS ARCHIVE`} textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-secondary-white"
      >
        Welcome to{" "}
        <span className="font-extrabold text-primary-gray">{title}!</span> This
        research archive is a resource for students, faculty, and the broader
        community to access and explore the research conducted by our
        department. We strive to make our research widely available and easy to
        access, so that it can be used to further scientific understanding and
        drive innovation.
        <p>
          The research in this archive covers a wide range of topics, including{" "}
          <span className="font-extrabold text-primary-gray">
            artificial intelligence, data science, software engineering,
            computer systems, and more
          </span>{" "}
          . We are constantly updating the archive with new research as it
          becomes available, so be sure to check back often to stay up-to-date
          on the latest developments in our department.
        </p>
        <p>
          We hope you find this research archive to be a valuable resource and
          we welcome your feedback and suggestions for improving it. If you have
          any questions or would like more information about our department or
          our research, please{" "}
          <span className="font-extrabold text-primary-gray">
            {"don't"} hesitate to contact us
          </span>
          .
        </p>
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About;
