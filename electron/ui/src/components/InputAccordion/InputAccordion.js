import React from 'react'; 
import {useEffect, useState} from 'react';    
import Container from '@mui/material/Container';  
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import TextField from '@mui/material/TextField';
import InputWrapper from "../InputWrapper/InputWrapper";


export default function InputAccordion(props) {

    const {dataKey, data} = props;
    const [expanded1, setExpanded1] = useState('panel1'); 
    const [value, setValue] = useState("");

    useEffect(()=>{  
        //console.log("DDD:",data);
    }, [data]);

    const handleAccordionChange = (panel) => (event, isExpanded) => {
      setExpanded1(isExpanded ? panel : false);
    };


    const handleFieldChange = (event) => {
        setValue(event.target.value);
    };


    const renderFields = () => {
        return Object.keys(data.variables).map((key)=>{
            let vItem = data.variables[key];
            return <InputWrapper fieldData={vItem} />
        });
    };


    const renderFieldsO = () => {
        return Object.keys(data.variables).map((key)=>{
            let vItem = data.variables[key];
            return <TextField id="outlined-basic" 
                    label={vItem.display_name}
                    variant="outlined" 
                    size="small"
                    value={value}
                    onChange={handleFieldChange}
                    fullWidth />
        });
    };


    return (
        <Accordion expanded={expanded1 === 'panel1'} onChange={handleAccordionChange('panel1')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} >
            {"["+dataKey+"] "+data.display_name}
        </AccordionSummary>
        <AccordionDetails>
            {data.description}

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                autoComplete="off"
            >
            {
                renderFields()
            }
            </Box>
        </AccordionDetails>
        </Accordion>
    );

}