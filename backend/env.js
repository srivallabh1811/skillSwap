import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load backend/.env no matter which directory the server is started from
dotenv.config({ path: path.join(path.dirname(fileURLToPath(import.meta.url)), ".env"), quiet: true });
