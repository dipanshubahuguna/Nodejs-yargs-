const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const addNotes = (title,body) => {
        const Notes = loadNotes()

        const duplicate = Notes.find((note) => note.title === title)
        if(!duplicate)
        {
                Notes.push({
                    title : title,
                    body : body
                })
        
                saveNotes(Notes)
                console.log(chalk.inverse.green("Note added!"))
        }else{
            console.log(chalk.inverse.red("Title already exists!"))
        }
}

const removeNotes = (title) =>{
    const Notes = loadNotes()

    const notesToKeep = Notes.filter((note) => {
        return note.title !== title
    })

    if(notesToKeep.length < Notes.length){
        console.log(chalk.inverse.green("Note removed!"))
    }else{
        console.log(chalk.inverse.red("No Note found!"))
    }

    saveNotes(notesToKeep)
}

const listNotes = () => {
    const Notes = loadNotes()
    console.log(chalk.inverse.blue("Your notes"))

    Notes.forEach ((note) =>{
        console.log(note.title)
    })
}

const readNotes = (title) => {
    const Notes = loadNotes()

    const noteTitle = Notes.forEach ((note) => note.title === title)
        if(noteTitle){
            console.log(chalk.inverse.white(note.title))
            console.log(note.body)
        }else{
            console.log(chalk.inverse.red("No such title exists!"))
        }
}
const loadNotes = () =>  {
    try{
            const buffer = fs.readFileSync('notes.json')
            const dataStr = buffer.toString()
            return JSON.parse(dataStr)
    }catch(error){
        return []
    }
}

const saveNotes = (Notes) => {
            const DATA = JSON.stringify(Notes)
            fs.writeFileSync('notes.json',DATA)
}



module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes,
    listNotes : listNotes,
    readNotes : readNotes
}