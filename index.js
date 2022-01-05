const express = require('express');
const app = express();
const port = 8088;
const userData = require('./data/MOCK_DATA.json');
const graphql= require('graphql');
const  { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } =graphql;
const { graphqlHTTP } = require('express-graphql');
const { type } = require('express/lib/response');

const userType = new GraphQLObjectType({
    name: 'user',
    fields: () => ({
        id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        ip_address: { type: GraphQLString }
    })
})

const gqlquery = new GraphQLObjectType({
    name: 'rootquerytype',
    fields: {
        getAllUsers: {
            type: new GraphQLList(userType),
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                return userData;
            }
        }
    }
})
const gqlmutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: userType,
            args: {
                first_name: { type: GraphQLString },
                last_name: { type: GraphQLString },
                email: { type: GraphQLString },
                gender: { type: GraphQLString },
                ip_address: { type: GraphQLString }
            },
            resolve(parent, args) {
                userData.push(
                    {
                        id: userData.length + 1,
                        first_name: args.first_name,
                        last_name: args.last_name,
                        email: args.email,
                        gender:args.gender,
                        ip_address:args.ip_address
                    })
                    return args;
            }
        }
    }
})

const schema = new GraphQLSchema({ query: gqlquery, mutation: gqlmutation });

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(port, () => {
    console.log('server running...')
});
