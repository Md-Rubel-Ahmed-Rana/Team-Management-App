export enum NotificationEnums {
  TASK_ASSIGNED = "task_assigned",
  TASK_COMPLETED = "task_completed",
  TASK_OVERDUE = "task_overdue",
  PROJECT_CREATED = "project_created",
  PROJECT_UPDATED = "project_updated",
  PROJECT_DELETED = "project_deleted",
  TEAM_INVITATION = "team_invitation",
  TEAM_JOINED = "team_joined",
  TEAM_LEFT = "team_left",
  COMMENT_MENTION = "comment_mention",
  FILE_UPLOADED = "file_uploaded",
  DEADLINE_APPROACHING = "deadline_approaching",
  MESSAGE_RECEIVED = "message_received",
  USER_MENTIONED = "user_mentioned",
  USER_PROFILE_UPDATED = "user_profile_updated",
  PERMISSION_CHANGED = "permission_changed",
  SYSTEM_ALERT = "system_alert",
  NEW_FEATURE = "new_feature",
  REMINDER = "reminder",
  ANNOUNCEMENT = "announcement",
}

export enum NotificationStatusEnum {
  read = "read",
  unread = "unread",
}
