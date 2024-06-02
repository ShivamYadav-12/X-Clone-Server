export const types = `#graphql
type user{
id :ID!
firstName:String!
lastName:String
email:String!
profileImageUrl:String

followers:[user]
following:[user]


tweets :[Tweet]
}
`;
