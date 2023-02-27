/* eslint-disable react/jsx-key */
import CustomLoader from "@components/CustomLoader";
import { ConfirmDeleteModal, CustomModal } from "@components/Modal";
import AddCategoryForm from "@components/admin/fields/AddCategoryForm";
import AddTagForm from "@components/admin/fields/AddTagForm";
import useTopMaterialActions from "@hooks/admin/useTopMaterialActions";
import useCurrentUser from "@hooks/useCurrentUser";
import usePathNameAttributes from "@hooks/usePathName";
import { useUserActions } from "@hooks/userActions";
import { Button, Group, Menu } from "@mantine/core";
import {
  IconArrowAutofitDown,
  IconArrowAutofitUp,
  IconCheck,
  IconPlus,
  IconTrash,
} from "@tabler/icons";
import { useReducer } from "react";
import {
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import { ROLES } from "src/constants";
import { findColumn, isAdmin } from "src/lib/helpers";
import { Checkbox } from "./Checkbox";
import TableHelper from "./TableHelper";

const UserTable = ({ users: data, role = ROLES.TEACHER }) => {
  const { user, isLoading } = useCurrentUser();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state,
    allColumns,
    setGlobalFilter,
  } = useTable(
    {
      columns: findColumn(role),
      data,
      // defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <Checkbox {...getToggleAllRowsSelectedProps()} />
          ),
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ]);
    }
  );
  const { globalFilter } = state;
  console.log({ selectedFlatRows });

  const { isOnSpecificPage: isOnCategories } =
    usePathNameAttributes("/admin/categories");
  const { isOnSpecificPage: isOnTags } = usePathNameAttributes("admin/tags");

  const shoWActionButton = isOnCategories || isOnTags;

  if (isLoading) return <CustomLoader />;

  return (
    <div
      style={{
        width: "80%",
        margin: "20px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "80%",
          marginLeft: "2rem",
          marginRight: "2rem",
          alignItems: "center",
          gap: 6,
        }}
      >
        <TableHelper
          filter={globalFilter}
          setFilter={setGlobalFilter}
          columns={allColumns}
        />
        {isAdmin(user?.role || "") && (
          <>
            <MenuButton
              selectedRows={selectedFlatRows.map((row) => row.original.id)}
            />
            {shoWActionButton && (
              <AddButton type={isOnCategories ? "category" : "tag"} />
            )}
          </>
        )}
      </div>
      <table {...getTableProps()} id="users">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <div>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <IconArrowAutofitDown />
                        ) : (
                          <IconArrowAutofitUp />
                        )
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                // onClick={(e) => handleClick(e, row.original.id)}
              >
                {row.cells.map((cell) => {
                  return (
                    <>
                      <td
                        {...cell.getCellProps()}
                        style={{
                          maxWidth: "500px",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

const MenuButton = ({ selectedRows }) => {
  const { isOnSpecificPage: isOnRequestsPage } =
    usePathNameAttributes("requests");
  const { isOnSpecificPage: isOnAdminMaterialPage } =
    usePathNameAttributes("/admin/materials");

  const { handleUserAccept, handleUserDelete, opened, toggleOpened } =
    useUserActions({
      userIds: selectedRows,
    });
  const { handleAddToTop } = useTopMaterialActions({
    materialIds: selectedRows,
  });

  // };
  return (
    <Group position="right">
      <Menu
        shadow="md"
        sx={{
          marginLeft: "1rem",
        }}
      >
        <Menu.Target>
          <Button
            disabled={selectedRows.length === 0}
            className="bg-primary-blue"
          >
            Actions
          </Button>
        </Menu.Target>

        <Menu.Dropdown
          sx={{
            marginLeft: "1rem",
          }}
        >
          {isOnRequestsPage && (
            <Menu.Item
              color="teal"
              icon={<IconCheck />}
              onClick={handleUserAccept}
            >
              Approve all
            </Menu.Item>
          )}
          {isOnAdminMaterialPage && (
            <Menu.Item
              color="teal"
              icon={<IconCheck />}
              onClick={handleAddToTop}
            >
              Add {selectedRows.length} materials to the top of the list
            </Menu.Item>
          )}
          <Menu.Label>Danger zone</Menu.Label>

          <Menu.Item color="red" icon={<IconTrash />} onClick={toggleOpened}>
            {isOnRequestsPage ? " Reject all" : "Delete all"}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <ConfirmDeleteModal
        handleCancel={toggleOpened}
        opened={opened}
        handleConfirm={handleUserDelete}
        title={`Delete selected users ?`}
        description={"Are you sure?"}
        askToEnterCommitmentText={true}
      />
    </Group>
  );
};

const AddButton = ({ type }) => {
  const [isOpen, setOpen] = useReducer((state) => !state, false);
  return (
    <>
      <Button
        className="bg-primary-blue"
        leftIcon={<IconPlus />}
        onClick={setOpen}
      >
        Add {type}
      </Button>
      <CustomModal opened={isOpen} handleCancel={setOpen} title={`Add ${type}`}>
        {type === "tag" ? (
          <AddTagForm handleCancel={setOpen} />
        ) : (
          <AddCategoryForm handleCancel={setOpen} type={type} />
        )}
      </CustomModal>
    </>
  );
};
