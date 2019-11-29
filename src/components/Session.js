import React from 'react';
import {Query} from 'react-apollo';
import { Usuario_Actual } from '../queries';

const Session = Component => props => (
    <Query query={Usuario_Actual}>
        {({loading, error, data, refetch}) => { 
            if(loading) return null;
            return <Component {...props} refetch={refetch} session={data} />
        }}
    </Query>
)

export default Session;