import { knx } from "../config/knex";

export const createWorkersTable = async () => {
  const isExists = await knx.schema.hasTable("workers");
  try {
    if (!isExists) {
      await knx.schema.createTable("workers", (table) => {
        table.uuid("id").primary().defaultTo(knx.raw("(UUID())")); //.timestamps(true, true);
        table.string("firstName").notNullable();
        table.string("lastName").notNullable();
        table.string("middleName").notNullable();
        table.date("birthday").notNullable(); //.references("types.id");
        table.enum("sex", ["f", "m", "u"]).notNullable();
      });
      console.log("Workers Table created");
    }
  } catch (e) {
    console.log(e);
  }
};

export const createCommandsTable = async () => {
  const isExists = await knx.schema.hasTable("commands");
  if (!isExists) {
    await knx.schema.createTable("commands", (table) => {
      table.uuid("id").primary().defaultTo(knx.raw("(UUID())"));
      table.uuid("workerId").references("workers.id");
      table.uuid("commandTypesId").references("commandTypes.id");
      table.timestamp("createdAt", { precision: 6 }).defaultTo(knx.fn.now(6));
    });
    console.log("Commands Table created");
  }
};

export const createCommandTypesTable = async () => {
  const isExists = await knx.schema.hasTable("commandTypes");
  if (!isExists) {
    await knx.schema.createTable("commandTypes", (table) => {
      table.uuid("id").primary().defaultTo(knx.raw("(UUID())"));
      table.string("commandTypeName").unique();
    });
    console.log("CommandTypes Table created");
  }
};

export const createCommandTypeFields = async () => {
  const isExists = await knx.schema.hasTable("commandFields");
  if (!isExists) {
    await knx.schema.createTable("commandFields", (table) => {
      table.uuid("id").primary().defaultTo(knx.raw("(UUID())"));
      table.uuid("commandTypesId").references("commandTypes.id");
      table.string("fieldType");
      table.string("fieldName");
    });
    console.log("CommandTypesFields Table created");
  }
};

const worker = [
  {
    firstName: "Խաչիկ",
    lastName: "Պետրոսյան",
    middlename: "Վաչիկի",
    birthday: "1960.06.09",
    sex: "m",
  },
];

const types = [
  { commandTypeName: "Ընդունում" },
  { commandTypeName: "Ազատում" },
];

const command = {
  commandTypesId: "73e9430d-4e2f-11ed-b9fd-04d4c4e1dc1a",
  workerId: "801e9c9d-4e2e-11ed-b9fd-04d4c4e1dc1a",
};

const typeFields = {
  commandTypesId: "73e8672f-4e2f-11ed-b9fd-04d4c4e1dc1a",
  fieldType: "Մենեջեր",
  fieldName: "Ադմինիստրատիվ",
};

const createWorker = async () => await knx("workers").insert(worker);
const createCommandType = async () => await knx("commandTypes").insert(types);
const createCommand = async () => await knx("commands").insert(command);
const createField = async () => await knx("commandFields").insert(typeFields);

const getWorkers = async () => {
  const workers = await knx("workers")
    .join("commands", "workers.id", "=", "commands.workerId")
    .join("commandTypes", "commandTypes.id", "=", "commands.commandTypesId")
    .join("commandFields", "commandFields.commandTypesId", "=", "commandTypes.id")
    .select(
      "workers.firstName",
      "workers.lastName",
      "commandFields.fieldName",
      "commandFields.fieldType",
      "commandTypes.commandTypeName",
      "commands.createdAt"
    );
  console.log(workers);
};
