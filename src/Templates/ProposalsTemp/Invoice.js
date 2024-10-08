import { Checkbox, Box, Button, Typography, Autocomplete, InputAdornment, TextField, InputLabel, ListItem, List, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { CiDiscount1 } from 'react-icons/ci';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RiCloseLine } from 'react-icons/ri';
import CreatableSelect from 'react-select/creatable';
import Editor from '../Texteditor/Editor';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
const Invoice = ({ charLimit = 4000 }) => {

    
    //get all templateName Record 
    const SERVICE_API = process.env.REACT_APP_SERVICES_URL
    const INVOICE_API = process.env.REACT_APP_INVOICE_TEMP_URL
    const [invoiceTemplates, setInvoiceTemplates] = useState([]);
    const [description, setDescription] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [clientNote, setClientNote] = useState('');
    const handleEditorChange = (content) => {
        setClientNote(content);
    };
    const [servicedata, setServiceData] = useState([]);
    // add row
    const [rows, setRows] = useState([
        { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false }
    ]);
    const addRow = (isDiscountRow = false) => {
        const newRow = isDiscountRow
            ? { productName: '', description: '', rate: '$-10.00', qty: '1', amount: '$-10.00', tax: false, isDiscount: true }
            : { productName: '', description: '', rate: '$0.00', qty: '1', amount: '$0.00', tax: false, isDiscount: false };
        setRows([...rows, newRow]);
    };
    const deleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };


    const handleChange = (event) => {
        const value = event.target.value;
        if (value.length <= charLimit) {
            setDescription(value);
            setCharCount(value.length);
        }
    };
    const fetchInvoiceTemplates = async () => {
        try {

            const url = `${INVOICE_API}/workflow/invoicetemp/invoicetemplate`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch InvoiceTemplate');
            }
            const data = await response.json();
            setInvoiceTemplates(data.invoiceTemplate);
            console.log(data);
        } catch (error) {
            console.error('Error fetching Invoice Templates:', error);
        }
    };

    useEffect(() => {
        fetchInvoiceTemplates();
    }, []);

    const invoiceoptions = invoiceTemplates.map((invoice) => ({
        value: invoice._id,
        label: invoice.templatename,
    }));

    const [selectInvoiceTemp, setSelectedInvoiceTemp] = useState('');
    const handleInvoiceTempChange = (event, selectedOptions) => {
        setSelectedInvoiceTemp(selectedOptions);
        fetchinvoicetempbyid(selectedOptions.value);
    };

    const fetchinvoicetempbyid = async (id) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${INVOICE_API}/workflow/invoicetemp/invoicetemplate/${id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.invoiceTemplate)
                setDescription(result.invoiceTemplate.description)
                setClientNote(result.invoiceTemplate.clientNote)
                const lineitems = result.invoiceTemplate.lineItems.map(item => ({
                    productName: item.productorService || '',
                    description: item.description || '',
                    rate: String(item.rate || '$0.00'), // Convert rate to string
                    qty: String(item.quantity || '1'), // Convert qty to string
                    amount: String(item.amount || '$0.00'), // Convert amount to string
                    tax: item.tax || false,
                    isDiscount: item.isDiscount || false
                }));
                setRows(lineitems);

                if (result.invoiceTemplate.summary && result.invoiceTemplate.summary.taxRate) {
                    setTaxRate(result.invoiceTemplate.summary.taxRate);
                    console.log(result.invoiceTemplate.summary.taxRate)
                }
            })
            .catch((error) => console.error(error));
    }
    // services data
    useEffect(() => {
        fetchServiceData();
    }, []);
    const fetchServiceData = async () => {
        try {
            const url = `${SERVICE_API}/workflow/services/servicetemplate`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data.serviceTemplate)
            setServiceData(data.serviceTemplate);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const serviceoptions = servicedata.map((service) => ({
        value: service._id,
        label: service.serviceName,
    }));
    const [selectedservice, setselectedService] = useState();
    const fetchservicebyid = async (id, rowIndex) => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };
        const url = `${SERVICE_API}/workflow/services/servicetemplate/${id}`;
        fetch(url, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result.serviceTemplate);

                const service = Array.isArray(result.serviceTemplate) ? result.serviceTemplate[0] : result.serviceTemplate;
                // const rate = typeof service.rate === 'number' ? service.rate : 0;
                const rate = service.rate ? parseFloat(service.rate.replace('$', '')) : 0;
                const updatedRow = {
                    productName: service.serviceName || '', // Assuming serviceName corresponds to productName
                    description: service.description || '',
                    // rate: service.rate ? `$${rate.toFixed(2)} ` : '$0.00',
                    rate: `$${rate.toFixed(2)}`,
                    qty: '1', // Default quantity is 1
                    amount: `$${rate.toFixed(2)}`,
                    // amount: service.rate ? `$${service.rate.toFixed(2)}` : '$0.00', // Assuming amount is calculated as rate
                    tax: service.tax || false,
                    isDiscount: false // Default value if not present in the service object
                };

                const updatedRows = [...rows];
                updatedRows[rowIndex] = { ...updatedRows[rowIndex], ...updatedRow };

                console.log(updatedRows);
                setRows(updatedRows);
            })
            .catch((error) => console.error(error));
    }

    const handleServiceChange = (index, selectedOptions) => {
        setselectedService(selectedOptions);
        fetchservicebyid(selectedOptions.value, index);
    };
    const handleServiceInputChange = (inputValue, actionMeta, index) => {
        if (actionMeta.action === 'input-change') {
            const newRows = [...rows];
            newRows[index].productName = inputValue;
            setRows(newRows);
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        const newRows = [...rows];

        if (name === 'rate' || name === 'qty') {
            newRows[index][name] = newValue;

            const rate = parseFloat(newRows[index].rate.replace('$', '')) || 0;
            const qty = parseInt(newRows[index].qty) || 0;
            const amount = (rate * qty).toFixed(2);
            newRows[index].amount = `$${amount}`;
        } else {
            newRows[index][name] = newValue;
        }

        setRows(newRows);
    };

    const [subtotal, setSubtotal] = useState('');
    const [taxRate, setTaxRate] = useState(0);
    const [taxTotal, setTaxTotal] = useState(0);

    const handleSubtotalChange = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setSubtotal(value);
        calculateTotal(value, taxRate);
    };

    const handleTaxRateChange = (event) => {
        const value = parseFloat(event.target.value) || 0;
        setTaxRate(value);
        calculateTotal(subtotal, value);
    };

    const calculateTotal = (subtotal, taxRate) => {
        const tax = subtotal * (taxRate / 100);
        setTaxTotal(tax);
        setTotalAmount((subtotal + tax).toFixed(2));
    };
    useEffect(() => {
        const calculateSubtotal = () => {
            let subtotal = 0;

            rows.forEach(row => {

                subtotal += parseFloat(row.amount.replace('$', '')) || 0;

            });
            console.log(subtotal)
            setSubtotal(subtotal);
            calculateTotal(subtotal, taxRate);
        };
        calculateSubtotal();
    }, [rows]);

    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    const invoiceissueoptions = ['on acceptance', 'specific date']
    const [issueInvoice, setIssueInvoice] = useState('on acceptance');
    const [dateTimeValue, setDateTimeValue] = useState(null);

    const handleIssueChange = (event, newValue) => {
        setIssueInvoice(newValue);
        // Reset dateTimeValue when switching back to "on acceptance"
        if (newValue === 'on acceptance') {
            setDateTimeValue(null);
        }
    };

    const [startDate, setStartDate] = useState(null);
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };
    const timeOptions = Array.from({ length: 13 }, (_, i) => {
        const hour = i === 0 ? 12 : i; // 12 AM for 0, otherwise use i
        const ampm = i < 12 ? 'AM' : 'PM';
        return `${hour}:00 ${ampm}`;
    });
    const [selectedTime, setSelectedTime] = useState(null);
    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                    <Typography variant='h5'>Invoice</Typography>
                    <Box border={'1px solid red'} padding={2}>
                        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid xs={6}>
                                <Box>
                                    <InputLabel sx={{ color: 'black' }}>Invoice Template</InputLabel>
                                    <Autocomplete

                                        options={invoiceoptions}
                                        sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }}
                                        size='small'
                                        value={selectInvoiceTemp}
                                        onChange={handleInvoiceTempChange}
                                        isOptionEqualToValue={(option, value) => option.value === value.value}
                                        getOptionLabel={(option) => option.label || ""}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}

                                                placeholder="Invoice Template"
                                            />
                                        )}
                                        isClearable={true}

                                    />

                                </Box>

                            </Grid>
                            <Grid xs={6}>
                                <InputLabel sx={{ color: 'black' }}>Team Member</InputLabel>
                                <Autocomplete
                                    sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }}
                                    size='small'
                                    options={options}
                                    renderInput={(params) => <TextField {...params} placeholder="Team Member" />}
                                />
                            </Grid>

                        </Grid>
                      
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <InputLabel sx={{ color: 'black' }}>Issue invoice</InputLabel>
                                    <Autocomplete
                                        sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }}
                                        size='small'
                                        options={invoiceissueoptions}
                                        value={issueInvoice} // Set the default value
                                        onChange={handleIssueChange}
                                        renderInput={(params) => <TextField {...params} placeholder="Issue invoice" />}
                                    />
                                </Grid>

                                {issueInvoice === 'specific date' && (
                                    <>
                                        <Grid item xs={12} md={4}>
                                            <InputLabel>Date</InputLabel>
                                            <DatePicker
                                                format="DD/MM/YYYY"
                                                sx={{ width: '100%', backgroundColor: '#fff' }}
                                                selected={startDate}
                                                onChange={handleStartDateChange}
                                                renderInput={(params) => <TextField {...params} size="small" />}
                                            />
                                        </Grid>

                                        <Grid item xs={12} md={4}>
                                            <InputLabel>Time</InputLabel>
                                            <Autocomplete
                                             sx={{ mt: 1, mb: 2, backgroundColor: '#fff' }}
                                                options={timeOptions}
                                                size="small"
                                                value={selectedTime}
                                                onChange={(event, newValue) => setSelectedTime(newValue)}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select Time" variant="outlined" />
                                                )}
                                                fullWidth
                                            />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Box>
                        <Box sx={{ position: 'relative', mt: 2 }}>
                            <InputLabel sx={{ color: 'black' }}>Description</InputLabel>
                            <TextField
                                fullWidth
                                size='small'
                                margin='normal'
                                type="text"
                                value={description}
                                onChange={handleChange}
                                placeholder="Description"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Typography sx={{ color: 'gray', fontSize: '12px', position: 'absolute', bottom: '15px', right: '15px' }}>
                                                {charCount}/{charLimit}
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}

                            />
                        </Box>

                        <Box >


                            <Box sx={{ margin: '20px 0 10px 0' }}>
                                <Typography variant="h6">Line items</Typography>
                                <Typography variant="body2" >
                                    Client-facing itemized list of products and services
                                </Typography>
                            </Box>


                            <Box sx={{ overflow: 'auto', width: '100%', }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 1 }}>Product or service</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>Rate</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Tax</TableCell>
                                            <TableCell ></TableCell>
                                            <TableCell ></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => (
                                            <TableRow key={index}>
                                                <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', zIndex: 1 }}>

                                                    <CreatableSelect
                                                        placeholder={row.isDiscount ? 'Reason for discount' : 'Product or Service'}
                                                        options={serviceoptions}
                                                        value={row.productName ? serviceoptions.find(option => option.label === row.productName) || { label: row.productName, value: row.productName } : null}
                                                        onChange={(selectedOption) => handleServiceChange(index, selectedOption)}
                                                        onInputChange={(inputValue, actionMeta) => handleServiceInputChange(inputValue, actionMeta, index)}
                                                        isClearable
                                                        styles={{
                                                            container: (provided) => ({ ...provided, width: '180px' }),
                                                            control: (provided) => ({ ...provided, width: '180px' }),
                                                            menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
                                                        }}
                                                        menuPortalTarget={document.body}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        name="description"
                                                        value={row.description}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        style={{ border: 'none' }}
                                                        placeholder="Description"
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        name="rate"
                                                        value={row.rate}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        style={{ border: 'none' }}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <input
                                                        type="text"
                                                        name="qty"
                                                        value={row.qty}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                        style={{ border: 'none' }}
                                                    />
                                                </TableCell>

                                                <TableCell>{row.amount}</TableCell>

                                                <TableCell>
                                                    <Checkbox
                                                        name="tax"
                                                        checked={row.tax}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                    />
                                                </TableCell>

                                                <TableCell>
                                                    <IconButton>
                                                        <BsThreeDotsVertical />
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell>
                                                    <IconButton onClick={() => deleteRow(index)}>
                                                        <RiCloseLine />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
                                <Button onClick={() => addRow()} startIcon={<AiOutlinePlusCircle />} sx={{ color: 'blue', fontSize: '15px' }}>
                                    Line item
                                </Button>
                                <Button onClick={() => addRow(true)} startIcon={<CiDiscount1 />} sx={{ color: 'blue', fontSize: '15px' }}>
                                    Discount
                                </Button>
                            </Box>


                            <Typography variant="h6">Summary</Typography>



                            <Table sx={{ backgroundColor: '#fff' }}>
                                <TableHead sx={{ height: '5px', }}>
                                    <TableRow >
                                        <TableCell sx={{ width: '10%', }}>Subtotal</TableCell>
                                        <TableCell sx={{ width: '10%', }}>Tax Rate</TableCell>
                                        <TableCell sx={{ width: '10%', }}>Tax Total</TableCell>
                                        <TableCell sx={{ width: '10%', }}>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                $<input
                                                    // type="number"
                                                    value={subtotal}
                                                    onChange={handleSubtotalChange}
                                                    style={{ border: 'none', width: '50%' }}
                                                />
                                            </Box>

                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    // type="number"
                                                    value={taxRate}
                                                    onChange={handleTaxRateChange}
                                                    style={{ border: 'none', width: '50%' }}
                                                />%
                                            </Box>
                                        </TableCell>
                                        <TableCell>${taxTotal.toFixed(2)}</TableCell>
                                        <TableCell>${totalAmount}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>





                        </Box>

                        <Box sx={{ width: '50%', mt: 3 ,mb:6}}>
                            <Editor onChange={handleEditorChange} initialContent={clientNote} />
                        </Box>

                    </Box>
                    <Box>
                        <Button>Add one more invoice</Button>
                    </Box>
                </Box>
            </LocalizationProvider>
        </>
    )
}

export default Invoice