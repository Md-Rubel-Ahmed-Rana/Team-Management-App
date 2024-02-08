import { createMap } from "@automapper/core";
import { mapper } from "../mapper";
import { UserEntity } from "@/entities/user.entity";
import { CreateUserDTO } from "@/dto/user/create";
import { GetUserDTO } from "@/dto/user/get";
import { UpdateUserDTO } from "@/dto/user/update";
import { DeleteUserDTO } from "@/dto/user/delete";
import { TeamEntity } from "@/entities/team";
import { CreateTeamDTO } from "@/dto/team/create";
import { GetTeamDTO } from "@/dto/team/get";
import { UpdateTeamDTO } from "@/dto/team/update";
import { DeleteTeamDTO } from "@/dto/team/delete";

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

  //  ===== team dto =========
  // create
  createMap(mapper, TeamEntity, CreateTeamDTO);
  createMap(mapper, CreateTeamDTO, TeamEntity);
  // get
  createMap(mapper, TeamEntity, GetTeamDTO);
  createMap(mapper, GetTeamDTO, TeamEntity);
  // update
  createMap(mapper, TeamEntity, UpdateTeamDTO);
  createMap(mapper, UpdateTeamDTO, TeamEntity);
  // update
  createMap(mapper, TeamEntity, DeleteTeamDTO);
  createMap(mapper, DeleteTeamDTO, TeamEntity);
};

export default initializeDTOMapper;
