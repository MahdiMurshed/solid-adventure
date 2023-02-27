import clsx from "clsx";

interface Props {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
}

const Heading = ({ variant, children, className = "" }: Props) => {
  switch (variant) {
    case "h1": {
      return (
        <h1
          className={clsx(
            "text-4xl font-semibold sm:font-2xl text-center border-b-[1px] pb-4 border-primary-blue/10",
            className
          )}
        >
          {children}
        </h1>
      );
    }
    case "h2": {
      return (
        <h2 className={clsx("text-4xl tracking-wider pb-8", className)}>
          {children}
        </h2>
      );
    }
    case "h4": {
      return (
        <h2 className="text-xl tracking-wide font-semibold border-b-[1px] pb-4 border-primary-blue/10">
          {children}
        </h2>
      );
    }
    default: {
      return <h1>{children}</h1>;
    }
  }
};

export default Heading;
