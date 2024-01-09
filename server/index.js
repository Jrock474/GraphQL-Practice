import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// types
import { typeDefs } from './schemas.js';

const monoDataFetch = await fetch("https://capstone-project-1cyy.vercel.app/monostats")
const monoData = await monoDataFetch.json()

const usersFetch = await fetch("https://capstone-project-1cyy.vercel.app")
const users = await usersFetch.json()

const resolvers = {
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

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
