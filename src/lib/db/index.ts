import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { DATABASE_URL } from "$env/static/private";

neonConfig.fetchConnectionCache = true;

import * as schema from "./schema/schema";

const sql = neon(DATABASE_URL);
export const db = drizzle(sql, { schema });
