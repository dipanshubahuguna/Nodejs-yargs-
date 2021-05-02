const fs = require('fs')
const chalk = require('chalk')

const addNotes = function(title,body) {
        const Notes = loadNotes()

        const duplicates = Notes.filter((note)=> {
            return note.title === title
        })
        if(duplicates.length == 0)
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

const removeNotes =function(title){
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

const loadNotes = function()  {
    try{
            const buffer = fs.readFileSync('notes.json')
            const dataStr = buffer.toString()
            return JSON.parse(dataStr)
    }catch(error){
        return []
    }
}

const saveNotes = function(Notes) {
            const DATA = JSON.stringify(Notes)
            fs.writeFileSync('notes.json',DATA)
}

module.exports = {
    addNotes : addNotes,
    removeNotes : removeNotes
}