import { Box, Button } from "@material-ui/core"
import { useCallback, useState } from "react"

import TextareaAutosize from "react-textarea-autosize"

import CloseIcon from '@material-ui/icons/Close';

const InputComponent = ({ handleChange, addItem, buttonText, placeholder }) => {
    const [value, setValue] = useState("")

    const handleValueChange = useCallback((e) => {
        setValue(e.target.value)
    }, [])


    const handleClick = useCallback(() => {
        addItem(value)
        handleChange()
    }, [handleChange, addItem, value])

    console.log("InputComponent run....")

    return <Box style={{ margin: "10px 10px 10px 0px", width: "100%" }}>
        <Box>
            <TextareaAutosize minRows={3} style={{ width: "100%", textDecoration: "none", border: "none", borderRadius: "5px", padding: "10px 0px 0px 10px" }} placeholder={placeholder} value={value} onChange={handleValueChange} />
        </Box>
        <Box style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
            <Button variant="contained" color="primary" onClick={handleClick}>
                {buttonText}
            </Button>

            <CloseIcon style={{ marginLeft: "10px", cursor: "pointer" }} fontSize={"large"} onClick={handleChange} />
        </Box>
    </Box>
}


export default InputComponent