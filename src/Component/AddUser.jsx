import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import react, { useState, useEffect } from 'react';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
} from '@mui/material';
import { addUser } from '../Service/api';
import { useNavigate } from 'react-router-dom';
import style from '../Component/Css/addUser.css';

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

export default function AddUser({ isOpen, onClose, onUpdateUsers }) {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);

  const [scoreError, setScoreError] = useState(false);

  const [classError, setClassError] = useState(false);

  const [studentNameError, setStudentNameError] = useState(false);

  let navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const [validationMessages, setValidationMessages] = useState({
    classNo: 'Please input values between 1 & 12',
    score: 'Please input values between 0 & 100',
    studentName: 'Name field cannot be left blank',
  });

  const validateClass = (value) => {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || intValue < 1 || intValue > 12) {
      setClassError(true);
      return 'Error: Please input values between 1 & 12';
    }
    return '';
  };

  const validateScore = (value) => {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || intValue < 0 || intValue > 100) {
      setScoreError(true);
      return 'Error: Please input values between 0 & 100';
    }
    return '';
  };

  const onValueChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Validate on change and update validation messages
    if (name === 'classNo') {
      setValidationMessages({
        ...validationMessages,
        classNo: validateClass(value),
      });
    } else if (name === 'score') {
      setValidationMessages({
        ...validationMessages,
        score: validateScore(value),
      });
    } else if (name === 'studentName') {
      const nameError =
        value.trim() === '' ? 'Error: Name field cannot be left blank' : '';
      setValidationMessages({
        ...validationMessages,
        studentName: nameError,
      });
      setStudentNameError(!!nameError);
    }
  };

  const [user, setUser] = useState(initialValue);
  const { studentName, classNo, score, result, grade } = user;

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
    if (+x >= 30 && +x <= 100) {
      return true;
    } else {
      return false;
    }
  };

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    // Check form validity whenever user state changes
    const isClassValid = validateClass(user.classNo) === '';
    const isScoreValid = validateScore(user.score) === '';
    const isValid = isClassValid && isScoreValid;

    setFormValid(isValid);
  }, [user.classNo, user.score]);

  const addUserDetails = async () => {
    try {
      await addUser(user);
      onClose(); // Close the modal
      onUpdateUsers(); // Update the users in the parent component
      setUser({});
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle any error, show a message, or perform other actions as needed
    }
  };

  const renderResult = () => {
    if (user.score !== '' && !isNaN(parseFloat(user.score))) {
      return passOrFail(+user.score) ? (
        <div className='pass'>Passed</div>
      ) : (
        <div className='fail'>Failed</div>
      );
    }
    return '-';
  };

  const renderGrade = () => {
    if (user.score !== '' && !isNaN(parseFloat(user.score))) {
      const scoreLevel = getScoreLevel(user.score);
      if (scoreLevel === 2) {
        return (
          <div className='ave'>
            <p style={{ color: '#2CA4D8' }}>Average</p>
          </div>
        );
      } else if (scoreLevel === 3) {
        return (
          <div className='excellent'>
            <p style={{ color: '#2CBF6E' }}>Excellent</p>
          </div>
        );
      } else if (scoreLevel) {
        return (
          <div className='poo'>
            <p style={{ color: '#F24643' }}>Poor</p>
          </div>
        );
      }
    }
    return '-';
  };

  return (
    <>
      <Modal
        keepMounted
        open={isOpen}
        onClose={onClose}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
      >
        <Container
          className='containerstyle'
          style={{
            margin: 'auto',
            backgroundColor: '#FFFFFF',
            padding: '20px',
            borderRadius: '20px',
            width: '440px',
            height: '670px',
            // left: "480px",
            left: '480px',
            marginTop: '40px',
          }}
        >
          <Typography variant='h4'>Add Student</Typography>
          <br />
          <hr style={{ width: '95%', Color: 'black' }} />
          <FormControl>
            <Typography className='input-label'>Student Name*</Typography>
            <Input
              className='input-field'
              onChange={(e) => onValueChange(e)}
              name='studentName'
              value={studentName}
              id='my-input'
              required
            />
            <Typography
              variant='caption'
              color={studentNameError ? '#F24643' : '#666A6C'}
              fontStyle='italic'
            >
              {validationMessages.studentName}
            </Typography>
          </FormControl>
          <FormControl>
            <Typography className='input-label'>Class*</Typography>
            <Input
              className='input-field'
              onChange={(e) => onValueChange(e)}
              name='classNo'
              value={classNo}
              id='my-input'
              required
            />
            <Typography
              variant='caption'
              color={classError ? '#F24643' : '#666A6C'}
              fontStyle='italic'
            >
              {validationMessages.classNo}
            </Typography>
          </FormControl>

          <FormControl>
            <Typography className='input-label'>Score*</Typography>
            <Input
              className='input-field'
              onChange={(e) => onValueChange(e)}
              name='score'
              value={score}
              id='my-input'
              required
            />
            <Typography
              variant='caption'
              color={scoreError ? '#F24643' : '#666A6C'}
              fontStyle='italic'
            >
              {validationMessages.score}
            </Typography>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='my-input'>Result</InputLabel>
            <br />
            <div style={{ border: '0px solid red' }}>
              <p style={{ border: '0px solid green', width: '70px' }}>
                {renderResult()}
              </p>
            </div>
          </FormControl>

          <FormControl>
            <InputLabel htmlFor='my-input'>Grade</InputLabel>
            <br />
            <div style={{ border: '0px solid red' }}>
              <p style={{ border: '0px solid green', width: '70px' }}>
                {renderGrade()}
              </p>
            </div>
          </FormControl>

          <div style={{ display: 'flex', marginLeft: 'auto', gap: '5px' }}>
            <Button variant='outlined' color='primary' onClick={onClose}>
              Cancel
            </Button>
            <Button
              className='button'
              variant='contained'
              color='primary'
              onClick={() => addUserDetails()}
              disabled={!formValid}
            >
              Confirm
            </Button>
          </div>
        </Container>
      </Modal>
    </>
  );
}
