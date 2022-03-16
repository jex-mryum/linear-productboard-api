import { request, gql } from 'graphql-request';
import { env } from '../utils/environment';

const query = gql`
{
    
}
`;

request(env.productboardApiBaseUrl, query).then(data => console.log(data));

// import { GraphQLClient, gql } from 'graphql-request'

// async function main() {
//   const endpoint = 'https://api.graph.cool/simple/v1/cixos23120m0n0173veiiwrjr'

//   const graphQLClient = new GraphQLClient(endpoint, {
//     headers: {
//       authorization: 'Bearer MY_TOKEN',
//     },
//   })

//   const query = gql`
//     {
//       Movie(title: "Inception") {
//         releaseDate
//         actors {
//           name
//         }
//       }
//     }
//   `

//   const data = await graphQLClient.request(query)
//   console.log(JSON.stringify(data, undefined, 2))
// }

// main().catch((error) => console.error(error))
