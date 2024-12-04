import { Server } from "http";
import app from "./app";
import config from "./app/config";

const port = process.env.PORT || config.port;

async function main() {
  try {
    const server: Server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

main();
