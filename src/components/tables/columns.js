import IconWrapper from "@components/IconWrapper";
import { ConfirmDeleteModal, EditModal } from "@components/Modal";
import UserName from "@components/UserName";
import { useUserActions } from "@hooks/userActions";
import { Anchor, Badge, Group } from "@mantine/core";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";
import { memo, useReducer } from "react";
import { timeAgo } from "src/lib/helpers";
const Colors = {
  teacher: "blue",
  student: "cyan",
  admin: "pink",
  reg: "teal",
};
export const STUDENT_COLUMNS = [
  {
    Header: "Name",

    accessor: "name",
    disableFilters: true,
    Cell: ({
      row: {
        original: { name, image },
      },
    }) => <UserName name={name} image={image} />,
  },

  {
    Header: "Email",

    accessor: "email",
    disableFilters: true,
    Cell: ({
      row: {
        original: { email },
      },
    }) => <Anchor>{email}</Anchor>,
  },
  {
    Header: "Registration No",

    accessor: "reg",
    Cell: ({
      row: {
        original: { reg },
      },
    }) => (
      <Badge color={Colors[reg]} variant="outline" size="lg">
        {reg}
      </Badge>
    ),
  },
  {
    Header: "Role",

    accessor: "role",
    Cell: ({
      row: {
        original: { role },
      },
    }) => (
      <Badge color={Colors[role]} variant="gradient">
        {role}
      </Badge>
    ),
  },
  {
    Header: "Joined",

    accessor: "createdAt",
    Cell: ({
      row: {
        original: { createdAt },
      },
    }) => (
      <Badge color={Colors["admin"]} variant="dot" size="lg">
        {timeAgo(createdAt)}
      </Badge>
    ),
  },

  {
    Header: "Action",

    Cell: ({ row }) => <MemoizedAction user={row.original} />,
  },
];

export const TEACHER_COLUMNS = [
  {
    Header: "Name",

    accessor: "name",
    disableFilters: true,
    Cell: ({
      row: {
        original: { name, image },
      },
    }) => <UserName name={name} image={image} />,
  },

  {
    Header: "Email",

    accessor: "email",
    disableFilters: true,
    Cell: ({
      row: {
        original: { email },
      },
    }) => <Anchor>{email}</Anchor>,
  },
  {
    Header: "Role",

    accessor: "role",
    Cell: ({
      row: {
        original: { role },
      },
    }) => (
      <Badge color={Colors[role]} variant="gradient">
        {role}
      </Badge>
    ),
  },

  {
    Header: "Joined",

    accessor: "createdAt",
    Cell: ({
      row: {
        original: { createdAt },
      },
    }) => (
      <Badge color={Colors["admin"]} variant="dot" size="lg">
        {timeAgo(createdAt)}
      </Badge>
    ),
  },
  {
    Header: "Action",

    Cell: ({ row }) => <MemoizedAction user={row.original} />,
  },
];

const Action = ({ user }) => {
  const [editModalOpened, toggleEditModalOpened] = useReducer(
    (state) => !state,
    false
  );
  const router = useRouter();
  const {
    handleUserAccept,
    handleUserDelete,
    isLoading,
    opened,
    toggleOpened,
  } = useUserActions({
    userIds: [user.id],
  });

  const isOnRequestsPage = router.pathname.includes("requests");

  // console.log(user);

  return (
    <>
      <Group spacing={0}>
        {isOnRequestsPage ? (
          <>
            <IconWrapper label="Accept" color="#51cf66">
              <IconCheck
                size={16}
                stroke={1.5}
                style={{
                  cursor: isLoading ? "not-allowed" : "pointer",
                  color: "#69db7c",
                }}
                onClick={isLoading ? null : handleUserAccept}
              />
            </IconWrapper>
            <IconWrapper label="Delete" color="red">
              <IconTrash
                size={16}
                stroke={1.5}
                style={{
                  cursor: "pointer",
                  color: "#ffa8a8",
                }}
                onClick={toggleOpened}
              />
            </IconWrapper>
          </>
        ) : (
          <>
            <IconWrapper label="Edit" color="yellow">
              <IconPencil
                size={16}
                stroke={1.5}
                style={{
                  cursor: "pointer",
                }}
                onClick={toggleEditModalOpened}
              />
            </IconWrapper>
            <IconWrapper label="Delete" color="red">
              <IconTrash
                size={16}
                stroke={1.5}
                style={{
                  cursor: "pointer",
                  color: "#ffa8a8",
                }}
                onClick={toggleOpened}
              />
            </IconWrapper>
          </>
        )}
      </Group>
      <EditModal
        title="Edit User"
        description="Edit the user details"
        opened={editModalOpened}
        handleCancel={toggleEditModalOpened}
        user={user}
      />
      <ConfirmDeleteModal
        title="Reject request"
        description="Are you sure you want to reject the user. This task is irreversible."
        opened={opened}
        handleCancel={toggleOpened}
        handleConfirm={handleUserDelete}
      />
    </>
  );
};

const MemoizedAction = memo(Action);
