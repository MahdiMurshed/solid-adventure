/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { navVariants } from "src/lib/motion";
import styles from "styles";

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    {/* <div className="absolute w-[50%] inset-0 gradient-01" /> */}
    <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
      <img
        src="/search.svg"
        alt="search"
        className="w-[24px] h-[24px] object-contain opacity-0"
      />
      <h2 className="font-extrabold text-[24px] leading-[30.24px] text-primary-gray">
        WELCOME TO
      </h2>
      <img
        src="/menu.svg"
        alt="menu"
        className="w-[24px] h-[24px] object-contain opacity-0"
      />
    </div>
  </motion.nav>
);

export default Navbar;
