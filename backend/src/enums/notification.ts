export enum NotificationEnums {
  // Task-related notifications
  TASK_ASSIGNED = "Task assigned",
  TASK_COMPLETED = "Task completed",
  TASK_OVERDUE = "Task overdue",
  TASK_UPDATED = "Task updated",
  TASK_COMMENTED = "Comment added to task",
  TASK_REASSIGNED = "Task reassigned",
  TASK_DELETED = "Task deleted",

  // Project-related notifications
  PROJECT_CREATED = "Project created",
  PROJECT_UPDATED = "Project updated",
  PROJECT_DELETED = "Project deleted",
  PROJECT_COMPLETED = "Project completed",
  PROJECT_OVERDUE = "Project overdue",
  PROJECT_MEMBER_ADDED = "Member added to project",
  PROJECT_MEMBER_REMOVED = "Member removed from project",
  PROJECT_LEAVE_REQUEST = "Project leave request",

  // Team-related notifications
  TEAM_INVITATION = "Team invitation received",
  TEAM_JOINED = "Joined team",
  TEAM_LEFT = "Left team",
  TEAM_DELETED = "Team deleted",
  TEAM_UPDATED = "Team updated",
  TEAM_MEMBER_ADDED = "Member added to team",
  TEAM_MEMBER_REMOVED = "Member removed from team",
  TEAM_INVITATION_REJECTED = "Team invitation rejected",
  TEAM_INVITATION_CANCELED = "Team invitation cancelled",
  TEAM_INVITATION_ACCEPTED = "Team invitation accepted",

  // Comment and mention notifications
  COMMENT_MENTION = "Mentioned in a comment",
  USER_MENTIONED = "User mentioned",
  COMMENT_ADDED = "Comment added",

  // File-related notifications
  FILE_UPLOADED = "File uploaded",
  FILE_DELETED = "File deleted",

  // Deadline and reminder notifications
  DEADLINE_APPROACHING = "Deadline approaching",
  REMINDER = "Reminder",

  // Message and communication notifications
  MESSAGE_RECEIVED = "Message received",
  ANNOUNCEMENT = "Announcement",

  // Profile and permission notifications
  USER_PROFILE_UPDATED = "User profile updated",
  PERMISSION_CHANGED = "Permission changed",

  // System notifications
  SYSTEM_ALERT = "System alert",
  NEW_FEATURE = "New feature available",
}

export enum NotificationStatusEnum {
  read = "read",
  unread = "unread",
}
