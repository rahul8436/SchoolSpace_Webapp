import * as React from 'react';
import Modal from '@mui/material/Modal';
import react, { useState } from 'react';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUsers, editUser } from '../Service/api';
import { ReactComponent as EditSvg } from '../Assets/svgs/Edit.svg';

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

export default function EditUser({
  isOpen,
  onClose,
  onUpdateUsers,
  editedUser,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  let navigate = useNavigate();
  const handleClose = () => {
    navigate('/');
  };

  const [user, setUser] = useState(initialValue);
  const { studentName, classNo, score, result, grade } = user;
  const { id } = useParams();

  const xyz = (x) => {
    if (+x >= 30) {
      // console.log(x, "napass");
      return true;
    } else {
      //  console.log(x, "pass");
      return false;
    }
  };

  React.useEffect(() => {
    if (editedUser) {
      setUser(editedUser);
    }
  }, [editedUser]);

  React.useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const response = await getUsers(id);
    setUser(response.data);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const editUserDetails = async () => {
    try {
      await editUser(editedUser._id, user);
      onClose(); // Close the modal
      onUpdateUsers(); // Update the users in the parent component
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const getScoreLevel = (x) => {
    if (+x <= 30) {
      return 1;
    } else if (+x > 30 && +x <= 75) {
      return 2;
    } else if (+x > 75 && +x <= 100) {
      return 3;
    } else {
      return 0;
    }
  };

  const passOrFail = (x) => {
    if (+x >= 30) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <EditSvg
          style={{
            width: '48px',
            height: '48px',
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
          sx={style}
          style={{
            margin: 'auto',
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '20px',
            width: '480px',
            height: '500px',
            // left: "480px",
            left: '480px',
            marginTop: '50px',
          }}
        >
          <Typography variant='h4'>Edit Student</Typography>
          <FormControl>
            <InputLabel htmlFor='my-input'>Student Name</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name='studentName'
              value={studentName}
              id='my-input'
              aria-describedby='my-helper-text'
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='my-input'>Class</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name='classNo'
              value={classNo}
              id='my-input'
              aria-describedby='my-helper-text'
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='my-input'>Score</InputLabel>
            <Input
              onChange={(e) => onValueChange(e)}
              name='score'
              value={score}
              id='my-input'
              aria-describedby='my-helper-text'
            />
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='my-input'>Result</InputLabel>
            <br />
            <div style={{ border: '0px solid red' }}>
              <p style={{ border: '0px solid green', width: '70px' }}>
                {passOrFail(+user.score) ? (
                  <div className='pass'>Passed</div>
                ) : (
                  <div className='fail'>Failed</div>
                )}
              </p>
            </div>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='my-input'>Grade</InputLabel>
            <br />
            <div style={{ border: '0px solid red' }}>
              <p style={{ border: '0px solid green', width: '70px' }}>
                {getScoreLevel(user.score) === 2 ? (
                  <div className='ave'>
                    <p style={{ color: '#2CA4D8' }}>Average</p>
                  </div>
                ) : getScoreLevel(user.score) === 3 ? (
                  <div className='excellent'>
                    <p style={{ color: '#2CBF6E' }}>Excellent</p>
                  </div>
                ) : getScoreLevel(user.score) ? (
                  <div className='poo'>
                    <p style={{ color: '#F24643' }}>Poor</p>
                  </div>
                ) : null}
              </p>
            </div>
          </FormControl>
          <div style={{ display: 'flex', marginLeft: 'auto', gap: '5px' }}>
            <Button variant='outlined' color='primary' onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={editUserDetails}
            >
              Confirm
            </Button>
          </div>
        </Container>
      </Modal>
    </>
  );
}
