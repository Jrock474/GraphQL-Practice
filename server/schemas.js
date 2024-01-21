import dotenv from "dotenv"

dotenv.config();

// This is very similar to how Sequelize set up data migrations
export const typeDefs = `#graphql

    # each type is an object that contains appropriate keys and values
    # the key can be named anything, but the value MUST be a datatype
    # the "!" means the field is required
    # only one field will be returned in GraphQL
    type User {
        id: ID!
        username: String
        email: String
        createdAt: String
    }

    type MonoData {
        health: Int!
        hunger: Int!
        cleanliness: Int!
        happiness: Int!
        exp: Int!
    } 

    type MonoStats{
        id: ID
        userID: Int
        monoData: [MonoData]
    }

    
    # entry points where users are able to view data from example: "Reviews" show all data in the Reviews object" 
    # this is REQUIRED for every schema to be able query data
    type Query{
        users: [User]
        user(id: ID!): User
        userMonoData(userID: Int!): MonoStats
    }
`

const monoDataFetch = await fetch("https://capstone-project-1cyy.vercel.app/monostats")
const monoData = await monoDataFetch.json()

const usersFetch = await fetch("https://capstone-project-1cyy.vercel.app")
const users = await usersFetch.json()

export const resolvers = {
    Query: {
        users(){
            return users
        },

        user(_, args){
            return users.find((user) => user.id == args.id)
        },

        userMonoData(_, args) {
            return monoData.find((data) => data.userID == args.userID)
        }
    }
}