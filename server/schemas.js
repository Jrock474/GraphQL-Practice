// This is very similar to how Sequelize set up data migrations
export const typeDefs = `#graphql

    # each type is an object that contains appropriate keys and values
    # the key can be named anything, but the value MUST be a datatype
    # the "!" means the field is required
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
    }

    type Review{
        id: ID!
        rating: Int!
        content: String!
    }
    type Author {
        id: ID!
        name: String!
    }
    
    # entry points where users are able to view data from example: "Reviews" show all data in the Reviews object" 
    # this is REQUIRED for every schema to be able query data
    type Query{
        reviews: [Review]
        games: [Game]
        authors: [Author]
    }
`