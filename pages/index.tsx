import { Header } from "@components/index";
import Home from "@components/landing";
import { title } from "@components/landing/About";

export default function HomePage() {
  return (
    <>
      <Header title={title} />
      <Home />;
    </>
  );
}
