const fs = require('fs');
const chalk = require('chalk');

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync('notes.json');
    const dataJSON = buffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const notesJSON = JSON.stringify(notes);

  try {
    fs.writeFileSync('notes.json', notesJSON);
  } catch (e) {
    console.log(chalk.red(`Error! ${e.message}`));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    console.log(chalk.green(`New note added!`));
  } else {
    console.log(
      chalk.red(`Note title has already taken, pls use another title!`)
    );
  }
};

const readNote = title => {
  const notes = loadNotes();

  const foundNote = notes.find(note => note.title === title);

  if (foundNote) {
    console.log(chalk.cyan(foundNote.title));
    console.log(foundNote.body);
  } else {
    console.log(chalk.red("Error! The note isn't found!"));
  }
};

const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green(`The note has been removed!`));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red(`Error! The note hasn't been removed!`));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.magenta('Your notes:'));

  notes.forEach(note => {
    console.log(note.title);
  });
};

module.exports = {
  addNote,
  removeNote,
  listNotes,
  readNote,
};
