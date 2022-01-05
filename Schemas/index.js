const graphql = require('graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList } = graphql;

const userType = require('../Schemas/TypeDefs/UserType')
const userData = require('../data/MOCK_DATA.json')

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
                        gender: args.gender,
                        ip_address: args.ip_address
                    })
                return args;
            }
        }
    }
})

module.exports = new GraphQLSchema({ query: gqlquery, mutation: gqlmutation });
