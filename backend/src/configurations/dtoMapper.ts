import { createMap } from "@automapper/core";
import { mapper } from "../mapper";
import { UserEntity } from "@/entities/user.entity";
import { CreateUserDTO } from "@/dto/user/create";
import { GetUserDTO } from "@/dto/user/get";
import { UpdateUserDTO } from "@/dto/user/update";
import { DeleteUserDTO } from "@/dto/user/delete";

const initializeDTOMapper = () => {
  //  ===== user dto =========
  // create user
  createMap(mapper, UserEntity, CreateUserDTO);
  createMap(mapper, CreateUserDTO, UserEntity);
  // get user
  createMap(mapper, UserEntity, GetUserDTO);
  createMap(mapper, GetUserDTO, UserEntity);
  // update user
  createMap(mapper, UserEntity, UpdateUserDTO);
  createMap(mapper, UpdateUserDTO, UserEntity);
  // update user
  createMap(mapper, UserEntity, DeleteUserDTO);
  createMap(mapper, DeleteUserDTO, UserEntity);
};

export default initializeDTOMapper;
