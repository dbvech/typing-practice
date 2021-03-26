import useOperations from "../../hooks/use-operations";
import { Operation } from "../../entities/operation";
import { Dropdown, Menu, Button } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import type { User } from "../../entities/user";

type ActionsProps = {
  user: User;
  currentUser: User;
  onAction: (action: Operation) => void;
};

export default function Actions({ user, currentUser, onAction }: ActionsProps) {
  const operations = useOperations(user, currentUser);

  const menu = (
    <Menu>
      {operations.map((operation: Operation, key: number) => (
        <Menu.Item
          key={key}
          icon={<UserOutlined />}
          onClick={() => onAction(operation)}
        >
          {operation}
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <Dropdown disabled={!operations.length} overlay={menu} trigger={["click"]}>
      <Button
        type="link"
        size="small"
        style={{ padding: 0 }}
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        Action <DownOutlined />
      </Button>
    </Dropdown>
  );
}
