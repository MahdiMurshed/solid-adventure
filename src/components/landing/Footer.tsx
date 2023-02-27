/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import { socials } from "src/constants";
import { footerVariants } from "src/lib/motion";
import styles from "styles";
import { title } from "./About";

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`${styles.xPaddings} py-8 relative`}
  >
    <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8 `}>
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-primary-gray">
          Browse collection
        </h4>
        <button
          type="button"
          className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
        >
          <Link
            href="/materials"
            className="font-normal text-[16px] text-white"
          >
            Browse
          </Link>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <h4 className="font-extrabold text-[24px] text-primary-gray">
            {title}
          </h4>
          <p className="font-normal text-[14px] text-primary-gray opacity-50">
            Copyright © 2022 - 2023 SUST CSE. All rights reserved.
          </p>

          <div className="flex gap-4 text-primary-gray">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
