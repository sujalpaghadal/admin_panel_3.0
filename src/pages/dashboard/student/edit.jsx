import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { StudentEditView } from 'src/sections/student/view';

// ----------------------------------------------------------------------

export default function UserEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Student Edit</title>
      </Helmet>

      <StudentEditView id={`${id}`} />
    </>
  );
}
