"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationStatusEnum = exports.NotificationEnums = void 0;
var NotificationEnums;
(function (NotificationEnums) {
    // Task-related notifications
    NotificationEnums["TASK_ASSIGNED"] = "Task assigned";
    NotificationEnums["TASK_COMPLETED"] = "Task completed";
    NotificationEnums["TASK_OVERDUE"] = "Task overdue";
    NotificationEnums["TASK_UPDATED"] = "Task updated";
    NotificationEnums["TASK_COMMENTED"] = "Comment added to task";
    NotificationEnums["TASK_REASSIGNED"] = "Task reassigned";
    NotificationEnums["TASK_DELETED"] = "Task deleted";
    // Project-related notifications
    NotificationEnums["PROJECT_CREATED"] = "Project created";
    NotificationEnums["PROJECT_UPDATED"] = "Project updated";
    NotificationEnums["PROJECT_DELETED"] = "Project deleted";
    NotificationEnums["PROJECT_COMPLETED"] = "Project completed";
    NotificationEnums["PROJECT_OVERDUE"] = "Project overdue";
    NotificationEnums["PROJECT_MEMBER_ADDED"] = "Member added to project";
    NotificationEnums["PROJECT_MEMBER_REMOVED"] = "Member removed from project";
    // Team-related notifications
    NotificationEnums["TEAM_INVITATION"] = "Team invitation received";
    NotificationEnums["TEAM_JOINED"] = "Joined team";
    NotificationEnums["TEAM_LEFT"] = "Left team";
    NotificationEnums["TEAM_UPDATED"] = "Team updated";
    NotificationEnums["TEAM_MEMBER_ADDED"] = "Member added to team";
    NotificationEnums["TEAM_MEMBER_REMOVED"] = "Member removed from team";
    NotificationEnums["TEAM_INVITATION_REJECTED"] = "Team invitation rejected";
    NotificationEnums["TEAM_INVITATION_CANCELED"] = "Team invitation cancelled";
    NotificationEnums["TEAM_INVITATION_ACCEPTED"] = "Team invitation accepted";
    // Comment and mention notifications
    NotificationEnums["COMMENT_MENTION"] = "Mentioned in a comment";
    NotificationEnums["USER_MENTIONED"] = "User mentioned";
    NotificationEnums["COMMENT_ADDED"] = "Comment added";
    // File-related notifications
    NotificationEnums["FILE_UPLOADED"] = "File uploaded";
    NotificationEnums["FILE_DELETED"] = "File deleted";
    // Deadline and reminder notifications
    NotificationEnums["DEADLINE_APPROACHING"] = "Deadline approaching";
    NotificationEnums["REMINDER"] = "Reminder";
    // Message and communication notifications
    NotificationEnums["MESSAGE_RECEIVED"] = "Message received";
    NotificationEnums["ANNOUNCEMENT"] = "Announcement";
    // Profile and permission notifications
    NotificationEnums["USER_PROFILE_UPDATED"] = "User profile updated";
    NotificationEnums["PERMISSION_CHANGED"] = "Permission changed";
    // System notifications
    NotificationEnums["SYSTEM_ALERT"] = "System alert";
    NotificationEnums["NEW_FEATURE"] = "New feature available";
})(NotificationEnums || (exports.NotificationEnums = NotificationEnums = {}));
var NotificationStatusEnum;
(function (NotificationStatusEnum) {
    NotificationStatusEnum["read"] = "read";
    NotificationStatusEnum["unread"] = "unread";
})(NotificationStatusEnum || (exports.NotificationStatusEnum = NotificationStatusEnum = {}));
