import React from 'react';
import { Box } from '@mui/material';
import { ReactComponent as NotificationSvg } from '../Assets/svgs/Notification.svg';
import { ReactComponent as NoticeBoardSvg } from '../Assets/svgs/Notice_Board.svg';
import { ReactComponent as DashboardSvg } from '../Assets/svgs/Dashboard.svg';
import { ReactComponent as LiveClassesSvg } from '../Assets/svgs/Live_Classes.svg';
import { ReactComponent as ExamsSvg } from '../Assets/svgs/Exams.svg';
import { ReactComponent as StudentsSvg } from '../Assets/svgs/Students.svg';
import { ReactComponent as ResultsSvg } from '../Assets/svgs/Results.svg';
import { ReactComponent as CoursesSvg } from '../Assets/svgs/Courses.svg';
import { ReactComponent as UserSvg } from '../Assets/svgs/UserAvatar.svg';

const commonMenuItemStyle = {
  borderRadius: '10px',
  margin: 'auto',
  display: 'flex',
  gap: '18px',
  width: '240px',
  height: '40px',
  marginTop: '10px',
};

const commonTextStyle = {
  fontFamily: 'Montserrat',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#242424',
};

const viewProfileButtonStyle = {
  display: 'flex',
  width: '240px',
  height: '30px',
  padding: '4px 10px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: '0',
  borderRadius: '10px',
  border: '1.5px solid #2CA4D8',
  boxShadow: '0px 2px 20px 0px rgba(56, 181, 235, 0.20)',
  cursor: 'pointer', // Add this to indicate the button is clickable
};

const viewProfileTextStyle = {
  color: '#2CA4D8',
  textAlign: 'center',
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: 'Montserrat',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '16px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
};

const UserSection = () => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start', // Align items to the left
        marginLeft: '20px', // Add some margin to the left
      }}
    >
      <UserSvg
        style={{
          width: '48px',
          height: '48px',
          margin: '0 0 5px 0', // Adjust margins
        }}
      />
      <p
        style={{
          fontFamily: 'Montserrat',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '18px',
          color: '#242424',
          margin: '0', // Remove top margin
        }}
      >
        John Doe
      </p>
      <p
        style={{
          fontFamily: 'Montserrat',
          fontWeight: 400,
          lineHeight: '16px',
          fontSize: '12px',
          fontStyle: 'normal',
          color: '7F878A',
          margin: '0', // Remove top margin
        }}
      >
        john.doe@example.com {/* Replace with the actual user email */}
      </p>
      <br />
      <button style={viewProfileButtonStyle}>
        <span style={viewProfileTextStyle}>View Profile</span>
      </button>
    </div>
  );
};

const SchoolSpace = () => {
  return (
    <>
      <Box
        sx={{
          position: 'relative',
          width: '288px',
          height: '1024px',
          background: '#FFF',
          boxShadow:
            '0px 3px 14px 2px rgba(0, 0, 0, 0.05), 0px 8px 10px 1px rgba(0, 0, 0, 0.05), 0px 5px 5px -3px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            margin: 'auto',
            width: '80%',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '40px',
              width: '60px',
              height: '48px',
              left: '30px',
              top: '40px',
              borderRadius: '8px',
              backgroundColor: '#FFBF3F',
              marginTop: '40px',
            }}
          >
            <img
              src='../Assets/Images/badge.png'
              alt=''
              srcset=''
              style={{
                width: '21.33px',
                height: '28px%',
                marginTop: '10.67px',
                left: '5.33%',
              }}
            />
          </div>
          <div>
            <div
              style={{
                position: 'absolute',
                marginTop: '44px',
                marginLeft: '10px',
                lineHeight: '40px',
                fontFamily: 'Passion One',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '32px',
                color: '#2CA4D8',
              }}
            >
              School Space
            </div>
          </div>
        </div>{' '}
        <br />
        <hr style={{ width: '80%' }} />
        <div
          style={{
            height: 'auto',
            width: '100%',
            margin: 'auto',
          }}
        >
          {/* Dashboard */}
          <div style={commonMenuItemStyle}>
            <DashboardSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Dashboard</p>
          </div>

          {/* Courses */}
          <div style={commonMenuItemStyle}>
            <CoursesSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Courses</p>
          </div>

          {/* 
           Students 
           1. Facing some issue with opacity , so couldn't use that
          */}
          <div
            style={{
              ...commonMenuItemStyle,
              border: '2px solid #2CA4D8',
              cursor: 'pointer',
            }}
          >
            <StudentsSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p
              style={{ ...commonTextStyle, color: '#2CA4D8', fontWeight: 600 }}
            >
              Students
            </p>
          </div>

          {/* Exams */}
          <div style={commonMenuItemStyle}>
            <ExamsSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Exams</p>
          </div>

          {/* Results */}
          <div style={commonMenuItemStyle}>
            <ResultsSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Results</p>
          </div>

          {/* Notice Board */}
          <div style={commonMenuItemStyle}>
            <NoticeBoardSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Notice Board</p>
          </div>

          {/* Live Classes */}
          <div style={commonMenuItemStyle}>
            <LiveClassesSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Live Classes</p>
          </div>

          {/* Notifications */}
          <div style={commonMenuItemStyle}>
            <NotificationSvg
              style={{ width: '24px', height: '24px', margin: '14px 0 0 3px' }}
            />
            <p style={commonTextStyle}>Notifications</p>
          </div>
        </div>
        <br />
        <UserSection />
      </Box>
    </>
  );
};

export default SchoolSpace;
