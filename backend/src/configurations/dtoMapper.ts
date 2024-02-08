import { createMap } from "@automapper/core";
import { mapper } from "../mapper";
import { UserEntity } from "@/entities/user.entity";
import { CreateUserDTO } from "@/dto/user/create";
import { GetUserDTO } from "@/dto/user/get";
import { UpdateUserDTO } from "@/dto/user/update";
import { DeleteUserDTO } from "@/dto/user/delete";
import { TeamEntity } from "@/entities/team.entity";
import { CreateTeamDTO } from "@/dto/team/create";
import { GetTeamDTO } from "@/dto/team/get";
import { UpdateTeamDTO } from "@/dto/team/update";
import { DeleteTeamDTO } from "@/dto/team/delete";
import { ProjectEntity } from "@/entities/project.entity";
import { CreateProjectDTO } from "@/dto/project/create";
import { GetProjectDTO } from "@/dto/project/get";
import { UpdateProjectDTO } from "@/dto/project/update";
import { DeleteProjectDTO } from "@/dto/project/delete";
import { GetOnlyProjectDTO } from "@/dto/project/getOnlyProject";

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

  //  ===== project dto =========
  // create
  createMap(mapper, ProjectEntity, CreateProjectDTO);
  createMap(mapper, CreateProjectDTO, ProjectEntity);
  // get
  createMap(mapper, ProjectEntity, GetProjectDTO);
  createMap(mapper, GetProjectDTO, ProjectEntity);
  // get only project
  createMap(mapper, ProjectEntity, GetOnlyProjectDTO);
  createMap(mapper, GetOnlyProjectDTO, ProjectEntity);
  // update
  createMap(mapper, ProjectEntity, UpdateProjectDTO);
  createMap(mapper, UpdateProjectDTO, ProjectEntity);
  // update
  createMap(mapper, ProjectEntity, DeleteProjectDTO);
  createMap(mapper, DeleteProjectDTO, ProjectEntity);
};

export default initializeDTOMapper;
