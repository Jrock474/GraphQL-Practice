// This is very similar to how Sequelize set up data migrations
export const typeDefs = `#graphql

    # each type is an object that contains appropriate keys and values
    # the key can be named anything, but the value MUST be a datatype
    # the "!" means the field is required
    type User {
        id: ID!
        username: String!
        email: String!
        createdAt: String!
    }

    type monoStats{
        id: ID!
        userID: Int!
        monoData(
            health: Int!
            hunger: Int!
            cleanliness: Int!
            happiness: Int!
            exp: Int!
        ) : Int
    }

    
    # entry points where users are able to view data from example: "Reviews" show all data in the Reviews object" 
    # this is REQUIRED for every schema to be able query data
    type Query{
        users: [User]
        monoData: monoStats
    }
`