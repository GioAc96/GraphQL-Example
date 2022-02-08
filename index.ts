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

const giorgio = {
  givenName: 'Giorgio',
  familyName: 'Acquati',
  yearOfBirth: 1996,
  friends: []
}

const frengo = {
  givenName: 'Francesco',
  familyName: 'Francomano',
  yearOfBirth: 1962,
  friends: []
}

giorgio.friends.push(frengo)
frengo.friends.push(giorgio)

const peopleData = [
  giorgio, frengo
]

const resolvers = {
  Query: {
    people: (parent: undefined, args: {
      givenName: string | undefined,
      familyName: string | undefined
    }) => {
      let result = peopleData

      if (args.familyName !== undefined) {
        result = result.filter(person => person.familyName === args.familyName)
      }

      if (args.givenName !== undefined) {
        result = result.filter(person => person.givenName === args.givenName)
      }

      return result
    },
  },

  Person: {
    age: parent => 2022 - parent.yearOfBirth,
    fullName: parent => `${parent.givenName} ${parent.familyName}`
  }
}

// @ts-ignore
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
