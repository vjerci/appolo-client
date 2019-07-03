import React from 'react';
import ApolloClient, {gql} from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";

const TopVideos = () => (
  <Query
    query={gql`
      {
        topVideos {
            name
            url
            length
            models {
                name
            }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.topVideos.map(({ name, url, length, models }, index) => (
        <div key={index}>
            <p> {name} - {url} - {length} - {models.map(model => model.name).join(',')}</p>
        </div>
      ));
    }}
  </Query>
);

const client = new ApolloClient({
    uri: "http://10.0.0.190:4001"
  });

function App() {
  return (
    <ApolloProvider client={client}>
        <TopVideos/>
    </ApolloProvider>
  );
}

export default App;
