import readline from "readline-sync";
let isRunning = true;

(async () => {
  while (isRunning) {
    const input = readline.question(menu);
    switch (parseInt(input)) {
      case 1:
        await createTugas();
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
