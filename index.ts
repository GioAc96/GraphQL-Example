import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Person {
        givenName: String
        familyName: String
        fullName: String
        yearOfBirth: Int
        age: Int
        friends: [Person!]!
    }

    type Query {
        people(givenName: String, familyName: String): [Person!]!
    }
`;

type Person = {
  givenName: string
  familyName: string
  yearOfBirth: number
  friends: Person[]
}

const giorgio: Person = {
  givenName: 'Giorgio',
  familyName: 'Acquati',
  yearOfBirth: 1996,
  friends: []
}

const frengo: Person = {
  givenName: 'Francesco',
  familyName: 'Francomano',
  yearOfBirth: 1962,
  friends: []
}


const bergo: Person = {
  givenName: 'Simone',
  familyName: 'Bergo',
  yearOfBirth: 1994,
  friends: [],
}

giorgio.friends.push(frengo)
frengo.friends.push(giorgio)

giorgio.friends.push(bergo)
bergo.friends.push(giorgio)

const peopleData = [
  giorgio, frengo, bergo
]

const resolvers = {
  Query: {
    people: (parent: undefined, args: {
      givenName: string | undefined,
      familyName: string | undefined
    }) => {
      let result = peopleData

      if (args.familyName !== undefined) {
        result = result.filter((person: Person) => person.familyName === args.familyName)
      }

      if (args.givenName !== undefined) {
        result = result.filter((person: Person) => person.givenName === args.givenName)
      }

      return result
    },
  },

  Person: {
    age: (parent: Person) => 2022 - parent.yearOfBirth,
    fullName: (parent: Person) => `${parent.givenName} ${parent.familyName}`
  }
}

// @ts-ignore
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
