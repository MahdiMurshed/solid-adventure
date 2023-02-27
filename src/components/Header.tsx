import Head from "next/head";

const Header = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/sust.png" />
    </Head>
  );
};

export default Header;
