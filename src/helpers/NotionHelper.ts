import type {
  CheckboxPropertyUpdate,
  DateTimeStartPropertyUpdate,
  EMailPropertyUpdate,
  NotionRawEntity,
  NumberPropertyUpdate,
  PhoneNumberPropertyUpdate,
  Relation,
  RelationIdListPropertyUpdate,
  RichTextPropertyUpdate,
  SimplifiedNotionEntity,
  SingleRelationPropertyUpdate,
  TitlePropertyUpdate,
} from '../types';

export function readProperty<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): any {
  // @ts-ignore
  return entry.properties[propertyName];
}

function orFail<NotionType extends SimplifiedNotionEntity, T>(
  propertyName: keyof NotionType,
  value: T | undefined,
): T {
  if (value === undefined) {
    throw new Error(`Property "${propertyName as string} was undefined. abort.`);
  }
  return value;
}

///////////////////////////////////////////////////////////////////////////////
// Title
///////////////////////////////////////////////////////////////////////////////

export function readTitle<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string | undefined {
  return readProperty<NotionType>(entry, propertyName)?.title[0]?.text.content;
}

export function readTitleOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string {
  return orFail<NotionType, string>(propertyName, readTitle<NotionType>(entry, propertyName));
}

export function writeTitle(value: string): TitlePropertyUpdate {
  return {
    title: [
      {
        text: {
          content: value,
        },
      },
    ],
    type: 'title',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Rich Text
///////////////////////////////////////////////////////////////////////////////

export function readRichText<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string | undefined {
  return readProperty<NotionType>(entry, propertyName)?.rich_text[0]?.plain_text;
}

export function readRichTextOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string {
  return orFail<NotionType, string>(propertyName, readRichText(entry, propertyName));
}

export function writeRichText(value: string): RichTextPropertyUpdate {
  return {
    rich_text: [
      {
        text: {
          content: value,
        },
      },
    ],
    type: 'rich_text',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Number
///////////////////////////////////////////////////////////////////////////////

export function readNumber<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): number | undefined {
  return readProperty<NotionType>(entry, propertyName)?.number;
}

export function readNumberOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): number {
  return orFail<NotionType, number>(propertyName, readNumber(entry, propertyName));
}

export function writeNumber(value: number | null): NumberPropertyUpdate {
  return {
    number: value,
    type: 'number',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Boolean
///////////////////////////////////////////////////////////////////////////////

export function readBoolean<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): boolean | undefined {
  return readProperty<NotionType>(entry, propertyName)?.checkbox;
}

export function readBooleanOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): boolean {
  return orFail<NotionType, boolean>(propertyName, readBoolean(entry, propertyName));
}

export function writeBoolean(value: boolean): CheckboxPropertyUpdate {
  return {
    checkbox: value,
    type: 'checkbox',
  };
}

///////////////////////////////////////////////////////////////////////////////
// DateTime Start
///////////////////////////////////////////////////////////////////////////////

export function readDateTimeStart<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): Date | undefined {
  return readProperty<NotionType>(entry, propertyName)?.date?.start;
}

export function readDateTimeStartOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): Date {
  return orFail<NotionType, Date>(propertyName, readDateTimeStart(entry, propertyName));
}

export function writeDateTimeStart(value: Date): DateTimeStartPropertyUpdate {
  return {
    date: {
      start: value.toISOString(),
    },
    type: 'date',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Phone Number
///////////////////////////////////////////////////////////////////////////////

export function readPhoneNumber<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): number | undefined {
  return readProperty<NotionType>(entry, propertyName)?.phone_number;
}

export function readPhoneNumberOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): number {
  return orFail<NotionType, number>(propertyName, readPhoneNumber(entry, propertyName));
}

export function writePhoneNumber(value: string | null): PhoneNumberPropertyUpdate {
  return {
    phone_number: value,
    type: 'phone_number',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Email
///////////////////////////////////////////////////////////////////////////////

export function readEMail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string | undefined {
  return readProperty<NotionType>(entry, propertyName)?.email;
}

export function readEMailOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string {
  return orFail<NotionType, string>(propertyName, readEMail(entry, propertyName));
}

export function writeEMail(value: string | null): EMailPropertyUpdate {
  return {
    email: value,
    type: 'email',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Single Relation
///////////////////////////////////////////////////////////////////////////////

export function readSingleRelation<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): Relation | undefined {
  return readProperty<NotionType>(entry, propertyName)?.relation[0]?.id;
}

export function readSingleRelationOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): Relation {
  return orFail(propertyName, readSingleRelation(entry, propertyName));
}

export function writeSingleRelation(value: string): SingleRelationPropertyUpdate {
  return {
    relation: [
      {
        id: value,
      },
    ],
    type: 'relation',
  };
}

///////////////////////////////////////////////////////////////////////////////
// Relation Id List
///////////////////////////////////////////////////////////////////////////////

export function readRelationIdList<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string[] | undefined {
  const property = readProperty<NotionType>(entry, propertyName);
  if (property === undefined) {
    return undefined;
  }
  return (property.relation as { id: string }[]).map((relation) => {
    return relation.id;
  });
}

export function readRelationIdListOrFail<NotionType extends SimplifiedNotionEntity>(
  entry: NotionRawEntity,
  propertyName: keyof NotionType,
): string[] {
  return orFail(propertyName, readRelationIdList(entry, propertyName));
}

export function writeRelationIdList(idList: string[]): RelationIdListPropertyUpdate {
  return {
    relation: idList.map((id) => {
      return { id };
    }),
    type: 'relation',
  };
}
