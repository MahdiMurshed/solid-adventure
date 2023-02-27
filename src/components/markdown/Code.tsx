import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface ICode {
  children: string;
  className?: string;
}

const Code = ({ children, className }: ICode) => {
  const language = className?.replace("lang-", "") ?? "";

  return (
    <SyntaxHighlighter style={dracula} language={language}>
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
