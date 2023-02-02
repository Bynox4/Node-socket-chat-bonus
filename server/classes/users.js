

class Users {

    constructor(){
        this.persons = [];

    }

    addPerson( id, name, room ){
        this.persons.push({ id, name, room })

        return this.persons;
    }

    getPerson( id ) {
        const person = this.persons.find( p =>  p.id === id);

        return person;
    }

    getpersons(){
        return this.persons;
    }

    getPersonForRoom( room ) {
        return this.persons.filter( p => p.room === room );
    }

    deletePerson( id ) {
        const personRemoved = this.getPerson( id );
        this.persons = this.persons.filter( p =>  p.id != id );

        return personRemoved;
    }
}

module.exports = {
    Users
}