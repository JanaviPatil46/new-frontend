import React, { useState, useEffect } from 'react';


import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
    Box,
    Button,
    Typography,
    Container,

    Autocomplete,
    TextField,
    Dialog, DialogActions, DialogContent, DialogTitle,

    Switch,
    FormControlLabel,
    Chip

} from '@mui/material';
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Editor from '../Texteditor/Editor';
import Grid from '@mui/material/Unstable_Grid2';
import Priority from '../Priority/Priority';
import Status from '../Status/Status';
import dayjs from 'dayjs';

const Tasks = () => {
    const TASK_API = process.env.REACT_APP_TASK_TEMP_URL;
    const USER_API = process.env.REACT_APP_USER_URL;
    const TAGS_API = process.env.REACT_APP_TAGS_TEMP_URL;



    const navigate = useNavigate();
    const { _id } = useParams();
    const [tempNameNew, setTempNameNew] = useState("");
    const [tagsNew, setTagsNew] = useState([]);
    const [AssigneesNew, setAssigneesNew] = useState([]);
    const [absoluteDate, setAbsoluteDates] = useState(false);
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [StartsDateNew, setStartsDateNew] = useState(null);
    const [DueDateNew, setDueDateNew] = useState(null);
    const [StartsInDurationNew, setStartsInDurationNew] = useState();
    const [DueInDurationNew, setDueInDurationNew] = useState();
    const [StartsInNew, setStartsInNew] = useState();
    const [DueInNew, setDueInNew] = useState();
    const handleStartDateChange = (date) => {
        setStartsDateNew(date);
    };
    const handleDueDateChange = (date) => {
        setDueDateNew(date);
    };
    const handleAbsolutesDates = (checked) => {
        setAbsoluteDates(checked);
    };
    const dayOptions = [
        { label: "Days", value: "Days" },
        { label: "Months", value: "Months" },
        { label: "Years", value: "Years" },
    ];
    const handlePriorityChange = (priority) => {
        setPriority(priority);
    };
    const handleStatusChange = (status) => {
        setStatus(status);
        console.log(status)
    };
    // const [description, setDescription] = useState('');
    const handleEditorChange = (content) => {
        setTaskDescription(content);
    };
    const [taskDiscription, setTaskDescription] = useState();
    const [combinedValues, setCombinedValues] = useState([]);
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = `${USER_API}/api/auth/users`;
            const response = await fetch(url);
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const options = userData.map((user) => ({
        value: user._id,
        label: user.username,
    }));
    const handleuserChange = (event, newValue) => {
        setAssigneesNew(newValue);
        // Map selected options to their values and send as an array
        const selectedValues = newValue.map((option) => option.value);
        // console.log(selectedValues);
        setCombinedValues(selectedValues);
    };

    //Tag FetchData ================
    const [tags, setTags] = useState([]);
    const [combinedTagsValues, setCombinedTagsValues] = useState([]);
    useEffect(() => {
        fetchTagData();
    }, []);

    const fetchTagData = async () => {
        try {

            const url = `${TAGS_API}/tags/`;

            const response = await fetch(url);
            const data = await response.json();
            setTags(data.tags);
            //   console.log(data.tags)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //  for tags
    const calculateWidth = (tagName) => {

        const baseWidth = 10; // base width for each tag
        const charWidth = 8; // approximate width of each character
        const padding = 10; // padding on either side
        return baseWidth + (charWidth * tagName.length) + padding;
    };
    const tagsoptions = tags.map((tag) => ({
        value: tag._id,
        label: tag.tagName,
        colour: tag.tagColour,

        customStyle: {
            backgroundColor: tag.tagColour,
            color: "#fff",
            borderRadius: "8px",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "5px",
            padding: "2px,8px",
            fontSize: '10px',
            width: `${calculateWidth(tag.tagName)}px`,
            margin: '7px', cursor: 'pointer',
        },
        customTagStyle: {
            backgroundColor: tag.tagColour,
            color: "#fff",
            alignItems: "center",
            textAlign: "center",
            padding: "2px,8px",
            fontSize: '10px',
            cursor: 'pointer',
        },
    }));

    const handleTagChange = (event, newValue) => {
        setTagsNew(newValue);
        // Map selected options to their values and send as an array
        const selectedTagsValues = newValue.map((option) => option.value);
        // console.log(selectedTagsValues);
        setCombinedTagsValues(selectedTagsValues);
    };
    const [tempvalues, setTempValues] = useState();
    useEffect(() => {
        fetchidwiseData();
    }, []);

    //get id wise template Record
    const fetchidwiseData = async () => {
        try {
            const url = `${TASK_API}/workflow/tasks/tasktemplate/tasktemplatebyid/`;
            const response = await fetch(url + _id);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            // Extract and process assigneesData
            if (data.taskTemplate && (data.taskTemplate.taskassignees)) {
                const innerArray = data.taskTemplate.taskassignees[0]; // Extract the inner array

                if ((innerArray)) {
                    // console.log("Task Assignees:", innerArray);

                    const assigneesData = innerArray.map((assignee) => ({
                        value: assignee._id,
                        label: assignee.username,
                    }));
                    // console.log("Assignees Data:", assigneesData); // Log the processed assigneesData

                    setAssigneesNew(assigneesData);

                    const selectedValues = assigneesData.map((option) => option.value);
                    setCombinedValues(selectedValues);
                    // console.log("Selected Assignees:", selectedValues);
                } else {
                    console.log("taskassignees contains an unexpected structure.");
                }
            }
            // Process tasktags
            if (data.taskTemplate.tasktags && Array.isArray(data.taskTemplate.tasktags)) {
                const tagsData = data.taskTemplate.tasktags.map((tag) => ({
                    value: tag._id,
                    label: tag.tagName,
                    color: tag.tagColour, // Include color if needed
                    customTagStyle: {
                        backgroundColor: tag.tagColour,
                        color: "#fff",
                        borderRadius: "30px",
                        alignItems: "center",
                        textAlign: "center",
                        marginBottom: "5px",
                        padding: "2px,8px",
                        fontSize: '10px',
                        // width: `${calculateWidth(tag.tagName)}px`,
                        margin: '7px', cursor: 'pointer',
                    }
                }));
                // console.log("Tags Data:", tagsData); // Log the processed tagsData

                setTagsNew(tagsData); // Assuming you have a setTags function to update your state
                const selectedTagsValues = tagsData.map((option) => option.value);
                setCombinedTagsValues(selectedTagsValues);
            } else {
                console.log("tasktags is not defined or not an array.");
            }

            setTempValues(data.taskTemplate);
            tempallvalue();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (tempvalues) {
            tempallvalue();
        }
    }, [tempvalues]);
    const tempallvalue = () => {
        if (tempvalues) {
            setTempNameNew(tempvalues.templatename || '');
            setStatus(tempvalues.status || '');

            setTaskDescription(tempvalues.description || '');
            setPriority(tempvalues.priority || '');
            setStartsInNew(tempvalues.startsin || '');
            setDueInNew(tempvalues.duein || '');
            setStartsDateNew(dayjs(tempvalues.startdate) || null);
            setDueDateNew(dayjs(tempvalues.enddate) || null);
            setStartsInDurationNew(tempvalues.startsinduration || '');
            setDueInDurationNew(tempvalues.dueinduration || '');
            setAbsoluteDates(tempvalues.absolutedates || false);
        }
    };
    const updatetasktemp = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            templatename: tempNameNew,
            status: status.value,
            tasktags: combinedTagsValues,
            taskassignees: combinedValues,

            priority: priority.value,
            description: taskDiscription,
            absolutedates: absoluteDate,
            startsin: StartsInNew,
            startsinduration: StartsInDurationNew,
            duein: DueInNew,
            dueinduration: DueInDurationNew,
            comments: "",
            startdate: StartsDateNew,
            enddate: DueDateNew,
        });

        const requestOptions = {
            method: "PATCH",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        const url = `${TASK_API}/workflow/tasks/tasktemplate/`;
        fetch(url + _id, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
            .then((result) => {
                toast.success("Task Template updated successfully");
                navigate("/firmtemp/templates/tasks")

            })
            .catch((error) => {
                // Handle errors
                console.error(error);
                toast.error("Failed to create Job Template");
            });
    };
const updatesavetasktemp= () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        templatename: tempNameNew,
        status: status.value,
        tasktags: combinedTagsValues,
        taskassignees: combinedValues,

        priority: priority.value,
        description: taskDiscription,
        absolutedates: absoluteDate,
        startsin: StartsInNew,
        startsinduration: StartsInDurationNew,
        duein: DueInNew,
        dueinduration: DueInDurationNew,
        comments: "",
        startdate: StartsDateNew,
        enddate: DueDateNew,
    });

    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    const url = `${TASK_API}/workflow/tasks/tasktemplate/`;
    fetch(url + _id, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then((result) => {
            toast.success("Task Template updated successfully");
           

        })
        .catch((error) => {
            // Handle errors
            console.error(error);
            toast.error("Failed to create Job Template");
        });
};
    const handleTaskTempCancle = () => {
        const hasUnsavedChanges =
            tempNameNew !== tempvalues.templatename ||
            status !== tempvalues.status ||
            taskDiscription !== tempvalues.description ||
            priority !== tempvalues.priority ||
            AssigneesNew.length !== tempvalues.taskassignees?.length ||
            tagsNew.length !== tempvalues.tasktags?.length ||
            absoluteDate !== tempvalues.absolutedates ||
            StartsDateNew !== dayjs(tempvalues.startdate) ||
            DueDateNew !== dayjs(tempvalues.enddate);

        if (hasUnsavedChanges) {
            if (window.confirm("You have unsaved changes. Are you sure you want to leave without saving?")) {
                navigate("/firmtemp/templates/tasks");
            }
        } else {
            navigate("/firmtemp/templates/tasks");
        }
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Box sx={{ mt: 2 }}>
                    <Box>
                        <form>
                            <Box className='box-b'>
                                <Typography variant='h5' gutterBottom>Edit Task Template</Typography>
                                <Box mt={2} mb={2}><hr /></Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={5.8}>

                                        <Box sx={{ width: '100%' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Box>
                                                        <label className='task-input-label' >Template Name</label>
                                                        <TextField
                                                            fullWidth
                                                            name="TemplateName"
                                                            placeholder="Template Name"
                                                            size="small"
                                                            sx={{ background: '#fff', mt: 1 }}
                                                            onChange={(e) => setTempNameNew(e.target.value)} value={tempNameNew}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Box>
                                                        <Status onStatusChange={handleStatusChange} selectedStatus={status} />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ width: '100%' }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Box>
                                                        <label className='task-input-label'>Task Assignee</label>
                                                        <Autocomplete
                                                            multiple
                                                            sx={{ mt: 2 }}
                                                            options={options}
                                                            size='small'
                                                            getOptionLabel={(option) => option.label}
                                                            value={AssigneesNew}
                                                            onChange={handleuserChange}
                                                            renderOption={(props, option) => (
                                                                <Box
                                                                    component="li"
                                                                    {...props}
                                                                    sx={{ cursor: 'pointer', margin: '5px 10px' }} // Add cursor pointer style
                                                                >
                                                                    {option.label}
                                                                </Box>
                                                            )}
                                                            renderInput={(params) => (
                                                                <TextField {...params} variant="outlined" placeholder="Assignees" />
                                                            )}
                                                            isOptionEqualToValue={(option, value) => option.value === value.value}
                                                        />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Box>
                                                        <Priority onPriorityChange={handlePriorityChange} selectedPriority={priority} />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        <Box sx={{ mt: 3, }}>
                                            <Editor
                                                initialContent={taskDiscription} onChange={handleEditorChange}
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <label className='task-input-label'>Tags</label>
                                            <Autocomplete
                                                multiple
                                                size='small'
                                                id="tags-outlined"
                                                options={tagsoptions}
                                                getOptionLabel={(option) => option.label}
                                                value={tagsNew}
                                                onChange={handleTagChange}
                                                renderTags={(selected, getTagProps) =>
                                                    selected.map((option, index) => (
                                                        <Chip
                                                            key={option.value}
                                                            label={option.label}
                                                            style={option.customTagStyle}
                                                            {...getTagProps({ index })}
                                                        />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"

                                                        placeholder="Tags"
                                                        sx={{ width: '100%', marginTop: '8px', backgroundColor: '#fff' }}
                                                    />
                                                )}
                                                renderOption={(props, option) => (
                                                    <Box component="li" {...props} style={option.customStyle}>
                                                        {option.label}
                                                    </Box>
                                                )}
                                                isOptionEqualToValue={(option, value) => option.value === value.value}
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                                                <Typography variant='h6' className='task-input-label'>Start and Due Date</Typography>
                                                <Box className='absolutes-dates'>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={absoluteDate}
                                                                onChange={(event) => handleAbsolutesDates(event.target.checked)}
                                                                color="primary"
                                                            />
                                                        }
                                                        label={"Absolute Date"}
                                                    />
                                                </Box>
                                            </Box>
                                        </Box>
                                        {absoluteDate && (
                                            <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                    <Typography className='task-input-label'>Start Date</Typography>
                                                    <DatePicker
                                                        format="DD/MM/YYYY"
                                                        sx={{ width: '100%', backgroundColor: '#fff' }}
                                                        value={StartsDateNew} onChange={handleStartDateChange}
                                                        renderInput={(params) => <TextField {...params} size="small" />}
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                                                    <Typography className='task-input-label'>Due Date</Typography>
                                                    <DatePicker
                                                        format="DD/MM/YYYY"
                                                        sx={{ width: '100%', backgroundColor: '#fff' }}
                                                        value={DueDateNew} onChange={handleDueDateChange}
                                                        renderInput={(params) => <TextField {...params} size="small" />}
                                                    />
                                                </Box>
                                            </>
                                        )}
                                        {!absoluteDate && (
                                            <>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography className='task-input-label'>Start In</Typography>
                                                    <TextField
                                                        size='small'
                                                        margin='normal'
                                                        fullWidth
                                                        defaultValue={0}

                                                        sx={{ background: '#fff', ml: 1.5 }}
                                                        value={StartsInNew}
                                                        onChange={(e) => setStartsInNew(e.target.value)}
                                                    />
                                                    <Autocomplete
                                                        options={dayOptions}
                                                        size="small"
                                                        getOptionLabel={(option) => option.label}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setStartsInDurationNew(newValue.value); // Update the duration state
                                                                // Update the TextField state with the selected option's label
                                                            }
                                                        }}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                        value={dayOptions.find((option) => option.value === StartsInDurationNew) || null}
                                                        className="job-template-select-dropdown"
                                                    />
                                                </Box>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Typography className='task-input-label'>Due In</Typography>
                                                    <TextField
                                                        size='small'
                                                        margin='normal'
                                                        value={DueInNew}
                                                        onChange={(e) => setDueInNew(e.target.value)}
                                                        fullWidth
                                                        defaultValue={0}

                                                        sx={{ background: '#fff', ml: 1.8, }}

                                                    />

                                                    <Autocomplete
                                                        options={dayOptions}
                                                        size="small"
                                                        getOptionLabel={(option) => option.label}
                                                        onChange={(event, newValue) => {
                                                            if (newValue) {
                                                                setDueInDurationNew(newValue.value); // Update the duration state
                                                                // Update the TextField state with the selected option's label
                                                            }
                                                        }}
                                                        renderInput={(params) => <TextField {...params} variant="outlined" />}
                                                        value={dayOptions.find((option) => option.value === DueInDurationNew) || null}
                                                        className="job-template-select-dropdown"
                                                    />
                                                </Box>
                                            </>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={0.4} sx={{ display: { xs: 'none', sm: 'block' } }}>
                                        <Box
                                            sx={{
                                                borderLeft: '1px solid black',
                                                height: '100%',
                                                ml: 1.5
                                            }}
                                        ></Box>
                                    </Grid>
                                    <Grid item xs={12} sm={5.8} >
                                    </Grid>
                                </Grid>
                                <Box mt={2} mb={2}><hr /></Box>
                                <Box sx={{ pt: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                                <Button variant="contained" color="primary" onClick={updatetasktemp} >Save & exit</Button>
                                    <Button variant="contained" color="primary" onClick={updatesavetasktemp} >Save</Button>
                                    <Button variant="outlined" onClick={handleTaskTempCancle}>Cancel</Button>
                                </Box>
                            </Box>
                        </form>
                    </Box>
                </Box>

            </Container>
        </LocalizationProvider>
    );
};

export default Tasks;