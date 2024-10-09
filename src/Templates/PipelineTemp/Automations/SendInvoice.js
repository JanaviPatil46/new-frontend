import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Drawer,
  Button,
  Checkbox,
  Chip,
  TextField,
  IconButton,
} from '@mui/material';
import Select from 'react-select';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import makeAnimated from 'react-select/animated';

const SendInvoice = ({
    isConditionsInvoiceFormOpen,
    handleInvoiceGoBack,
    handleInvoiceAddConditions,
  selectedInvoiceTags,
  selectedInvoiceTagElements,
  invoiceTemplateOptions,
  selectedInvoiceTemplate,
  handleInvoiceTemplateChange,
  tempSelectedInvoiceTags,
  handleInvoiceCheckboxChange,
  filteredInvoiceTags,
  isAnyCheckboxInvoiceChecked,
  handleInvoiceAddTags,
  searchInvoiceTerm,
  handleInvoiceSearchChange,
}) => {
  return (
    <>
      <Box sx={{ paddingTop: '20px' }}>
        <Grid container direction="column" spacing={2}>
          <Grid item ml={2}>
            <Typography mb={1}>Select invoice template</Typography>
            <Select
              className='select-dropdown'
              placeholder="Select invoice template"
              options={invoiceTemplateOptions}
              components={makeAnimated()}
              isSearchable
              isClearable
              onChange={handleInvoiceTemplateChange}
              value={selectedInvoiceTemplate}
            />
          </Grid>

          <Grid item mt={2} ml={2}>
            {selectedInvoiceTags.length > 0 && (
              <Grid container alignItems="center" gap={1}>
                <Typography>Only for:</Typography>
                <Grid item>{selectedInvoiceTagElements}</Grid>
              </Grid>
            )}
          </Grid>

          <Grid item ml={2}>
            <Typography
              onClick={handleInvoiceAddConditions}
              sx={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold', }}
            >
              Add conditions
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Drawer
        anchor="right"
        open={isConditionsInvoiceFormOpen}
        onClose={handleInvoiceGoBack}
        PaperProps={{ sx: { width: '550px', padding: 2 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handleInvoiceGoBack}>
            <IoMdArrowRoundBack fontSize="large" color="blue" />
          </IconButton>
          <Typography variant="h6">Add conditions</Typography>
        </Box>

        <Box sx={{ padding: 2 }}>
          <Typography variant="body1">Apply automation only for accounts with these tags</Typography>
          <TextField
            fullWidth
            size='small'
            variant="outlined"
            placeholder="Search..."
            value={searchInvoiceTerm}
            onChange={handleInvoiceSearchChange}
            InputProps={{
              startAdornment: <AiOutlineSearch style={{ marginRight: 8 }} />,
            }}
            sx={{ marginTop: 2 }}
          />

          <Box sx={{ marginTop: 2 }}>
            {filteredInvoiceTags.map(tag => (
              <Box key={tag._id} sx={{ display: 'flex', alignItems: 'center', gap: 3, borderBottom: '1px solid grey', paddingBottom: 1 }}>
                <Checkbox
                  checked={tempSelectedInvoiceTags.includes(tag)}
                  onChange={() => handleInvoiceCheckboxChange(tag)}
                />
                <Chip
                  label={tag.tagName}
                  sx={{ backgroundColor: tag.tagColour, color: '#fff', fontWeight: '500', borderRadius: '20px', marginRight: 1 }}
                />
              </Box>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              disabled={!isAnyCheckboxInvoiceChecked}
              onClick={handleInvoiceAddTags}
            >
              Add
            </Button>
            <Button variant="outlined" color="primary" onClick={handleInvoiceGoBack}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default SendInvoice;
