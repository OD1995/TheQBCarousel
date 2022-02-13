import React from "react";
// import "./styles.css";

function FieldForm({ fields }) {
  const [fieldsValues, setFieldsValues] = React.useState({});
  const handleChange = (event, fieldId) => {
    let newFields = { ...fieldsValues };
    newFields[fieldId] = event.target.value;

    setFieldsValues(newFields);
  };
  console.log(fieldsValues);
  return (
    <div>
      {fields.map(field => (
        <FieldEditor
          key={field}
          id={field}
          handleChange={handleChange}
          value={fieldsValues[field]}
        />
      ))}
      <div>{JSON.stringify(fieldsValues)}</div>
    </div>
  );
}

const FieldEditor = ({ id, value, handleChange }) => (
  <div className="field-editor">
    <input onChange={event => handleChange(event, id)} value={value} />
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
