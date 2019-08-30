import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import * as express from 'express';

export default new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    example: {
      description: 'Sample mutation',
      type: new GraphQLNonNull(GraphQLString),
      args: {
        str: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_: any, args: { str: string }, req: express.Request) {
        return (
          args.str || 'no string given' + (req.user ? ', authed user' : '')
        );
      },
    },
  }),
});
