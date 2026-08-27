import { createAuthClient } from "better-auth/react";

import { resourceManagerClient } from "@p8labs/better-auth-resource-manager/client";
import { resources } from "./resources";

export const authClient = createAuthClient({
  plugins: [resourceManagerClient({ resources })],
});
