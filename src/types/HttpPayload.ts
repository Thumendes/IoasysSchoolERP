import { User } from "@prisma/client";

export interface HttpPayload<
  Data = any,
  Params = any,
  Query = any,
  Headers = any
> {
  data: Data;
  headers: Headers;
  query: Query;
  params: Params;
  user?: User;
}
