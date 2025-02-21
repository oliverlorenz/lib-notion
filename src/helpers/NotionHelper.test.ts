import {
  readBoolean,
  readBooleanOrFail,
  readDateTimeStartOrFail,
  readNumberOrFail,
  readProperty,
  readRelationIdListOrFail,
  readSingleRelation,
  readSingleRelationOrFail,
  readTitle,
  readTitleOrFail,
} from "./NotionHelper";
import { NotionRawEntity, SimplifiedNotionEntity } from "../types";
import { readRichText } from "./NotionHelper";
import { readRichTextOrFail } from "./NotionHelper";
import { readNumber } from "./NotionHelper";
import { readDateTimeStart } from "./NotionHelper";
import { readRelationIdList } from "./NotionHelper";

describe("NotionHelper", () => {
  describe("readProperty", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      title: string;
      number: number;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        title: { title: [{ text: { content: "Test Title" } }] },
        // @ts-ignore
        number: { number: 42 },
      },
    };

    it("should read a title property", () => {
      const result = readProperty<TestEntity>(mockEntry, "title");
      expect(result).toEqual({ title: [{ text: { content: "Test Title" } }] });
    });

    it("should read a number property", () => {
      const result = readProperty<TestEntity>(mockEntry, "number");
      expect(result).toEqual({ number: 42 });
    });

    it("should return undefined for a non-existent property", () => {
      const result = readProperty<TestEntity>(
        mockEntry,
        "nonExistent" as keyof TestEntity
      );
      expect(result).toBeUndefined();
    });
  });

  describe("readTitle", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      title: string;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        title: { title: [{ text: { content: "Test Title" } }] },
      },
    };

    it("should read the title content", () => {
      const result = readTitle<TestEntity>(mockEntry, "title");
      expect(result).toBe("Test Title");
    });

    it("should return undefined if title property does not exist", () => {
      const result = readTitle<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "title"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined if title content is not available", () => {
      const result = readTitle<TestEntity>(
        {
          properties: {
            // @ts-ignore
            title: { title: [] },
          },
        } satisfies NotionRawEntity,
        "title"
      );
      expect(result).toBeUndefined();
    });
  });

  describe("readTitleOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      title: string;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        title: { title: [{ text: { content: "Test Title" } }] },
      },
    };

    it("should return the title content if it exists", () => {
      const result = readTitleOrFail<TestEntity>(mockEntry, "title");
      expect(result).toBe("Test Title");
    });

    it("should throw an error if the title property does not exist", () => {
      expect(() => {
        readTitleOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "title"
        );
      }).toThrow('Property "title was undefined. abort.');
    });

    it("should throw an error if the title content is not available", () => {
      expect(() => {
        readTitleOrFail<TestEntity>(
          {
            properties: {
              // @ts-ignore
              title: { title: [] },
            },
          } satisfies NotionRawEntity,
          "title"
        );
      }).toThrow('Property "title was undefined. abort.');
    });
  });

  describe("readRichText", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      richText: string;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        richText: { rich_text: [{ plain_text: "Test Rich Text" }] },
      },
    };

    it("should read the rich text content", () => {
      const result = readRichText<TestEntity>(mockEntry, "richText");
      expect(result).toBe("Test Rich Text");
    });

    it("should return undefined if rich text property does not exist", () => {
      const result = readRichText<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "richText"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined if rich text content is not available", () => {
      const result = readRichText<TestEntity>(
        {
          properties: {
            // @ts-ignore
            richText: { rich_text: [] },
          },
        } satisfies NotionRawEntity,
        "richText"
      );
      expect(result).toBeUndefined();
    });
  });

  describe("readRichTextOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      richText: string;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        richText: { rich_text: [{ plain_text: "Test Rich Text" }] },
      },
    };

    it("should return the rich text content if it exists", () => {
      const result = readRichTextOrFail<TestEntity>(mockEntry, "richText");
      expect(result).toBe("Test Rich Text");
    });

    it("should throw an error if the rich text property does not exist", () => {
      expect(() => {
        readRichTextOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "richText"
        );
      }).toThrow('Property "richText was undefined. abort.');
    });

    it("should throw an error if the rich text content is not available", () => {
      expect(() => {
        readRichTextOrFail<TestEntity>(
          {
            properties: {
              // @ts-ignore
              richText: { rich_text: [] },
            },
          } satisfies NotionRawEntity,
          "richText"
        );
      }).toThrow('Property "richText was undefined. abort.');
    });
  });

  describe("readNumber", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      number: number;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        number: { number: 42 },
      },
    };

    it("should read the number property", () => {
      const result = readNumber<TestEntity>(mockEntry, "number");
      expect(result).toBe(42);
    });

    it("should return undefined if number property does not exist", () => {
      const result = readNumber<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "number"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined if number value is not available", () => {
      const result = readNumber<TestEntity>(
        {
          properties: {
            // @ts-ignore
            number: {},
          },
        } satisfies NotionRawEntity,
        "number"
      );
      expect(result).toBeUndefined();
    });
  });

  describe("readNumberOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      number: number;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        number: { number: 42 },
      },
    };

    it("should return the number property if it exists", () => {
      const result = readNumberOrFail<TestEntity>(mockEntry, "number");
      expect(result).toBe(42);
    });

    it("should throw an error if the number property does not exist", () => {
      expect(() => {
        readNumberOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "number"
        );
      }).toThrow('Property "number was undefined. abort.');
    });

    it("should throw an error if the number value is not available", () => {
      expect(() => {
        readNumberOrFail<TestEntity>(
          {
            properties: {
              // @ts-ignore
              number: {},
            },
          } satisfies NotionRawEntity,
          "number"
        );
      }).toThrow('Property "number was undefined. abort.');
    });
  });
  describe("readBoolean", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      boolean: boolean;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        boolean: { checkbox: true },
      },
    };

    it("should read the boolean property", () => {
      const result = readBoolean<TestEntity>(mockEntry, "boolean");
      expect(result).toBe(true);
    });

    it("should return undefined if boolean property does not exist", () => {
      const result = readBoolean<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "boolean"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined if boolean value is not available", () => {
      const result = readBoolean<TestEntity>(
        {
          properties: {
            // @ts-ignore
            boolean: {},
          },
        } satisfies NotionRawEntity,
        "boolean"
      );
      expect(result).toBeUndefined();
    });
  });
  describe("readBooleanOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      boolean: boolean;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        boolean: { checkbox: true },
      },
    };

    it("should return the boolean property if it exists", () => {
      const result = readBooleanOrFail<TestEntity>(mockEntry, "boolean");
      expect(result).toBe(true);
    });

    it("should throw an error if the boolean property does not exist", () => {
      expect(() => {
        readBooleanOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "boolean"
        );
      }).toThrow('Property "boolean was undefined. abort.');
    });

    it("should throw an error if the boolean value is not available", () => {
      expect(() => {
        readBooleanOrFail<TestEntity>(
          {
            properties: {
              // @ts-ignore
              boolean: {},
            },
          } satisfies NotionRawEntity,
          "boolean"
        );
      }).toThrow('Property "boolean was undefined. abort.');
    });
  });
  describe("readDateTimeStart", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      dateTimeStart: Date;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        dateTimeStart: { date: { start: new Date("2023-01-01T00:00:00Z") } },
      },
    };

    it("should read the date time start property", () => {
      const result = readDateTimeStart<TestEntity>(mockEntry, "dateTimeStart");
      expect(result).toEqual(new Date("2023-01-01T00:00:00Z"));
    });

    it("should return undefined if date time start property does not exist", () => {
      const result = readDateTimeStart<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "dateTimeStart"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined if date time start value is not available", () => {
      const result = readDateTimeStart<TestEntity>(
        {
          properties: {
            // @ts-ignore
            dateTimeStart: { date: {} },
          },
        } satisfies NotionRawEntity,
        "dateTimeStart"
      );
      expect(result).toBeUndefined();
    });
  });
  describe("readDateTimeStartOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      dateTimeStart: Date;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        dateTimeStart: { date: { start: new Date("2023-01-01T00:00:00Z") } },
      },
    };

    it("should return the date time start property if it exists", () => {
      const result = readDateTimeStartOrFail<TestEntity>(
        mockEntry,
        "dateTimeStart"
      );
      expect(result).toEqual(new Date("2023-01-01T00:00:00Z"));
    });

    it("should throw an error if the date time start property does not exist", () => {
      expect(() => {
        readDateTimeStartOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "dateTimeStart"
        );
      }).toThrow('Property "dateTimeStart was undefined. abort.');
    });

    it("should throw an error if the date time start value is not available", () => {
      expect(() => {
        readDateTimeStartOrFail<TestEntity>(
          {
            properties: {
              // @ts-ignore
              dateTimeStart: { date: {} },
            },
          } satisfies NotionRawEntity,
          "dateTimeStart"
        );
      }).toThrow('Property "dateTimeStart was undefined. abort.');
    });
  });
  describe("readSingleRelation", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      singleRelation: string;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        singleRelation: { relation: [{ id: "relation-id" }] },
      },
    };

    it("should read the single relation property", () => {
      const result = readSingleRelation<TestEntity>(
        mockEntry,
        "singleRelation"
      );
      expect(result).toBe("relation-id");
    });

    it("should return undefined if single relation property does not exist", () => {
      const result = readSingleRelation<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "singleRelation"
      );
      expect(result).toBeUndefined();
    });

    it("should return undefined if single relation value is not available", () => {
      const result = readSingleRelation<TestEntity>(
        {
          properties: {
            // @ts-ignore
            singleRelation: { relation: [] },
          },
        } satisfies NotionRawEntity,
        "singleRelation"
      );
      expect(result).toBeUndefined();
    });
  });

  describe("readSingleRelationOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      singleRelation: string;
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        // @ts-ignore
        singleRelation: { relation: [{ id: "relation-id" }] },
      },
    };

    it("should return the single relation property if it exists", () => {
      const result = readSingleRelationOrFail<TestEntity>(
        mockEntry,
        "singleRelation"
      );
      expect(result).toBe("relation-id");
    });

    it("should throw an error if the single relation property does not exist", () => {
      expect(() => {
        readSingleRelationOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "singleRelation"
        );
      }).toThrow('Property "singleRelation was undefined. abort.');
    });

    it("should throw an error if the single relation value is not available", () => {
      expect(() => {
        readSingleRelationOrFail<TestEntity>(
          {
            properties: {
              // @ts-ignore
              singleRelation: { relation: [] },
            },
          } satisfies NotionRawEntity,
          "singleRelation"
        );
      }).toThrow('Property "singleRelation was undefined. abort.');
    });
  });

  describe("readRelationIdList", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      relationIdList: string[];
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        relationIdList: {
          // @ts-ignore
          relation: [{ id: "relation-id-1" }, { id: "relation-id-2" }],
        },
      },
    };

    it("should read the relation id list property", () => {
      const result = readRelationIdList<TestEntity>(
        mockEntry,
        "relationIdList"
      );
      expect(result).toEqual(["relation-id-1", "relation-id-2"]);
    });

    it("should return undefined if relation id list property does not exist", () => {
      const result = readRelationIdList<TestEntity>(
        { properties: {} } as NotionRawEntity,
        "relationIdList"
      );
      expect(result).toBeUndefined();
    });

    it("should return empty array if relation id list value is not available", () => {
      const result = readRelationIdList<TestEntity>(
        {
          properties: {
            // @ts-ignore
            relationIdList: { relation: [] },
          },
        } satisfies NotionRawEntity,
        "relationIdList"
      );
      expect(result).toEqual([]);
    });
  });
  describe("readRelationIdListOrFail", () => {
    interface TestEntity extends SimplifiedNotionEntity {
      relationIdList: string[];
    }

    const mockEntry: NotionRawEntity = {
      properties: {
        relationIdList: {
          // @ts-ignore
          relation: [{ id: "relation-id-1" }, { id: "relation-id-2" }],
        },
      },
    };

    it("should return the relation id list property if it exists", () => {
      const result = readRelationIdListOrFail<TestEntity>(
        mockEntry,
        "relationIdList"
      );
      expect(result).toEqual(["relation-id-1", "relation-id-2"]);
    });

    it("should throw an error if the relation id list property does not exist", () => {
      expect(() => {
        readRelationIdListOrFail<TestEntity>(
          { properties: {} } as NotionRawEntity,
          "relationIdList"
        );
      }).toThrow('Property "relationIdList was undefined. abort.');
    });
  });
});
