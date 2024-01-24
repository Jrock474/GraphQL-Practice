import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas.js';
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
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
        // allows users to introspect graph to see schema
        introspection: true,
    });
    await apolloServer.start();
    // adjusts enpoint for server
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






