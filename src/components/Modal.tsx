import { Group, Modal, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { IUser } from "src/types";
import CustomButton from "./CustomButton";
import EditForm from "./forms/EditForm";
import SingleMaterial from "./materials/SingleMaterial";

interface IConfirmModal {
  title: string;
  description: string;
  opened: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
}
interface IEditModal extends IConfirmModal {
  user: IUser;
}

export const ButtonGroup = ({
  handleConfirm,
  confirmLabel,
  handleCancel,
}: any) => (
  <Group>
    <CustomButton handleSubmit={handleConfirm} size="sm">
      {confirmLabel}
    </CustomButton>
    <CustomButton onClick={handleCancel} size="sm" outlined>
      Cancel
    </CustomButton>
  </Group>
);

function CustomModal({
  opened,
  handleCancel,
  children,
  fullScreen = false,
  title,
}: {
  opened: boolean;
  handleCancel: any;
  children: React.ReactNode;
  fullScreen?: boolean;

  title: string;
}) {
  const theme = useMantineTheme();
  return (
    <>
      <Modal
        overlayColor={theme.colors.gray[1]}
        overlayOpacity={0.2}
        overlayBlur={2}
        centered
        opened={opened}
        onClose={handleCancel}
        title={title}
        fullScreen={fullScreen}
      >
        {children}
      </Modal>
    </>
  );
}

function ConfirmDeleteModal({
  title,
  description,
  opened,
  handleCancel,
  handleConfirm,
}: IConfirmModal) {
  return (
    <CustomModal opened={opened} handleCancel={handleCancel} title={title}>
      <Text size="xl" mb="lg">
        {title}
      </Text>
      <Text color="dimmed" mb="lg">
        {description}
      </Text>
      <ButtonGroup
        handleConfirm={handleConfirm}
        confirmLabel="Delete"
        handleCancel={handleCancel}
      />
    </CustomModal>
  );
}

function EditModal({
  title,
  opened,
  handleCancel,

  user,
}: IEditModal) {
  return (
    <CustomModal opened={opened} handleCancel={handleCancel} title={title}>
      <EditForm {...user} handleCancel={handleCancel} />
    </CustomModal>
  );
}

function MaterialShowModal({ title, opened, materialId, handleCancel }: any) {
  return (
    <CustomModal
      opened={opened}
      handleCancel={handleCancel}
      title={title}
      fullScreen
    >
      <SingleMaterial
        materialId={materialId}
        isOnPreview
        handleCancelPreview={handleCancel}
      />
    </CustomModal>
  );
}

export { CustomModal, ConfirmDeleteModal, EditModal, MaterialShowModal };
