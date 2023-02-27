import clsx from "clsx";
import { DispatchWithoutAction, useReducer, useState } from "react";
import CustomButton from "@components/CustomButton";
import { useQueryClient } from "@tanstack/react-query";
import { MdOutlineVisibility } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "src/lib/axios";
import styles from "styles/markdown.module.css";
import MarkdownViewer from "./MarkdownEditor";

export default function LiveMarkdown({
  toggleModal,
  markdownString,
  materialId,
}: {
  toggleModal: DispatchWithoutAction;
  markdownString: string;
  materialId: string;
}) {
  const [markdownInput, setMarkdownInput] = useState(markdownString);
  const [loading, toggleLoading] = useReducer((state) => !state, false);
  const queryClient = useQueryClient();

  console.log(markdownInput);

  const handleDone = async () => {
    toggleLoading();
    try {
      const response = await axios.patch(`/materials/${materialId}/markdown`, {
        markdown: markdownInput,
        materialId,
      });
      console.log({ response });
      queryClient.invalidateQueries(["materials", materialId]);

      toast.success("Added Successfully");
    } catch (err) {
      console.log({ err });
      toast.error("Addition failed!");
    }
    toggleLoading();
    toggleModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl text-center font-bold">Markdown file</h3>
        <CustomButton
          className=" self-end"
          onClick={handleDone}
          loading={loading}
        >
          Done
        </CustomButton>
      </div>
      <div className={clsx(styles.App)}>
        <div className={styles.wrapper}>
          <h1 className={clsx("text-xl font-bold p-2 tracking-wider")}>
            Markdown
          </h1>
          <textarea
            autoFocus
            className={clsx(styles.textarea, "shadow-md rounded-lg")}
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.head}>
            <MdOutlineVisibility className="w-6" />
            <h1 className={clsx("text-xl font-bold p-2 tracking-wider")}>
              Preview
            </h1>
          </div>
          <MarkdownViewer markdownInput={markdownInput} />
        </div>
      </div>
    </div>
  );
}
