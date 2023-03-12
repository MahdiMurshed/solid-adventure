import IconWrapper from "@components/IconWrapper";
import { ConfirmDeleteModal, CustomModal } from "@components/Modal";
import useCurrentUser from "@hooks/useCurrentUser";
import { useInvalidate } from "@hooks/useInvalidate";
import { Group } from "@mantine/core";
import { Notice } from "@prisma/client";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useCallback, useReducer } from "react";
import { toast } from "react-toastify";
import { ROLES } from "src/constants";
import axios from "src/lib/axios";
import { timeFormatter } from "src/lib/helpers";
import NoticeForm from "./NoticeForm";

interface INotice {
  notice: Notice;
}

const NoticeCard = ({ notice }: INotice) => {
  const [editModal, setEditModal] = useReducer((s) => !s, false);
  const [deleteModal, setDeleteModal] = useReducer((s) => !s, false);
  const invalidate = useInvalidate();
  const [loading, toggleLoading] = useReducer((s) => !s, false);
  const { user } = useCurrentUser();

  const handleNoticeDelete = useCallback(async () => {
    if (loading) return;
    toggleLoading();
    try {
      const url = `/notice?id=${notice.id}`;
      await axios.delete(url);
      toast.success("Notice deleted Successfully");
      invalidate(["notices"]);
    } catch (err) {
      console.log({ err });
    }
    toggleLoading();
    setEditModal();
  }, [invalidate, loading, notice.id]);

  const hasAdminAccess =
    user?.role === ROLES.ADMIN || user.id === notice.postedBy;

  return (
    <div className="shadow-md p-6 rounded-md hover:scale-105 transition-all duration-300">
      <div className="flex flex-col gap-2">
        <Group position="apart">
          <h1 className="text-2xl font-semibold">{notice.title}</h1>
          {hasAdminAccess && (
            <div className="flex">
              <IconWrapper label="Edit" color="yellow">
                <IconPencil size={16} stroke={1.5} onClick={setEditModal} />
              </IconWrapper>
              <IconWrapper label="Delete" color="red">
                <IconTrash
                  size={16}
                  stroke={1.5}
                  color="red"
                  onClick={setDeleteModal}
                />
              </IconWrapper>
            </div>
          )}
        </Group>
        <Group position="apart">
          <p className="text-xs text-slate-600">
            {timeFormatter(notice.createdAt as unknown as string)}
          </p>
          {notice.updatedAt !== notice.createdAt && (
            <p className="text-xs text-slate-600">
              <span>Last updated: </span>{" "}
              {timeFormatter(notice.updatedAt as unknown as string)}
            </p>
          )}
        </Group>
        <p className="text-sm text-slate-800">{notice.body}</p>
      </div>
      <CustomModal
        opened={editModal}
        handleCancel={setEditModal}
        title="Edit post"
        fullScreen
      >
        <NoticeForm
          title={notice.title}
          body={notice.body}
          id={notice.id}
          handleCancel={setEditModal}
        />
      </CustomModal>
      <ConfirmDeleteModal
        title="Delete Notice"
        description="Are you sure you want to delete this notice? This task is irreversible."
        opened={deleteModal}
        handleCancel={setDeleteModal}
        handleConfirm={handleNoticeDelete}
      />
    </div>
  );
};

export default NoticeCard;
