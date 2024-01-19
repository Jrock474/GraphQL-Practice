import { ApolloServer, gql } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";
import express from "express";
import cors from "cors";

const app = express();

import { typeDefs } from "../schemas.js";

const monoDataFetch = await fetch("https://capstone-project-1cyy.vercel.app/monostats")
const monoData = await monoDataFetch.json()

const usersFetch = await fetch("https://capstone-project-1cyy.vercel.app")
const users = await usersFetch.json()

app.use(cors());
app.use(express.json());

const httpServer = http.createServer(app);

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

const startApolloServer = async(app, httpServer) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app });
}

startApolloServer(app, httpServer);

export default httpServer;