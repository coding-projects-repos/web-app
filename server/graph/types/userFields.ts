import { GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';
import { Users } from 'server/models';

export default {
  id: {
    type: new GraphQLNonNull(GraphQLInt),
    resolve: (user: any) => user.id,
  },
  email: {
    type: new GraphQLNonNull(GraphQLString),
    resolve: (user: Users) => user.email,
  },
  username: {
    type: new GraphQLNonNull(GraphQLString),
    resolve: (user: Users) => user.username,
  },
};
