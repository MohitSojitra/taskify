import { Box, Typography } from "@material-ui/core"
import { memo } from "react"
import AddIcon from '@material-ui/icons/Add';
const AddItemComponent = memo(({ handleChange, buttonText }) => {
    console.log("AddItemComponent run....")

    return <Box style={{ cursor: "pointer", padding: "10px", display: "flex", alignItems: "center", minWidth: "300px" }} onClick={handleChange}>
        <AddIcon fontSize={"large"} />
        <Typography variant={"h6"} style={{ fontWeight: "700" }}>{buttonText}</Typography>
    </Box>
})

export default AddItemComponent