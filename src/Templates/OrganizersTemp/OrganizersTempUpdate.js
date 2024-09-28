import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Section from './organizertempSection';
const OrganizersTempUpdate = () => {

  const ORGANIZER_TEMP_API = process.env.REACT_APP_ORGANIZER_TEMP_URL;


  const { id } = useParams();
  const navigate = useNavigate();

  const handlePreview = () => {
    // Gather all the necessary data for the preview
    const data = {
      organizerName,
      sections, // This contains all your sections and their elements
    };
  
    // You can also use any other required data from your state here
    console.log("Data for preview:", data);
  
    // Navigate to the desired path with data if necessary (you might want to pass it through state)
    navigate('/organizerpreview', { state: { data } });
  };
  const [templateName, setTemplateName] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [templateData, setTemplateData] = useState(null);

  useEffect(() => {
    fetchidwiseData();
  }, []);

  const fetchidwiseData = async () => {
    try {
      const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log(data);
      setTemplateData(data.organizerTemplate);
      setTemplateName(data.organizerTemplate.templatename);
      // console.log(data.organizerTemplate.templatename)
      setOrganizerName(data.organizerTemplate.organizerName);
      // console.log(data.organizerTemplate.sections)
      setSections(data.organizerTemplate.sections || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + ' ..';
    }
    return text;
  }
  const addSection = () => {
    // const newSection = { id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [] };
    const newSection = {
      id: Date.now(), name: `Section ${sections.length + 1}`, text: '', formElements: [], sectionSettings: {
        sectionRepeatingMode: false,
        buttonName: '',
        conditional: false,
        mode: '',
        conditions: [
          {
            question: '',
            answer: ''
          }
        ]
      }
    };
    setSections([...sections, newSection]);
    setSelectedSection(newSection); // Select the newly added section
  };
  console.log(sections)
  console.log(selectedSection)

  const handleSectionClick = (section) => {
    // const newSection = {
    //     id: section.sectionId, name: section.sectionname, text: section.sectionname, formElements: section.questions
    // };
    setSelectedSection(section);
  };
  const handleDeleteSection = (sectionId) => {
    const newSections = sections.filter(section => section.id !== sectionId);
    setSections(newSections);
    if (selectedSection && selectedSection.id === sectionId) {
      setSelectedSection(null); // Clear selected section if it's deleted
    }
  };

  const handleUpdateSection = (id, newText, newFormElements) => {
    setSections(prevSections => prevSections.map(section =>
      section.id === id ? { ...section, text: newText, formElements: newFormElements } : section
    ));
  };

  const handleDuplicateSection = (sectionId) => {
    const sectionToDuplicate = sections.find(section => section.id === sectionId);
    if (sectionToDuplicate) {
      const duplicatedSection = {
        ...sectionToDuplicate,
        text: `${sectionToDuplicate.text} (Copy)`,
        id: Date.now(), // Assign a new ID for the duplicated section
      };
      setSections([...sections, duplicatedSection]);
    }
  };
  const saveOrganizerTemp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templateName,
      organizerName: organizerName,
      sections: sections.map(section => ({
        name: section.text,
        text: section.text,
        id: section.id.toString(),
        sectionsettings: section.sectionSettings || {},
        formElements: section.formElements.map(element => ({
          type: element.type,
          id: element.id,
          sectionid: element.sectionid,
          options: element.options.map(option => ({
            id: option.id,
            text: option.text
          })),
          text: element.text,
          questionsectionsettings: element.questionsectionsettings || {}
        }))
      })),
      active: true
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    console.log(raw)
    const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate/${id}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === "OrganizerTemplate Updated successfully") {
          toast.success("Organizer Template Updated successfully");
          // navigate('/firmtemp/templates/organizers');

        } else {
          toast.error(result.error || "Failed to Update Organizer Template");
        }
      })
      .catch((error) => console.error(error));
  };

  const saveandexitOrganizerTemp = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      templatename: templateName,
      organizerName: organizerName,
      sections: sections.map(section => ({
        name: section.text,
        text: section.text,
        id: section.id.toString(),
        sectionsettings: section.sectionSettings || {},
        formElements: section.formElements.map(element => ({
          type: element.type,
          id: element.id,
          sectionid: element.sectionid,
          options: element.options.map(option => ({
            id: option.id,
            text: option.text
          })),
          text: element.text,
          questionsectionsettings: element.questionsectionsettings || {}
        }))
      })),
      active: true
    });

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    console.log(raw)
    const url = `${ORGANIZER_TEMP_API}/workflow/organizers/organizertemplate/${id}`;
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        if (result && result.message === "OrganizerTemplate Updated successfully") {
          toast.success("Organizer Template Updated successfully");
          navigate('/firmtemp/templates/organizers');

        } else {
          toast.error(result.error || "Failed to Update Organizer Template");
        }
      })
      .catch((error) => console.error(error));
  };
  // const handleBackButton = ()=>{
  //   navigate('/firmtemp/templates/organizers');
  // }
  const [isFormFilled, setIsFormFilled] = useState(false);
  const handleBackButton = () => {
    if (isFormFilled) {
      const confirmCancel = window.confirm("You have unsaved changes. Are you sure you want to cancel?");
      if (confirmCancel) {
        navigate('/firmtemp/templates/organizers');
      }
    } else {
      navigate('/firmtemp/templates/organizers');
    }
  };

  useEffect(() => {
    // Check if form is filled
    const checkIfFormFilled = () => {
      if (organizerName || templateName || sections) {
        setIsFormFilled(true);
      } else {
        setIsFormFilled(false);
      }
    };

    checkIfFormFilled();
  }, [organizerName, templateName, sections]);
  const handleFormSave = (elementId, formData) => {
    setSections(prevSections =>
      prevSections.map(section => ({
        ...section,
        formElements: section.formElements.map(el =>
          el.id === elementId ? { ...el, questionsectionsettings: formData } : el
        )
      }))
    );
  };
  const handleSectionSaveData = (settings) => {
    // Update the specific section with the new settings
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === selectedSection.id
          ? { ...section, sectionSettings: settings }
          : section
      )
    );
  };
  return (
    <>
      <Box>
      <Box sx={{display:'flex', alighItems:'center', justifyContent:'space-between', mb:3}}>
            <Typography variant='h4'>Edit Template</Typography>
            <Button variant="text" onClick={handlePreview} >Preview</Button>
          </Box>
        <Box>
          <label className='organizer-input-label'>Template Name</label>
          <TextField

            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            fullWidth
            size='small'
            margin='normal'
            placeholder='Template name'
            sx={{ backgroundColor: '#fff' }}
            className='organizer-input-label'
          />
        </Box>
        <Box mt={2}>
          <label className='organizer-input-label'>Organizer name</label>
          <TextField

            value={organizerName}
            onChange={(e) => setOrganizerName(e.target.value)}
            fullWidth
            size='small'
            margin='normal'
            placeholder='Organizer name'
            className='organizer-input-label'
            sx={{ backgroundColor: '#fff' }}
          />
        </Box>

      </Box>
      <Box className="organizer-container" sx={{ display: "flex", marginTop: "40px", height: "auto", width: "100%", gap: 3 }}>
        <Box className="left-org-container" sx={{ padding: '10px', width: "30%", height: "auto", p: 2 }}>
          <Box className="smooth-dnd-container vertical">
            {sections.map((section) => (
              <Box key={section.id} sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  placeholder={`Section Name`}
                  className='section-name'
                  size='small'
                  margin='normal'
                  value={truncateText(section.text, 5)}
                  InputProps={{
                    readOnly: true
                  }}
                  sx={{ backgroundColor: '#fff' }}
                  onClick={() => handleSectionClick(section)}
                  fullWidth
                />
              </Box>
            ))}
          </Box>
          <Box sx={{ width: "50%", height: "25px", marginTop: "20px" }}>
            <Button
              variant="contained"
              onClick={addSection}
            >
              New section
            </Button>
          </Box>
        </Box>
        <Box className="right-container" sx={{ borderRadius: '20px', width: "70%", height: "auto" }}>
          {selectedSection && (
            <Section
              section={selectedSection}
              onDelete={handleDeleteSection}
              onUpdate={handleUpdateSection}
              onDuplicate={handleDuplicateSection}
              onSaveFormData={handleFormSave}
              onSaveSectionData={handleSectionSaveData}
              sections={sections}
              
            />
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", gap: "10px", marginLeft: "10px", marginBottom: "20px", marginTop: '20px' }}>
        <Button type="submit"
          variant="contained"
          color="primary"
          onClick={saveandexitOrganizerTemp}>Save & exit</Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={saveOrganizerTemp}
        >
          Save
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="primary"
          onClick={handleBackButton}
        >
          Cancel
        </Button>
      </Box>
    </>
  )
}

export default OrganizersTempUpdate