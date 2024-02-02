import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Contacts from '../components/Contacts';
import { constants } from 'buffer';

function Chat() {

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined)
  
  const navigate = useNavigate();

  useEffect( () => {
    const func = async () => {
      if (!localStorage.getItem('chat-app-user')) {
        navigate("/login");
      }
      else {
        const str = localStorage.getItem('chat-app-user')
        const jsondata = JSON.parse(str)
        setCurrentUser(jsondata)
      }
    }
    func();
  }, []);

  useEffect(() => {
    const func = async() => {
      if(currentUser) {
        if (currentUser.isAvatarImageSet){
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`)
          setContacts(data.data)
        }
        else {
          navigate('/setAvatar')
        }
      }
    }

    func();
  }, [currentUser])

  return (
    <Container>
        <div className='container'>
          <Contacts contacts={constants} currentUser={currentUser}></Contacts>
        </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat