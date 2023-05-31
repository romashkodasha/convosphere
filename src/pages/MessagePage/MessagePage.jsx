import { Link } from 'react-router-dom';
import { Button, InputBase } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import React from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTopicsAction } from '../../store/actions/topics';
import { tokenRefreshAction } from '../../store/actions/token';
import { getMessagesAction, postMessagesAction } from '../../store/actions/messages';
import { getUsersAction } from '../../store/actions/users';
import MessageCard from '../../components/MessageCard/MessageCard';
import { useParams } from 'react-router-dom';
import createWebSocket from '../../websocket';







import jwtDecode from 'jwt-decode';

function decodeToken(tokenAccess) {
    return jwtDecode(tokenAccess);
}

function mapMessagesToUsernames(messages, users) {
    if (!messages) {
        return [];
    }
    if (!users) {
        return [];
    }

    return messages.map((message) => {
        const senderId = message.sender;
        const matchingUser = users.find((user) => user.id === senderId);
        const username = matchingUser ? matchingUser.username : 'Unknown User';

        return { ...message, username };
    });
}

function filterMessagesByParentId(messages, id) {
    if (!messages) {
        return [];
    }
    return messages.filter((message) => message.parent === id);
}
function findMessageById(messages, id) {
    if (!messages) {
        return [];
    }
    return messages.find((message) => message.id == id);
}


function MessagePage() {
    const dispatch = useDispatch();
    const { topics, getTopicsStatus } = useSelector((store) => store.topicsReducer);
    const { messages, getMessagesStatus } = useSelector((store) => store.messagesReducer);
    const { users, getUsersStatus } = useSelector((store) => store.usersReducer);
    const [open, setOpen] = useState(false);
    const [messageText, setMessageText] = useState('');
    const [messagesWS, setMessagesWS] = useState([]);
    let { id } = useParams();

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = createWebSocket(setMessagesWS);
        setSocket(newSocket);
        // newSocket.addEventListener('open', () => {
        //     newSocket.send(JSON.stringify({ event: 'get_msg' }));
        // });

        // // Очистка при размонтировании компонента
        return () => {
            newSocket.close();
        };
    }, []);







    const tokenAccess = localStorage.getItem('tokenAccess');
    const tokenRefresh = localStorage.getItem('tokenRefresh');


    const [selectedTopic, setSelectedTopic] = useState(null);
    console.log(messagesWS)


    useEffect(() => {
        if (getTopicsStatus === 'initial')
            dispatch(getTopicsAction());
    }, [getTopicsStatus, dispatch]);

    useEffect(() => {
        if (getMessagesStatus === 'initial')
            dispatch(getMessagesAction());
    }, [getMessagesStatus, dispatch]);


    useEffect(() => {
        if (getUsersStatus === 'initial')
            dispatch(getUsersAction());
    }, [getUsersStatus, dispatch]);

    const messagesWithUsernames = mapMessagesToUsernames(messages, users);
    console.log(messagesWithUsernames);
    const foundMessage = findMessageById(messagesWithUsernames, id);
    const newArrayMessages = [foundMessage, ...filterMessagesByParentId(messagesWithUsernames, id)];

    console.log(foundMessage)


    const isTokenValid = () => {
        if (!tokenAccess) {
            // Токен отсутствует, считаем его недействительным
            return false;
        }
        const decodedToken = decodeToken(tokenAccess);
        // Получение текущего времени в секундах
        const currentTime = Math.floor(Date.now() / 1000);

        if (decodedToken.exp < currentTime) {
            // Срок действия токена истек
            return false;
        }
        // Токен действителен
        return true;
    };


    useEffect(() => {
        if (!isTokenValid() && tokenAccess) {
            dispatch(tokenRefreshAction({
                refresh: tokenRefresh
            }));
        }
    }, [dispatch, tokenAccess]);

    const handleLogout = () => {
        localStorage.removeItem('tokenAccess');
        localStorage.removeItem('tokenRefresh');
        window.location.reload();

    };




    const handleTopicClick = (topicId) => {

    };
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
                {isTokenValid() ? (<Button component={Link} to="/" variant="contained" color="inherit" onClick={handleLogout} id="logout-button">
                    Выход
                </Button>) : (

                    <div className='log-reg-buttons'>
                        <Button component={Link} to="/register" variant="contained" color="inherit" id="reg-button">
                            Регистрация
                        </Button>
                        <Button component={Link} to="/login" variant="contained" color="inherit">
                            Вход
                        </Button>
                    </div>
                )}

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
                            onClick={() => handleTopicClick(topic.topic_id)}
                            selected={selectedTopic === topic.topic_id}
                        >
                            <ListItemText primary={topic.name} />
                        </ListItem>
                    ))}

                </List>
            </Drawer>

            <Container className="messages-container">
                <Row xs={4} md={4} className="g-4">
                    {newArrayMessages.map((item, index) => {
                        return (
                            <Col key={index}>
                                <MessageCard socket={socket} {...item} />
                            </Col>
                        )
                    })}
                </Row>
                <Row xs={4} md={4} className="g-4">
                    {messagesWS.map((item, index) => {
                        return (
                            <Col key={index}>
                                <MessageCard socket={socket} {...item} />
                            </Col>
                        )
                    })}
                </Row>
            </Container>



        </div>

    );
}

export default MessagePage;
