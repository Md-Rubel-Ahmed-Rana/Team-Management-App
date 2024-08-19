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
import { TaskEntity } from "@/entities/task.entity";
import { CreateTaskDTO } from "@/dto/task/create";
import { GetTaskDTO } from "@/dto/task/get";
import { UpdateTaskDTO } from "@/dto/task/update";
import { DeleteTaskDTO } from "@/dto/task/delete";
import { TeamLeaveEntity } from "@/entities/teamLeave.entity";
import { CreateTeamLeaveDTO } from "@/dto/teamLeave/create";
import { GetTeamLeaveDTO } from "@/dto/teamLeave/get";
import { UpdateTeamLeaveDTO } from "@/dto/teamLeave/update";
import { DeleteTeamLeaveDTO } from "@/dto/teamLeave/delete";
import { ProjectLeaveEntity } from "@/entities/projectLeave.entity";
import { CreateProjectLeaveDTO } from "@/dto/projectLeave/create";
import { GetProjectLeaveDTO } from "@/dto/projectLeave/get";
import { UpdateProjectLeaveDTO } from "@/dto/projectLeave/update";
import { DeleteProjectLeaveDTO } from "@/dto/projectLeave/delete";
import { PlanEntity } from "@/entities/plan.entity";
import { CreatePlanDTO } from "@/dto/plan/create";
import { GetPlanDTO } from "@/dto/plan/get";
import { UpdatePlanDTO } from "@/dto/plan/update";
import { DeletePlanDTO } from "@/dto/plan/delete";
import { MessageEntity } from "@/entities/message.entity";
import { CreateMessageDTO } from "@/dto/message/create";
import { GetMessageDTO } from "@/dto/message/get";
import { UpdateMessageDTO } from "@/dto/message/update";
import { DeleteMessageDTO } from "@/dto/message/delete";
import { PaymentEntity } from "@/entities/payment.entity";
import { CreatePaymentDTO } from "@/dto/payment/create";
import { GetPaymentDTO } from "@/dto/payment/get";
import { UpdatePaymentDTO } from "@/dto/payment/update";
import { DeletePaymentDTO } from "@/dto/payment/delete";
import { GetOnlyProjectForTaskDTO } from "@/dto/project/getOnlyProjectForTask";

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
  // get only for task
  createMap(mapper, ProjectEntity, GetOnlyProjectForTaskDTO);
  createMap(mapper, GetOnlyProjectForTaskDTO, ProjectEntity);
  // get only project
  createMap(mapper, ProjectEntity, GetOnlyProjectDTO);
  createMap(mapper, GetOnlyProjectDTO, ProjectEntity);
  // update
  createMap(mapper, ProjectEntity, UpdateProjectDTO);
  createMap(mapper, UpdateProjectDTO, ProjectEntity);
  // update
  createMap(mapper, ProjectEntity, DeleteProjectDTO);
  createMap(mapper, DeleteProjectDTO, ProjectEntity);

  //  ===== task dto =========
  // create
  createMap(mapper, TaskEntity, CreateTaskDTO);
  createMap(mapper, CreateTaskDTO, TaskEntity);
  // get
  createMap(mapper, TaskEntity, GetTaskDTO);
  createMap(mapper, GetTaskDTO, TaskEntity);

  // update
  createMap(mapper, TaskEntity, UpdateTaskDTO);
  createMap(mapper, UpdateTaskDTO, TaskEntity);
  // update
  createMap(mapper, TaskEntity, DeleteTaskDTO);
  createMap(mapper, DeleteTaskDTO, TaskEntity);

  //  ===== team leave dto =========
  // create
  createMap(mapper, TeamLeaveEntity, CreateTeamLeaveDTO);
  createMap(mapper, CreateTeamLeaveDTO, TeamLeaveEntity);
  // get
  createMap(mapper, TeamLeaveEntity, GetTeamLeaveDTO);
  createMap(mapper, GetTeamLeaveDTO, TeamLeaveEntity);

  // update
  createMap(mapper, TeamLeaveEntity, UpdateTeamLeaveDTO);
  createMap(mapper, UpdateTeamLeaveDTO, TeamLeaveEntity);
  // update
  createMap(mapper, TeamLeaveEntity, DeleteTeamLeaveDTO);
  createMap(mapper, DeleteTeamLeaveDTO, TeamLeaveEntity);

  //  ===== project leave dto =========
  // create
  createMap(mapper, ProjectLeaveEntity, CreateProjectLeaveDTO);
  createMap(mapper, CreateProjectLeaveDTO, ProjectLeaveEntity);
  // get
  createMap(mapper, ProjectLeaveEntity, GetProjectLeaveDTO);
  createMap(mapper, GetProjectLeaveDTO, ProjectLeaveEntity);

  // update
  createMap(mapper, ProjectLeaveEntity, UpdateProjectLeaveDTO);
  createMap(mapper, UpdateProjectLeaveDTO, ProjectLeaveEntity);
  // update
  createMap(mapper, ProjectLeaveEntity, DeleteProjectLeaveDTO);
  createMap(mapper, DeleteProjectLeaveDTO, ProjectLeaveEntity);

  //  ===== plan  dto =========
  // create
  createMap(mapper, PlanEntity, CreatePlanDTO);
  createMap(mapper, CreatePlanDTO, PlanEntity);
  // get
  createMap(mapper, PlanEntity, GetPlanDTO);
  createMap(mapper, GetPlanDTO, PlanEntity);

  // update
  createMap(mapper, PlanEntity, UpdatePlanDTO);
  createMap(mapper, UpdatePlanDTO, PlanEntity);
  // update
  createMap(mapper, PlanEntity, DeletePlanDTO);
  createMap(mapper, DeletePlanDTO, PlanEntity);

  //  ===== message  dto =========
  // create
  createMap(mapper, MessageEntity, CreateMessageDTO);
  createMap(mapper, CreateMessageDTO, MessageEntity);
  // get
  createMap(mapper, MessageEntity, GetMessageDTO);
  createMap(mapper, GetMessageDTO, MessageEntity);

  // update
  createMap(mapper, MessageEntity, UpdateMessageDTO);
  createMap(mapper, UpdateMessageDTO, MessageEntity);
  // update
  createMap(mapper, MessageEntity, DeleteMessageDTO);
  createMap(mapper, DeleteMessageDTO, MessageEntity);

  //  ===== payment  dto =========
  // create
  createMap(mapper, PaymentEntity, CreatePaymentDTO);
  createMap(mapper, CreatePaymentDTO, PaymentEntity);
  // get
  createMap(mapper, PaymentEntity, GetPaymentDTO);
  createMap(mapper, GetPaymentDTO, PaymentEntity);

  // update
  createMap(mapper, PaymentEntity, UpdatePaymentDTO);
  createMap(mapper, UpdatePaymentDTO, PaymentEntity);
  // update
  createMap(mapper, PaymentEntity, DeletePaymentDTO);
  createMap(mapper, DeletePaymentDTO, PaymentEntity);
};

export default initializeDTOMapper;
