import type { Client } from '@notionhq/client';
import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

export type Title = string;
export type Relation = string;
export type Number = number;
export type RichText = string;
export type Checkbox = boolean;
export type DateTime = Date;
export type File = Buffer;

export type NotionClient = Client;

export type NotionType =
  | Title
  | Relation
  | Relation[]
  | Number
  | RichText
  | Checkbox
  | DateTime
  | File;

export type SimplifiedNotionEntity = Record<string, NotionType>;

export type NotionRawEntity =
  | PageObjectResponse
  | PartialPageObjectResponse
  | PartialDatabaseObjectResponse
  | DatabaseObjectResponse;

export type NotionRawEntityOrNull = NotionRawEntity | null;

export type TitlePropertyUpdate = {
  title: [
    {
      text: {
        content: string;
      };
    },
  ];
  type: 'title';
};

export type RichTextPropertyUpdate = {
  rich_text: [
    {
      text: {
        content: string;
      };
    },
  ];
  type: 'rich_text';
};

export type NumberPropertyUpdate = {
  number: number | null;
  type: 'number';
};

export type CheckboxPropertyUpdate = {
  checkbox: boolean;
  type: 'checkbox';
};

export type DateTimeStartPropertyUpdate = {
  date: { start: string | null };
  type: 'date';
};

export type PhoneNumberPropertyUpdate = {
  phone_number: string | null;
  type: 'phone_number';
};

export type EMailPropertyUpdate = {
  email: string | null;
  type: 'email';
};

export type SingleRelationPropertyUpdate = {
  relation: [
    {
      id: string;
    },
  ];
  type: 'relation';
};

export type RelationIdListPropertyUpdate = {
  relation: {
    id: string;
  }[];
  type: 'relation';
};

export type PropertyUpdate =
  | TitlePropertyUpdate
  | RichTextPropertyUpdate
  | DateTimeStartPropertyUpdate
  | CheckboxPropertyUpdate
  | NumberPropertyUpdate
  | PhoneNumberPropertyUpdate
  | EMailPropertyUpdate
  | SingleRelationPropertyUpdate
  | RelationIdListPropertyUpdate;
