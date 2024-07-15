// JSON.stringify() - converst a js obj or val to a json string.
// ia ca input un obj si returneaza un string care reprezinta obiectul in format json
// 1. serializarea proprietatilor obiectului
// 2. manipularea tipruilor de date si a cazurilor speciale null undf
// 3. ignora functii si val nedefinite
// 4. manipularea obiectelor si a arrayurilor recursiv
// inspiratie https://gist.github.com/andrew8088/6f53af9579266d5c62c8
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// functie de serializare a diferitelor tipuri de date
// daca val e nul - returnam string 'null'
// daca e nr sau bool, facem .toString
// daca e string in punel in double quotes
// daca e array serializam recursiv fieare element si dam .join cu virgula in ]
// daca e obj serializam recursiv fiecare pereche de cheie-valoare
// returnam undefined pt tipuri de date nesuportate



function jasonStringify(value) {
    
    function serialize(obj) {
        if (obj === null) {
            return 'null';
        }
        
        if (typeof obj === 'number' || typeof obj === 'boolean') {
            return obj.toString();
        }

        if (typeof obj === 'string') {
            return '"' + obj.replace(/"/g, '\\"') + '"';
        }

        if (Array.isArray(obj)) {
            return '[' + obj.map(item => serialize(item)).join(',') + ']';
        }

        if (typeof obj === 'object') {
            let keys = Object.keys(obj);
            let keyValuePairs = keys.map(key => {
                let value = serialize(obj[key]);
                if (value !== undefined) {
                    return '"' + key + '":' + value;
                }
                return '';
            }).filter(pair => pair !== '');

            return '{' + keyValuePairs.join(',') + '}';
        }

        return undefined;
    }

    
    return serialize(value);
}


let testObj = {
    name: "Radu",
    age: 28,
    hasPatience: false,
    pets: ["Nora", "Rick", "Robert", "Red"],
    address: {
        city: "Bucharest",
        street: "Nerva Traian",
        zip: "031044",
        country: "Romania"
    },
    nullValue: null,
    undefinedValue: undefined,
    func: function() { return "hello"; }
};

console.log(jasonStringify(testObj));
console.log(JSON.stringify(testObj));