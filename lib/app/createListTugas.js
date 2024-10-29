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
      await readTugas();
      readline.question("");
      break;
    case 3:
      await deleteTugas();
      readline.question("");
      break;

    case 4:
      console.log("update tugas");
      readline.question("");

    case 0:
      isRunning = false;
      break;

    default:
      break;
    }
  }
})();

import createTugas from "../CRUD/createTugas.js";
import menu from "../menu/menu.js";
import readTugas from "../CRUD/readTugas.js";
import deleteTugas from "../CRUD/deleteTugas.js";
