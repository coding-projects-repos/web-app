import { GraphQLInt, GraphQLNonNull } from 'graphql';
import { Users } from 'server/models';
import userType from 'server/graph/types/userType';
import paginationType from './lib/paginationType';
import paginate from './lib/paginate';

interface Args {
  count?: number;
}

export default {
  description: 'A list of users',
  type: new GraphQLNonNull(paginationType({ name: 'Users', type: userType })),
  args: {
    count: { type: GraphQLInt },
  },
  async resolve(_: any, { count }: Args) {
    return await paginate({
      model: Users,
      where: {},
      count: count || 10,
    });
  },
};
