import { Client } from "../entities/client";
import UserService from "./user-service";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: string, password: string): Promise<any> {
    let user;

    try {
      user = await this.userService.getUserByEmailAndPassword(email, password);
    } catch (err) {
      throw new Error("Bad credentials");
    }

    if (user instanceof Client) {
      throw new Error("Unauthorized");
    }

    // const permissions = this.userService.getUserPermissions(user);

    // if (!permissions?.dashboardAccess) {
    //   throw new Error("Unauthorized");
    // }

    return user;
  }
}
