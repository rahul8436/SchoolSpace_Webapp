import * as React from 'react';
import Modal from '@mui/material/Modal';
import react, { useState, useEffect } from 'react';
import { FormGroup, Button, styled, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, deleteUser } from '../Service/api';
import { ReactComponent as DeleteSvg } from '../Assets/svgs/Delete.svg';

const initialValue = {
  studentName: '',
  classNo: '',
  result: '',
  score: '',
  grade: '',
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    backgroundcolor:green;
    & > div {
        margin-top: 20px;
`;

const style = {
  backgroundColor: 'white',
};

export default function RemoveUser({
  isOpen,
  onClose,
  onUpdateUsers,
  deletedUser,
}) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  let navigate = useNavigate();

  const [user, setUser] = useState(initialValue);

  const { studentName, classNo, score, result, grade } = user;

  React.useEffect(() => {
    if (deletedUser) {
      setUser(deletedUser);
    }
  }, [deletedUser]);

  useEffect(() => {
    loadUserDetails();
  }, []);

  const deleteUserData = async (id) => {
    await deleteUser(id);
    setUser();
    navigate('/');
  };

  const deleteUserDetails = async () => {
    debugger;
    try {
      debugger;
      await deleteUser(deletedUser._id);
      onClose();
      onUpdateUsers();
    } catch (error) {
      console.error('Error deleteing user:', error);
    }
  };

  const loadUserDetails = async () => {
    const response = await getUsers(deletedUser._id);
    setUser(response.data);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <DeleteSvg
          style={{
            width: '20px',
            height: '20px',
            margin: '0 0 5px 0',
          }}
        />
      </Button>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby='edit-user-modal-title'
        aria-describedby='edit-user-modal-description'
      >
        <Container
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            width: '500px',
            margin: 'auto',
            marginTop: '40px',
            padding: '10px',
          }}
        >
          <Typography
            variant='h4'
            style={{
              margin: '10px',
              fontFamily: 'Montserrat',
              fontSize: '20px',
              fontWeight: 600,
            }}
          >
            Remove Student
          </Typography>
          <br />
          <hr style={{ width: '95%', Color: 'black' }} />
          <div
            style={{
              margin: 'auto',
              width: '500px',
              height: 'auto',
              // border: "1px solid red",
            }}
          >
            <div
              style={{
                width: '400px',
                margin: '10px',
                // border: "1px solid red",
              }}
            >
              <p
                style={{
                  fontFamily: 'Montserrat',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                Are you sure you want to remove the current student from the
                list?
              </p>
            </div>

            <>
              <div>
                <p
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    margin: '10px',
                    color: '#7F878A',
                  }}
                >
                  STUDENT NAME
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '16px',
                    margin: '10px',
                    color: '#242424',
                  }}
                >
                  {studentName}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 500,
                    fontSize: '12px',
                    lineHeight: '16px',
                    margin: '10px',
                    color: '#7F878A',
                  }}
                >
                  CLASS
                </p>
                <p
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '16px',
                    margin: '10px',
                    color: '#242424',
                  }}
                >
                  {classNo}
                </p>
              </div>
            </>
          </div>

          <br />
          <hr style={{ width: '95%', Color: 'black' }} />

          <div style={{ display: 'flex', marginLeft: 'auto', gap: '5px' }}>
            <Button variant='outlined' color='primary' onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={deleteUserDetails}
            >
              Remove
            </Button>
          </div>
        </Container>
      </Modal>
    </>
  );
}
