import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './schemas.js';
import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config();

const port = process.env.PORT 

const app = express();
app.use(cors())

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

app.get("/rest", function (req, res) {
    res.json({ data: "api working" });
});

app.listen(port, function () {
    console.log(`server running on port 4000`);
    console.log(`gql path is ${apolloServer.graphqlPath}`);
});






