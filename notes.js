const fs = require('fs')
const chalk = require('chalk')

// Add note
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    } else {
        console.log('This note already exists')
    }

}

// List notes
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bgMagenta.underline('Your notes'))

    notes.forEach((note) => {
        console.log(chalk.bgCyan(note.title))
    })
}

// Read a note
const readNotes = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)

    if (findNote) {
        console.log(chalk.bgYellow(findNote.title))
        console.log(findNote.body)
    } else {
        console.log(chalk.bgRed('We dont find this note!'))
    }
}

// Remove a note
const removeNote = (title) => {
    const note = loadNotes()
    const notesToKeep = note.filter((note) => note.title !== title)

    if (note.length > notesToKeep.length) {
        console.log(chalk.bgRed("Removing the note " + title))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed.inverse("We find any note"))
    }
}

// Handling the save
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}


// Show the notes that already exists
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
