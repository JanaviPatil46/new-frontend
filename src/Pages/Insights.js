// // InsightsPage.js


// import React from 'react';
// import { Box, Grid, Paper, Typography, Container } from '@mui/material';


// const InsightsPage = () => {
//   return (
//     <Container maxWidth="lg">
//       <Box sx={{ my: 4 }}>
//         <Typography variant="h4" component="h1" gutterBottom mb={3}>
//           Insights
//         </Typography>

//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={4} p={3}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Metric 1
//               </Typography>
//               <Typography variant="body1">
//                 Some detailed information about Metric 1.
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} p={3}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Metric 1
//               </Typography>
//               <Typography variant="body1">
//                 Some detailed information about Metric 1.
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} p={3}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Metric 2
//               </Typography>
//               <Typography variant="body1">
//                 Some detailed information about Metric 2.
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4} p={3}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Typography variant="h6" gutterBottom>
//                 Metric 3
//               </Typography>
//               <Typography variant="body1">
//                 Some detailed information about Metric 3.
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>


//       </Box>
//     </Container>
//   );
// };

// export default InsightsPage;




// import React, { useEffect, useState } from 'react';
// import Switch from '@mui/material/Switch';
// import {FormControlLabel} from '@mui/material'
// const ContactInfo = () => {
//   const [contacts, setContacts] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:7000/contacts/contactaccount/66dad3dbcc207e600b53ae6d", {
//           method: "GET",
//           redirect: "follow"
//         });
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         setContacts(result); // Set the response as an array of contacts
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchContacts();
//   }, []); // Empty dependency array means this effect runs once when the component mounts

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (contacts.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Contact Information</h1>
//       {/* {contacts.map((contact) => {
//         const { email, contactName, login, notify, emailSync } = contact;

//         return (
//           <div key={contact._id} style={{ marginBottom: '20px' }}>
//             <h2>Contact ID: {contact._id}</h2>
//             <p><strong>Contact Name:</strong> {contactName}</p>
//             <p><strong>Email:</strong> {email}</p>
//             <p><strong>Login:</strong> {login ? 'true' : 'false'}</p>
//             <p><strong>Notify:</strong> {notify ? 'true' : 'false'}</p>
//             <p><strong>Email Sync:</strong> {emailSync ? 'true' : 'false'}</p>
//           </div>
//         );
//       })} */}

// {contacts.map((contact) => {
//         const { email, contactName, login, notify, emailSync } = contact;

//         return (
//           <div key={contact._id} style={{ marginBottom: '20px' }}>
//             <h2>Contact ID: {contact._id}</h2>
//             <p><strong>Contact Name:</strong> {contactName}</p>
//             <p><strong>Email:</strong> {email}</p>
//             <FormControlLabel
//               control={<Switch checked={login} />}
//               label="Login"
//             />
//             <FormControlLabel
//               control={<Switch checked={notify} />}
//               label="Notify"
//             />
//             <FormControlLabel
//               control={<Switch checked={emailSync} />}
//               label="Email Sync"
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ContactInfo;


import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];

const MyCreatableSelect = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (newValue) => {
    setSelectedOption(newValue);
  };

  return (
    <CreatableSelect
      isClearable
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Select or create an option"
    />
  );
};

export default MyCreatableSelect;
