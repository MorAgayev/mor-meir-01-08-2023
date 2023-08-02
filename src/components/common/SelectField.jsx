import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import PropTypes from 'prop-types'

export default function SelectField({options = [], defaultValue, select = ()=>{}}) {

  const handleChange = (e) => {
    select(e.target.value)
  }
  
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect
          defaultValue={defaultValue}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
          onChange={handleChange}
        >
            {options.length && options.map(option => {
                return <option key={option.value} value={option.value}>{option.title}</option>
            })}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}

SelectField.propTypes = {
  select: PropTypes.func,
  options: PropTypes.array,
  defaultValue: PropTypes.string || PropTypes.number
}