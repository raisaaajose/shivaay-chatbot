import React from "react";
import Card from "../../../ui/Card/Card";
import AnimatedButton from "../../../ui/AnimatedButton/AnimatedButton";
import type UserTableProps from "../../../../types/User/UserTableProps";

const UserTable: React.FC<UserTableProps> = ({ users, getRoleActions }) => (
  <Card>
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-zinc-800 text-zinc-200">
          <th className="p-2">Email</th>
          <th className="p-2">Username</th>
          <th className="p-2">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="border-b border-zinc-700">
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.username || "-"}</td>
            <td className="p-2">
              {user.role || ""}
              <div className="mt-1 flex flex-wrap gap-1">
                {getRoleActions(user) &&
                  React.Children.map(getRoleActions(user), (action, idx) => {
                    if (!action) return null;
                    if (!React.isValidElement(action)) return action;

                    const typeName =
                      typeof action.type === "function"
                        ? action.type.name
                        : null;
                    if (typeName === "AnimatedButton") {
                      return action;
                    }

                    if (
                      typeof action.type === "string" &&
                      action.type === "button"
                    ) {
                      const { className, onClick, disabled, children } =
                        action.props as React.ButtonHTMLAttributes<HTMLButtonElement>;
                      const disabledClass = disabled
                        ? "opacity-60 cursor-not-allowed pointer-events-none"
                        : "";
                      return (
                        <AnimatedButton
                          key={idx}
                          className={
                            (className?.replace("px-2 py-1", "!px-2 !py-1") ||
                              "!px-2 !py-1 !text-xs !rounded") +
                            " " +
                            disabledClass
                          }
                          onClick={onClick}
                          icon={null}
                        >
                          {children}
                        </AnimatedButton>
                      );
                    }
                    return action;
                  })}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);

export default UserTable;
