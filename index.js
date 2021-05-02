const fs = require('fs')
const yargs = require('yargs')
const Notes = require('./notes')

yargs.command({
    command : 'add',
    describe : 'Adding a Note!',
    builder : {
        title : {
            describe : 'note title',
            demandOption : true,
            type : 'string'
        },
        body : {
            describe : 'note body',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        Notes.addNotes(argv.title,argv.body)
    }
})

yargs.command({
    command : 'remove',
    describe : 'Removing a Note',
    builder : {
        title :{
            describe : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        Notes.removeNotes(argv.title)
    }
})

yargs.command({
    command : 'list',
    describe : 'List all Notes',
    handler() {
        Notes.listNotes()
    }
})
yargs.command({
    command : 'read',
    describe : 'Read notes',
    builder : {
        title :{
            describe : 'note title',
            demandOption : true,
            type : 'string'
        }
    },
    handler(argv) {
        Notes.readNotes(argv.title)
    }
})

console.log(yargs.argv)