import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableCell,
  Paper,
  TableRow,
  TableBody,
  Button,
  styled,
  Box,
  Modal,
} from '@mui/material';
import { getUsers, deleteUser, addUser } from '../Service/api';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import SchoolSpace from './SchoolSpace';
import EditUser from './EditUser';
import AddUser from './AddUser';
import RemoveUser from './RemoveUser';
import { ReactComponent as EditSvg } from '../Assets/svgs/Edit.svg';
import { ReactComponent as DeleteSvg } from '../Assets/svgs/Delete.svg';
import style from '../Component/Css/allUser.css';

const StyledTable = styled(Table)`
  width: 100%;
`;

const THead = styled(TableRow)`
  & > th {
    font-size: 14px;
    font-family: Montserrat;
    background: #f1f4f8;
    font-weight: 500;
    line-height: '18px';
  }
`;

const TRow = styled(TableRow)`
  & > td {
    font-size: 14px;
    font-family: Montserrat;
    background: white;
    color: #242424;
    font-weight: 400;
    line-height: '18px';
  }
  &:hover > td {
    background-color: #f1f4f8;
    cursor: pointer;
  }
`;

const TableContainer = styled('div')({
  width: '1104px',
  height: '854px',
  flexShrink: 0,
  borderRadius: '10px',
  border: '1px solid #E2E5EB',
  background: '#FFF',
  overflow: 'hidden',
  margin: '15px auto', // Adjust margin as needed
});

const PageInfo = styled('p')({
  bottom: 0,
  left: 0,
  margin: '10px',
  color: '#242424',
  fontFamily: 'Montserrat',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '16px',
  textAlign: 'left',
});

const Boxone = styled('div')({
  backgroundColor: 'white',
  height: 'auto',
  width: '100%',
});

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const [hoveredRow, setHoveredRow] = useState(null);

  // Event handlers to update hover state
  const handleRowMouseEnter = (index) => {
    setHoveredRow(index);
  };

  const handleRowMouseLeave = () => {
    setHoveredRow(null);
  };

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const openEditModal = (user) => {
    setEditedUser(user);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditedUser(null);
    setEditModalOpen(false);
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletedUser, setDeletedUser] = useState(null);

  const openDeleteModal = (user) => {
    setDeletedUser(user);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeletedUser(null);
    setDeleteModalOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const loaderstyle = {
    position: 'absolute',
    left: '50%',
    top: '35%',
  };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const updateUsers = async () => {
    await getAllUsers();
  };

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
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

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex' }}>
          <SchoolSpace />

          <Box style={{ width: '80%', margin: '15px' }}>
            <Boxone
              variant='contained'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    position: 'absolute',
                    left: '312px',
                    fontFamily: 'Montserrat',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    fontSize: '20px',
                    color: '#242424',
                  }}
                >
                  Students
                </div>
              </div>

              <Button
                onClick={() => setModalOpen(true)}
                style={{
                  color: 'white',
                  width: '110px',
                  height: '42px',
                  backgroundColor: '#2CA4D8',
                  boxShadow: '0px 2px 20px rgba(56, 181, 235, 0.2)',
                  borderRadius: '10px',
                  textAlign: 'center',
                  marginBottom: '5px',
                  cursor: 'pointer !important',
                }}
              >
                + Add
              </Button>
              <AddUser
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onUpdateUsers={updateUsers}
              />
            </Boxone>
            <TableContainer>
              <StyledTable>
                <TableHead
                  style={{
                    width: '10%',
                    color: 'black',
                    backGroundColor: 'white',
                  }}
                >
                  <THead>
                    <TableCell style={{ width: '10%' }}>No</TableCell>
                    <TableCell style={{ width: '30%' }}>Student Name</TableCell>
                    <TableCell style={{ width: '30%' }}>Class</TableCell>
                    <TableCell style={{ width: '30%' }}>Result</TableCell>
                    <TableCell style={{ width: '30%' }}>Score</TableCell>
                    <TableCell style={{ width: '30%' }}>Grade</TableCell>
                    <TableCell style={{ width: '30%' }}></TableCell>
                  </THead>
                </TableHead>

                <TableBody>
                  {currentUsers.map((user, index) => (
                    <TRow
                      key={user.id}
                      onMouseEnter={() => handleRowMouseEnter(index)}
                      onMouseLeave={handleRowMouseLeave}
                    >
                      <TableCell style={{ width: '10%' }}>
                        {(currentPage - 1) * usersPerPage + index + 1}
                      </TableCell>
                      <TableCell>{user.studentName}</TableCell>
                      <TableCell>{user.classNo}th</TableCell>
                      <TableCell>
                        <div style={{ border: '0px solid red' }}>
                          <p
                            style={{
                              border: '0px solid green',
                              width: '70px',
                            }}
                          >
                            {passOrFail(+user.score) ? (
                              <div className='pass'>Passed</div>
                            ) : (
                              <div className='fail'>Failed</div>
                            )}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{user.score}/100</TableCell>
                      <TableCell>
                        <div style={{ border: '0px solid red' }}>
                          <p
                            style={{
                              border: '0px solid green',
                              width: '70px',
                            }}
                          >
                            {getScoreLevel(user.score) === 2 ? (
                              <div className='average'>
                                <p style={{ color: '#2CA4D8' }}>Average</p>
                              </div>
                            ) : getScoreLevel(user.score) === 1 ? (
                              <div className='poor'>
                                <p style={{ color: '#F24643' }}>Poor</p>
                              </div>
                            ) : getScoreLevel(user.score) === 3 ? (
                              <div className='excellent'>
                                <p style={{ color: '#2CBF6E' }}>Excellent</p>
                              </div>
                            ) : null}
                          </p>
                        </div>
                      </TableCell>

                      <TableCell>
                        {hoveredRow === index && ( // Only render when row is hovered
                          <>
                            {user.grade}
                            <div style={{ display: 'flex', gap: 'px' }}>
                              <Button onClick={() => openEditModal(user)}>
                                <EditSvg
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    margin: '0 0 5px 0',
                                  }}
                                />
                              </Button>
                              <Button onClick={() => openDeleteModal(user)}>
                                <DeleteSvg
                                  style={{
                                    width: '20px',
                                    height: '20px',
                                    margin: '0 0 5px 0',
                                  }}
                                />
                              </Button>
                            </div>
                          </>
                        )}
                      </TableCell>
                    </TRow>
                  ))}
                </TableBody>
              </StyledTable>
              <Pagination
                count={Math.ceil(users.length / usersPerPage)}
                page={currentPage}
                onChange={(event, page) => paginate(page)}
                style={{ marginTop: '10px', alignSelf: 'flex-end' }}
              />
            </TableContainer>
            <PageInfo>
              Showing {''}
              {Math.min(indexOfLastUser, users.length)} of {users.length}{' '}
              Entries
            </PageInfo>
          </Box>
        </Box>
      </Box>
      {editedUser && (
        <EditUser
          isOpen={editModalOpen}
          onClose={closeEditModal}
          onUpdateUsers={updateUsers}
          editedUser={editedUser}
        />
      )}
      {deletedUser && (
        <RemoveUser
          isOpen={deleteModalOpen}
          onClose={closeDeleteModal}
          onUpdateUsers={updateUsers}
          deletedUser={deletedUser}
        />
      )}
    </>
  );
};

export default AllUsers;
