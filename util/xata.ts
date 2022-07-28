import {
  BaseClientOptions,
  buildClient,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "items",
    columns: [
      { name: "label", type: "string" },
      { name: "is_done", type: "bool" },
      { name: "user", type: "link", link: { table: "users" } },
    ],
  },
  {
    name: "users",
    columns: [
      { name: "username", type: "string" },
      { name: "password", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type DatabaseSchema = SchemaInference<SchemaTables>;

export type Items = DatabaseSchema["items"];
export type ItemsRecord = Items & XataRecord;

export type Users = DatabaseSchema["users"];
export type UsersRecord = Users & XataRecord;

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://acme-inc-lola3g.xata.sh/db/todo-app",
};

export class XataClient extends DatabaseClient<SchemaTables> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;
export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
