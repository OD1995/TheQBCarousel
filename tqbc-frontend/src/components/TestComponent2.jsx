import React from "react";
// import "./styles.css";
import Select from 'react-select';

function FieldForm({ fields }) {
  const [fieldsValues, setFieldsValues] = React.useState({});
  const handleChange = (event, fieldId) => {
    let newFields = { ...fieldsValues };
    // console.log(event);
    newFields[fieldId] = event;

    setFieldsValues(newFields);
  };
  const options = [
    {label:'a',value:1},
    {label:'b',value:2},
    {label:'c',value:3},
    {label:'d',value:4},
  ]
  console.log(fieldsValues);
  return (
    <div>
      {fields.map((field,ix) => (
        <DropdownOD
          key={field}
          id={field}
          handleChange={handleChange}
          value={options[ix]}
          options={options}
        />
      ))}
      <div>{JSON.stringify(fieldsValues)}</div>
    </div>
  );
}

const DropdownOD = ({ id, value, handleChange, options }) => (
  <div className="field-editor">
    {/* <input onChange={event => handleChange(event, id)} value={value} /> */}
    <Select
    // key={key}
    // defaultValue={selectedOption}
    defaultValue={value}
    // onChange={setSelectedOption}
    onChange={event => handleChange(event, id)}
    options={options}
    isSearchable={true}
    className='qb_selector_select'
    id={id}
    />
  </div>
);

export default FieldForm;

// export default function App() {
//   const fields = ["field1", "field2", "field3", "anotherField"];
//   return (
//     <div className="App">
//       <FieldForm fields={fields} />
//     </div>
//   );
// }
