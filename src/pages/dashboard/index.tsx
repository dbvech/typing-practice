import type { RouteComponentProps } from "@reach/router";
import { Table, Breadcrumb } from "antd";

import "./styles.css";
import Page from "../base";
import Name from "./name";
import Role from "./role";
import Actions from "./actions";
import useUsers from "../../hooks/use-users";
import useCurrentUser from "../../hooks/use-current-user";
import useCurrentUserPermissions from "../../hooks/use-current-user-permissions";
import type { User } from "../../entities/user";

export default function Dashboard(_: RouteComponentProps) {
  const currentUser = useCurrentUser();
  const currentUserPermissions = useCurrentUserPermissions();
  const [users, onUserUpdates] = useUsers();

  if (!currentUser) {
    return null;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string, user: User) => (
        <Name
          name={`${name} ${user.id === currentUser.id ? "(It's you)" : ""}`}
        />
      ),
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role: string) => <Role role={role} />,
    },
    {
      title: "Action",
      key: "action",
      render: (_: undefined, user: User) => (
        <Actions
          user={user}
          currentUser={currentUser}
          onAction={(action) => onUserUpdates(user, action)}
        />
      ),
    },
  ];

  return (
    <Page>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background content-container">
        {currentUserPermissions.dashboard && (
          <Table rowKey="id" columns={columns} dataSource={users} />
        )}
      </div>
    </Page>
  );
}
