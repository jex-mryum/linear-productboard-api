import { request, gql } from 'graphql-request';
import { env } from '../utils/environment';

const query = gql`
{
    
}
`;

request(env.productboardApiBaseUrl, query).then(data => console.log(data));
