import { GraphQLObjectType } from 'graphql';
import currentUser from './currentUser';
import users from './users';

// turned strict function types in tsconfig off because: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/21359

export default new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    currentUser,
    users,
  }),
});
