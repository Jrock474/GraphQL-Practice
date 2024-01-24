import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas.js';
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { ApolloServerPluginLandingPageLocalDefault, ApolloServerPluginLandingPageProductionDefault } from 'apollo-server-core';
import http from "http" 

dotenv.config();

const port = 4000

const app = express();
app.use(cors())
// app.use(bodyParser.json())

app.use(cors(
    {
      origin: "*",
      methods: ["POST", "GET", "DELETE", "PUT"],
      credentials: true
    }
))

const httpServer = http.createServer(app);

let apolloServer = null;
const startServer = async () => {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            process.env.NODE_ENV === 'production'
            ?ApolloServerPluginLandingPageProductionDefault({
            graphRef: 'my-graph-id@my-graph-variant',
            footer: false,
        })
      : ApolloServerPluginLandingPageLocalDefault({ footer: false }),

        ]
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, path: "/" });
}
startServer();

app.get("/graphql", function (req, res) {
    res.redirect("/")
});

app.listen(port,  () => {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});

export default httpServer






