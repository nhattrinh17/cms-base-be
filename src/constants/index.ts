export const Status = {
  Active: 'ACTIVE',
  Inactive: 'INACTIVE',
};

export enum Gender {
  MALE = 'MALE',
  GIRL = 'FEMALE',
  OTHER = 'OTHER',
}

export const TypeMessage = {
  Text: 'TEXT',
  Image: 'IMAGE',
  File: 'FILE',
};

export const StatusMessage = {
  Sent: 0,
  Delivered: 1,
};

export const TypeGroup = {
  TwoPeople: 0,
  ManyPeople: 1,
};

export const TypeConsumerMessage = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  UPDATE_STATUS: 'UPDATE_STATUS',
  UPDATE_USER_READ: 'UPDATE_USER_READ',
  RECALL_MESSAGE: 'RECALL_MESSAGE',
  HIDE_MESSAGE: 'HIDE_MESSAGE',
  EDIT_MESSAGE: 'EDIT_MESSAGE',
};

export const Environment = {
  Development: 'development',
  Production: 'production',
};

export * from './message';
