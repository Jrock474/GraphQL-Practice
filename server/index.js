import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas.js';
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser" 

dotenv.config();

const port = process.env.PORT 

const app = express();
app.use(bodyParser.json())
app.use(cors())

app.use(cors(
    {
      origin: "*",
      methods: ["POST", "GET", "DELETE", "PUT"],
      credentials: true
    }
  ))

let apolloServer = null;
const startServer = async () => {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}
startServer();

app.get("/", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(port,  () => {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});






