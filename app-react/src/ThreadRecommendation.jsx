import React from 'react';
import ThreadList from './ThreadList';

import { useState } from 'react';


export const RecommandationQueryType = {
    MOSTRECENT: "By-most-recent",
};

function ThreadRecommendation(props) {
    const [queryType, setQueryType] = useState(props.query)
    const [displayCount, setDisplayCount] = useState(50)
    const user = props.user;
    const setDisplay = props.setDisplay;


    const getRecommandationsFromDB = () => {
        axios.get(`${GetUrl()}/threads/recommandation`, {queryType : queryType, count : displayCount}).then((response) => {
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log(response.message);
            }
        }).catch(err => {
            console.error(err);
        });
        return null;
    }

    const setListForClient = () => {
        const recommendations = getRecommandationsFromDB();
        if (recommendations != null) {
            setRecommandations(recommendations)
        }
        else {
            console.log(`Error while  accessing messages of thread (id : ${props.id}). Check console for errors`)
        }
    }

    const [recommandations, setRecommandations] = useState(null);
    return (
        <div className="thread-recommandation-container">
            <ThreadList threads={recommandations} setDisplay={setDisplay} />
        </div>);
}

export default {ThreadRecommendation, RecommandationQueryType};
