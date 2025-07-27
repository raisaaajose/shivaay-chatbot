import User from "./User";

export default interface UserManagementProps {
  users: User[];
  getRoleActions: (user: User) => React.ReactNode;
  currentUserId?: string | null;
}
