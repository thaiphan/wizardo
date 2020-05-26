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
    "https://master-7rqtwti-xwabby2q4kkhe.au.platformsh.site/graphql",
    {
      method: "POST",
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
      __typename: string;
      title: string;
    };
  };
}

export const getRouteBySlug = async (
  slug: string
): Promise<GetRouteBySlugResponse> => {
  const response = await fetch(
    "https://master-7rqtwti-xwabby2q4kkhe.au.platformsh.site/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: `
          query {
            route(path: "${slug}") {
              __typename
              title
            }
          }
        `,
      }),
    }
  );

  return response.json();
};
