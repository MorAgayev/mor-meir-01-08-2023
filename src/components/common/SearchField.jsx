import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function SearchField({search, options = [], select, value}) {
    const handleSelect = (_, newValue) => {
        select(newValue)
    }

    return (
        <Autocomplete
            value={value}
            onChange={(e, newValue)=>handleSelect(e, newValue)}
            onInput={search}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="Search"
            options={options}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input
                if (typeof option === 'string') {
                    return option;
                }
                // Regular option
                return option.LocalizedName
            }}
            renderOption={(props, option) =>{
                // eslint-disable-next-line react/prop-types
                return <li {...props} key={props.id}>{option.LocalizedName}</li>
            }}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Search" />
            )}
        />
    );
}

SearchField.propTypes = {
    select: PropTypes.func,
    search: PropTypes.func,
    options: PropTypes.array,
    value: PropTypes.string
}
