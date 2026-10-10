// EK In Memory Database
// Save ('user-1', {name, lname, })

// HashMap (Key, Value)
//        String   String

// 1 {id, fname, lname, contact: {mobile}, address: {street, pin, country}}

type UserID = string;

interface User {
    id: UserID,
    fname: string,
    lname: string | undefined,
    contact?: {
        mobile: string,
    }
    address: {
        street: string,
        pin: number,
        country: string,
    }
}

class InMemoryDB {
    private _db: Map<User['id'], User>;

    constructor () {

    }

    public insertUser (data: User) : UserID{
        if(this._db.has(data.id)) {
            throw new Error (`User with ID ${data.id} already exits`);
        }
        this._db.set(data.id, data);
        return data.id;
    }

    public updateUser (id: UserID, updateDate: Omit<User, 'id'>): boolean {
        if (!this._db.has(id)) {
            throw new Error (`User with ${id} is not present`);
        }

        this._db.set(id, {...updateDate, id});
        return true;
    }
}

const myDB = new InMemoryDB();
myDB.insertUser({
    id: '101',
    fname: 'Minsu',
    lname: 'Agra',
    address: {
        street: 'Red Chock',
        pin: 200756,
        country: 'In'
    },
    contact: {
        mobile: "6201129215"
    }
})
