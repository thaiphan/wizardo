interface GetHomePageDataResponse {
  data: {
    routes: {
      items: {
        url: string;
      }[];
    };
    languages: {
      id: string;
      name: string;
    }[];
  };
}

export const getHomePageData = async (): Promise<GetHomePageDataResponse> => {
  const response = await fetch(
    'https://master-7rqtwti-xwabby2q4kkhe.au.platformsh.site/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            routes(bundles: ["page", "article"]) {
              items {
                url
              }
            }
            languages {
              id
              name
            }
          }
        `,
      }),
    }
  );

  return response.json();
};
interface GetRoutesResponse {
  data: {
    routes: {
      items: {
        url: string;
      }[];
    };
  };
}

export const getRoutes = async (): Promise<GetRoutesResponse> => {
  const response = await fetch(
    'https://master-7rqtwti-xwabby2q4kkhe.au.platformsh.site/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            routes(bundles: ["page", "article"]) {
              items {
                url
              }
            }
          }
        `,
      }),
    }
  );

  return response.json();
};

interface GetRouteBySlugResponse {
  data: {
    route: {
      title: string;
      description: string;
    };
    languages: {
      id: string;
      name: string;
    }[];
  };
}

export const getPageData = async (
  slug: string
): Promise<GetRouteBySlugResponse> => {
  const response = await fetch(
    'https://master-7rqtwti-xwabby2q4kkhe.au.platformsh.site/graphql',
    {
      method: 'POST',
      body: JSON.stringify({
        query: `
          query {
            route(path: "${slug}") {
              title
              description
            }
            languages {
              id
              name
            }
          }
        `,
      }),
    }
  );

  return response.json();
};
