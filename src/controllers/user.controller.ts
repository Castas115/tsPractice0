import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { encrypt } from "../helpers/auth.helper";
import { UserResponse} from "../dto/user.dto"; // Import UserDto from the correct path
import * as cache from "memory-cache";

export class UserController {
  static async signup(req: Request, res: Response) {
    const { name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
        
    // Use the UserResponse DTO to structure the data being sent in the response
    const userDataSent = new UserResponse()
    userDataSent.name = user.name;
    userDataSent.email= user.email;
    userDataSent.role = user.role;


    
    const token = encrypt.generateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
  });

    return res
      .status(200)
      .json({ message: "User created successfully", token, userDataSent });
  }

  static async getUsers(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const allUsers = await userRepository.find();
      // where: { id: req["currentUser"].id },
    // });
    return res.status(200).json({ allUsers });
  }
}