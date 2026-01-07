let users=[
    { email:"leo@gmail.com",numCompte:"111", password:"123" , nom:"Leo", solde:15000,
        transactions:[
            { type:"+", description:"Salaire", amount:3000, date:"2023-01-05" },
            { type:"-", description:"Courses", amount:150, date:"2023-01-10" },
            { type:"-", description:"Loisir", amount:200, date:"2023-01-12" }
        ],
        cartes:[
            {numCarte:"c11",solde:2000},
            {numCarte:"c12",solde:3500}
        ]
     },
    { email:"lea@gmail.com",numCompte:"222", password:"321",nom:"Lamyae", solde:60000,
        transactions:[
            { type:"+", description:"Salaire", amount:20000, date:"2023-02-03" },//status success||failed
            { type:"-", description:"Voyage", amount:800, date:"2023-02-15" },
            { type:"-", description:"Restaurant", amount:120, date:"2023-02-20" }
        ],
        cartes:[
            {numCarte:"c21",solde:5000},
            {numCarte:"c22",solde:7000}
        ]
     },
     { email:"lilly@gmail.com",numCompte:"333", password:"abc", nom:"lilly",solde:16000,
        transactions:[
            { type:"-",description:"Cinéma", amount:150, date:"2023-03-10" },
            { type:"-",description:"Cadea", amount:500, date:"2023-03-15" },
            { type:"-",description:"Ikea", amount:5000, date:"2023-03-18" }
        ],
        cartes:[
            {numCarte:"c31",solde:4000},
            {numCarte:"c32",solde:6000}
        ]
     }

];

function finduser(email,password){
    let user=null;
    return user=users.find((u)=>u.email===email&&u.password===password); //u => user object
}

function findUserbyPassword(password) {
    return users.find(u => u.password === password); //u => user object
}
export{findUserbyPassword};


function findtransactions(email){
  let user =users.find((u)=>u.email===email);
  return user.transactions;
}

function finduserbyaccount(numCompte){
   return users.find((u)=>u.numCompte===numCompte);
}

export {finduser,findtransactions,finduserbyaccount};
//export {users}; DB?
