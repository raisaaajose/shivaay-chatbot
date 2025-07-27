import React from "react";
import UserTable from "../UserTable/UserTable";
import type UserManagementProps from "../../../../types/User/UserManagementProps";

const UserManagement: React.FC<UserManagementProps> = ({
  users,
  getRoleActions,
}) => {
  return <UserTable users={users} getRoleActions={getRoleActions} />;
};

export default UserManagement;
