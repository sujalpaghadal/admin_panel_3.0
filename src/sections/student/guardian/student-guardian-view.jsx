import React from 'react';

import Container from '@mui/material/Container';

import StudentGuardianDetails from './student-guardian-details';

export default function GuardianView({ currentStudent , mutate}) {

  return (
    <Container maxWidth="xl">
      <StudentGuardianDetails currentStudent={currentStudent} mutate={mutate} />
    </Container>
  );
}
