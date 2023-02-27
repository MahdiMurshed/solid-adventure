import overrides from "@components/markdown";
import Markdown from "markdown-to-jsx";

const MarkdownViewer = ({ markdownInput }: { markdownInput: string }) => (
  <Markdown
    options={{
      overrides,
    }}
  >
    {markdownInput}
  </Markdown>
);

export default MarkdownViewer;
