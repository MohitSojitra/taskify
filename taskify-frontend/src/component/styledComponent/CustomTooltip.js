import { Tooltip, withStyles } from "@material-ui/core";
import { colors } from "../../Theme/ColorPalette";

export default withStyles((theme) => ({
    tooltip: {
        backgroundColor: colors.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
    arrow: {
        color: colors.white,
    },
}))(Tooltip);