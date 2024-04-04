import { useDispatch, useSelector } from "react-redux";
import { switchesColor } from "../../toolkitRedux/storeSlice";
import { Box, FormControl, NativeSelect } from "@mui/material";
import ContrastIcon from '@mui/icons-material/Contrast';

const Switches = () => {
    const { switches } = useSelector(state => state.onlineStore);

    const dispatch = useDispatch();

    const handleSwitchChange = (e) => {
        dispatch(switchesColor(e.target.value));
    };
    return (
        <Box>
            <FormControl sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }} onChange={handleSwitchChange}>
                <ContrastIcon style={{ marginLeft: "30px" }} />
                <NativeSelect defaultValue={switches} sx={{ color: 'primary.main', borderBottom: "none" }}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="grey">Grey</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )
}

export default Switches;