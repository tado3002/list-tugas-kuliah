import readline from "readline-sync";
let isRunning = true;

(async () => {
  while (isRunning) {
    console.clear();
    const input = readline.question(menu);
    switch (parseInt(input)) {
      case 1:
        await createTugas();
        readline.question("");
        break;

      case 2:
        await getTugas();
        readline.question("");
        break;
      case 3:
        await deleteTugas();
        readline.question("");
        break;

      case 0:
        isRunning = false;
        break;

      default:
        break;
    }
  }
})();

import createTugas from "./CRUD/createTugas.js";
import menu from "./menu.js";
import getTugas from "./CRUD/getTugas.js";
import deleteTugas from "./CRUD/deleteTugas.js";
