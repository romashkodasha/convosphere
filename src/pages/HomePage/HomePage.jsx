import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Button, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';

import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTopicsAction } from '../../store/actions/topics';
// import { resetTopicsState } from './store/reducers/topics';

function HomePage() {
    const { topics, getTopicsStatus } = useSelector((store) => store.topicsReducer)
    const dispatch = useDispatch();
    const [selectedTopic, setSelectedTopic] = useState(null);
    useEffect(() => {
        if (getTopicsStatus === 'initial')
            dispatch(getTopicsAction());
    }, [getTopicsStatus, dispatch]);

    // const handleTopicClick = (topicId) => {
    //   setSelectedTopic(topicId);
    //   dispatch(filterMessagesByTopic(topicId));
    // };
    return (
        <div>
            <nav>
                <div id="logo">
                    <Link to="/" className='link'>
                        convosphere
                    </Link>
                </div>
                <div className="search-container">
                    <div className="search-icon"><SearchIcon /></div>
                    <InputBase placeholder="Найти..." />
                </div>
                <Button component={Link} to="/register" variant="contained" color="inherit" id="reg-button">
                    Регистрация
                </Button>
                <Button component={Link} to="/login" variant="contained" color="inherit">
                    Вход
                </Button>
            </nav>


            <Drawer
                open={true}
                variant='permanent'
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 320,
                        marginTop: 13,
                    },
                }}
            >
                <List>
                    {topics.map((topic) => (
                        <ListItem
                            button
                            key={topic.topic_id}
                            // onClick={() => handleTopicClick(topic.topic_id)}
                            selected={selectedTopic === topic.topic_id}
                        >
                            <ListItemText primary={topic.name} />
                        </ListItem>
                    ))}

                </List>
            </Drawer>
        </div>

    );
}

export default HomePage;
