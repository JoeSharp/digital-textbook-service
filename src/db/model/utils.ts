import { Schema } from "mongoose";
import { SchemaById } from "../../types";

// TODO: This seems...sub optimal
interface SetDiscriminator {
  parentSchema: Schema;
  path: string;
  schemasById: SchemaById;
}

export function setDiscriminator({
  parentSchema,
  path,
  schemasById,
}: SetDiscriminator) {
  Object.entries(schemasById)
    .map((k) => ({ system: k[0], schema: k[1] }))
    .forEach(({ system, schema }) =>
      (parentSchema.path(path) as any).discriminator(system, schema)
    );
}
