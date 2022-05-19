// prisma
import { Prisma } from '@prisma/client';

const userSearchQuery: (keyword: string) => Prisma.UserWhereInput = (
  keyword
) => {
  const separatedKeywords = keyword
    .toLowerCase()
    .split(' ')
    .filter((word) => word);

  const query: Prisma.UserWhereInput = {
    OR: separatedKeywords.map((keyword) => ({
      OR: [
        {
          email: {
            contains: keyword,
          },
        },
      ],
    })),
  };

  return query;
};

export { userSearchQuery };
