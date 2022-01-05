const express = require('express');
const app = express();
const port = 8088;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas')
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log('server running...')
});
