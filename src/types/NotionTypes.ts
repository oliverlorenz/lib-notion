import { Client } from '@notionhq/client';
import {
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
