import { useState } from 'react'
import Select from 'react-select'

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' }
]

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState()

  const handleChange = (option) => {
    setSelectedOption(option)
  }

  return (
    // <div>
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Main Scene"
      styles={{
        control: (provided, { isFocused }) => ({
          ...provided,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          border: 'none',
          borderColor: isFocused ? 'black' : 'rgba(0, 0, 0, 0.1)', // Change border color while typing
          boxShadow: isFocused ? '0 0 0 1px black' : 'none' // Add border shadow while typing

          // Background color with transparency
        }),
        option: (provided) => ({
          ...provided,
          backgroundColor: 'rgba(0, 0, 0, 0.1)' // Background color with transparency
        })
      }}
    />
    // </div>
  )
}

export default Dropdown
