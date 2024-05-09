import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, NativeSelect } from "@mui/material";
import ContrastIcon from '@mui/icons-material/Contrast';
import { switchesColor } from "../../features/user/userSlice";

const Switches = () => {
    const { switches } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const handleSwitchChange = (e) => {
        dispatch(switchesColor(e.target.value));
    };
    return (
        <Box>
            <FormControl sx={{ display: "flex", flexDirection: "row", gap: "20px", alignItems: "center" }} onChange={handleSwitchChange}>
                <ContrastIcon style={{ marginLeft: "30px" }} />
                <NativeSelect defaultValue={switches} sx={{ color: 'primary.main', borderBottom: "none" }} data-testid="native-select">
                    <option value="light" data-testid="native-option">Light</option>
                    <option value="dark" data-testid="native-option">Dark</option>
                    <option value="grey" data-testid="native-option">Grey</option>
                </NativeSelect>
            </FormControl>
        </Box>
    )
}

export default Switches;