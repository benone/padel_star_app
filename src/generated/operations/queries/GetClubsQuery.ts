import { gql } from '@apollo/client';
import { Exact } from '../types/base';

export const GetClubsDocument = gql`
    query GetClubs {
  clubs {
    id
    name
    city
    district
    description
    imagesUrls
    amenities
    rating
    reviewCount
    courts {
      id
      name
      surface
      indoor
    }
    workingHours
  }
}
    `;

export type GetClubsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetClubsQuery = { __typename?: 'Query', clubs: Array<{ __typename?: 'Club', id: string, name: string, city?: string | null, district?: string | null, description?: string | null, imagesUrls: Array<string>, amenities?: any | null, rating?: number | null, reviewCount: number, workingHours?: any | null, courts: Array<{ __typename?: 'Court', id: string, name: string, surface?: string | null, indoor: boolean }> }> };

export type GetClubQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetClubQuery = { __typename?: 'Query', club?: { __typename?: 'Club', id: string, name: string, city?: string | null, district?: string | null, country?: string | null, postalCode?: string | null, description?: string | null, imagesUrls: Array<string>, amenities?: any | null, phone?: string | null, email?: string | null, rating?: number | null, reviewCount: number, latitude?: number | null, longitude?: number | null, workingHours?: any | null, courts: Array<{ __typename?: 'Court', id: string, name: string, surface?: string | null, indoor: boolean }>, reviews: Array<{ __typename?: 'Review', id: string, rating: number, content?: string | null, createdAt: any, player: { __typename?: 'Player', id: string, name: string, avatarUrl?: string | null } }> } | null };

export type GetDefaultClubQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDefaultClubQuery = { __typename?: 'Query', defaultClub?: { __typename?: 'Club', id: string, name: string, city?: string | null, description?: string | null, imagesUrls: Array<string>, courts: Array<{ __typename?: 'Court', id: string, name: string }> } | null };

export type GetPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayersQuery = { __typename?: 'Query', players: Array<{ __typename?: 'Player', id: string, name: string, email: string, phone?: string | null, avatarUrl?: string | null, level?: number | null, levelName?: string | null, createdAt: any }> };

export type GetPlayerQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPlayerQuery = { __typename?: 'Query', player?: { __typename?: 'Player', id: string, name: string, email: string, phone?: string | null, avatarUrl?: string | null, level?: number | null, levelName?: string | null, age?: number | null, address?: string | null, createdAt: any, updatedAt: any } | null };

export type GetCurrentPlayerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentPlayerQuery = { __typename?: 'Query', currentPlayer?: { __typename?: 'Player', id: string, name: string, email: string, phone?: string | null, avatarUrl?: string | null, level?: number | null, levelName?: string | null, age?: number | null, address?: string | null, createdAt: any } | null };


export const GetClubsDocument = gql`
    query GetClubs {
  clubs {
    id
    name
    city
    district
    description
    imagesUrls
    amenities
    rating
    reviewCount
    courts {
      id
      name
      surface
      indoor
    }
    workingHours
  }
}
    `;

/**
 * __useGetClubsQuery__
 *
 * To run a query within a React component, call `useGetClubsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClubsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClubsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetClubsQuery(baseOptions?: Apollo.QueryHookOptions<GetClubsQuery, GetClubsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetClubsQuery, GetClubsQueryVariables>(GetClubsDocument, options);
      }
export function useGetClubsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetClubsQuery, GetClubsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetClubsQuery, GetClubsQueryVariables>(GetClubsDocument, options);
        }
export function useGetClubsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetClubsQuery, GetClubsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetClubsQuery, GetClubsQueryVariables>(GetClubsDocument, options);
        }
export type GetClubsQueryHookResult = ReturnType<typeof useGetClubsQuery>;
export type GetClubsLazyQueryHookResult = ReturnType<typeof useGetClubsLazyQuery>;
export type GetClubsSuspenseQueryHookResult = ReturnType<typeof useGetClubsSuspenseQuery>;
export type GetClubsQueryResult = ApolloReactCommon.QueryResult<GetClubsQuery, GetClubsQueryVariables>;
