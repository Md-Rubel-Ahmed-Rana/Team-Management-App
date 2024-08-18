"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@automapper/core");
const mapper_1 = require("../mapper");
const user_entity_1 = require("@/entities/user.entity");
const create_1 = require("@/dto/user/create");
const get_1 = require("@/dto/user/get");
const update_1 = require("@/dto/user/update");
const delete_1 = require("@/dto/user/delete");
const team_entity_1 = require("@/entities/team.entity");
const create_2 = require("@/dto/team/create");
const get_2 = require("@/dto/team/get");
const update_2 = require("@/dto/team/update");
const delete_2 = require("@/dto/team/delete");
const project_entity_1 = require("@/entities/project.entity");
const create_3 = require("@/dto/project/create");
const get_3 = require("@/dto/project/get");
const update_3 = require("@/dto/project/update");
const delete_3 = require("@/dto/project/delete");
const getOnlyProject_1 = require("@/dto/project/getOnlyProject");
const task_entity_1 = require("@/entities/task.entity");
const create_4 = require("@/dto/task/create");
const get_4 = require("@/dto/task/get");
const update_4 = require("@/dto/task/update");
const delete_4 = require("@/dto/task/delete");
const teamLeave_entity_1 = require("@/entities/teamLeave.entity");
const create_5 = require("@/dto/teamLeave/create");
const get_5 = require("@/dto/teamLeave/get");
const update_5 = require("@/dto/teamLeave/update");
const delete_5 = require("@/dto/teamLeave/delete");
const projectLeave_entity_1 = require("@/entities/projectLeave.entity");
const create_6 = require("@/dto/projectLeave/create");
const get_6 = require("@/dto/projectLeave/get");
const update_6 = require("@/dto/projectLeave/update");
const delete_6 = require("@/dto/projectLeave/delete");
const plan_entity_1 = require("@/entities/plan.entity");
const create_7 = require("@/dto/plan/create");
const get_7 = require("@/dto/plan/get");
const update_7 = require("@/dto/plan/update");
const delete_7 = require("@/dto/plan/delete");
const message_entity_1 = require("@/entities/message.entity");
const create_8 = require("@/dto/message/create");
const get_8 = require("@/dto/message/get");
const update_8 = require("@/dto/message/update");
const delete_8 = require("@/dto/message/delete");
const payment_entity_1 = require("@/entities/payment.entity");
const create_9 = require("@/dto/payment/create");
const get_9 = require("@/dto/payment/get");
const update_9 = require("@/dto/payment/update");
const delete_9 = require("@/dto/payment/delete");
const getOnlyProjectForTask_1 = require("@/dto/project/getOnlyProjectForTask");
const initializeDTOMapper = () => {
    //  ===== user dto =========
    // create user
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, create_1.CreateUserDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_1.CreateUserDTO, user_entity_1.UserEntity);
    // get user
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, get_1.GetUserDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_1.GetUserDTO, user_entity_1.UserEntity);
    // update user
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, update_1.UpdateUserDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_1.UpdateUserDTO, user_entity_1.UserEntity);
    // update user
    (0, core_1.createMap)(mapper_1.mapper, user_entity_1.UserEntity, delete_1.DeleteUserDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_1.DeleteUserDTO, user_entity_1.UserEntity);
    //  ===== team dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, team_entity_1.TeamEntity, create_2.CreateTeamDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_2.CreateTeamDTO, team_entity_1.TeamEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, team_entity_1.TeamEntity, get_2.GetTeamDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_2.GetTeamDTO, team_entity_1.TeamEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, team_entity_1.TeamEntity, update_2.UpdateTeamDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_2.UpdateTeamDTO, team_entity_1.TeamEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, team_entity_1.TeamEntity, delete_2.DeleteTeamDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_2.DeleteTeamDTO, team_entity_1.TeamEntity);
    //  ===== project dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, project_entity_1.ProjectEntity, create_3.CreateProjectDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_3.CreateProjectDTO, project_entity_1.ProjectEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, project_entity_1.ProjectEntity, get_3.GetProjectDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_3.GetProjectDTO, project_entity_1.ProjectEntity);
    // get only for task
    (0, core_1.createMap)(mapper_1.mapper, project_entity_1.ProjectEntity, getOnlyProjectForTask_1.GetOnlyProjectForTaskDTO);
    (0, core_1.createMap)(mapper_1.mapper, getOnlyProjectForTask_1.GetOnlyProjectForTaskDTO, project_entity_1.ProjectEntity);
    // get only project
    (0, core_1.createMap)(mapper_1.mapper, project_entity_1.ProjectEntity, getOnlyProject_1.GetOnlyProjectDTO);
    (0, core_1.createMap)(mapper_1.mapper, getOnlyProject_1.GetOnlyProjectDTO, project_entity_1.ProjectEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, project_entity_1.ProjectEntity, update_3.UpdateProjectDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_3.UpdateProjectDTO, project_entity_1.ProjectEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, project_entity_1.ProjectEntity, delete_3.DeleteProjectDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_3.DeleteProjectDTO, project_entity_1.ProjectEntity);
    //  ===== task dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, task_entity_1.TaskEntity, create_4.CreateTaskDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_4.CreateTaskDTO, task_entity_1.TaskEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, task_entity_1.TaskEntity, get_4.GetTaskDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_4.GetTaskDTO, task_entity_1.TaskEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, task_entity_1.TaskEntity, update_4.UpdateTaskDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_4.UpdateTaskDTO, task_entity_1.TaskEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, task_entity_1.TaskEntity, delete_4.DeleteTaskDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_4.DeleteTaskDTO, task_entity_1.TaskEntity);
    //  ===== team leave dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, teamLeave_entity_1.TeamLeaveEntity, create_5.CreateTeamLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_5.CreateTeamLeaveDTO, teamLeave_entity_1.TeamLeaveEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, teamLeave_entity_1.TeamLeaveEntity, get_5.GetTeamLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_5.GetTeamLeaveDTO, teamLeave_entity_1.TeamLeaveEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, teamLeave_entity_1.TeamLeaveEntity, update_5.UpdateTeamLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_5.UpdateTeamLeaveDTO, teamLeave_entity_1.TeamLeaveEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, teamLeave_entity_1.TeamLeaveEntity, delete_5.DeleteTeamLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_5.DeleteTeamLeaveDTO, teamLeave_entity_1.TeamLeaveEntity);
    //  ===== project leave dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, projectLeave_entity_1.ProjectLeaveEntity, create_6.CreateProjectLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_6.CreateProjectLeaveDTO, projectLeave_entity_1.ProjectLeaveEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, projectLeave_entity_1.ProjectLeaveEntity, get_6.GetProjectLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_6.GetProjectLeaveDTO, projectLeave_entity_1.ProjectLeaveEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, projectLeave_entity_1.ProjectLeaveEntity, update_6.UpdateProjectLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_6.UpdateProjectLeaveDTO, projectLeave_entity_1.ProjectLeaveEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, projectLeave_entity_1.ProjectLeaveEntity, delete_6.DeleteProjectLeaveDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_6.DeleteProjectLeaveDTO, projectLeave_entity_1.ProjectLeaveEntity);
    //  ===== plan  dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, plan_entity_1.PlanEntity, create_7.CreatePlanDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_7.CreatePlanDTO, plan_entity_1.PlanEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, plan_entity_1.PlanEntity, get_7.GetPlanDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_7.GetPlanDTO, plan_entity_1.PlanEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, plan_entity_1.PlanEntity, update_7.UpdatePlanDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_7.UpdatePlanDTO, plan_entity_1.PlanEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, plan_entity_1.PlanEntity, delete_7.DeletePlanDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_7.DeletePlanDTO, plan_entity_1.PlanEntity);
    //  ===== message  dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, message_entity_1.MessageEntity, create_8.CreateMessageDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_8.CreateMessageDTO, message_entity_1.MessageEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, message_entity_1.MessageEntity, get_8.GetMessageDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_8.GetMessageDTO, message_entity_1.MessageEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, message_entity_1.MessageEntity, update_8.UpdateMessageDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_8.UpdateMessageDTO, message_entity_1.MessageEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, message_entity_1.MessageEntity, delete_8.DeleteMessageDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_8.DeleteMessageDTO, message_entity_1.MessageEntity);
    //  ===== payment  dto =========
    // create
    (0, core_1.createMap)(mapper_1.mapper, payment_entity_1.PaymentEntity, create_9.CreatePaymentDTO);
    (0, core_1.createMap)(mapper_1.mapper, create_9.CreatePaymentDTO, payment_entity_1.PaymentEntity);
    // get
    (0, core_1.createMap)(mapper_1.mapper, payment_entity_1.PaymentEntity, get_9.GetPaymentDTO);
    (0, core_1.createMap)(mapper_1.mapper, get_9.GetPaymentDTO, payment_entity_1.PaymentEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, payment_entity_1.PaymentEntity, update_9.UpdatePaymentDTO);
    (0, core_1.createMap)(mapper_1.mapper, update_9.UpdatePaymentDTO, payment_entity_1.PaymentEntity);
    // update
    (0, core_1.createMap)(mapper_1.mapper, payment_entity_1.PaymentEntity, delete_9.DeletePaymentDTO);
    (0, core_1.createMap)(mapper_1.mapper, delete_9.DeletePaymentDTO, payment_entity_1.PaymentEntity);
};
exports.default = initializeDTOMapper;
