import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from 'src/environments/environment';
export const apolloclient = (httpLink: HttpLink) => {
  return {
    cache: new InMemoryCache({
      addTypename: false,
    }),
    link: httpLink.create({
      uri: environment.graphqlEndpoint,
    }),
  };
};
