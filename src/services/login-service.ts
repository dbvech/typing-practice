import UserService from "./user-service";

import type { User } from "../entities/user";
import type { Email } from "../entities/email";
import type { Password } from "../entities/password";

export default class LoginService {
  constructor(private readonly userService: UserService) {}

  public async login(email: Email, password: Password): Promise<User> {
    let user;

    try {
      user = await this.userService.getUserByEmailAndPassword(email, password);
    } catch (err) {
      throw new Error("Bad credentials");
    }

    return user;
  }
}
