import User from "./User";

export default interface UserTableProps {
  users: User[];
  getRoleActions: (user: User) => React.ReactNode;
  currentUserId?: string | null;
}
