import React, { useState, useEffect } from 'react';
import './styles.css';
const App = () => {
  // JSON com os dados do formulário
  const jsonData = {
    "h:body": {
      "group": {
        "label": "Identification particulars",
        "input": [
          {
            "$": {
              "ref": "/data/identification_particulars/county_name"
            },
            "label": "County name"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/county_code"
            },
            "label": "County code"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/sub_county_name"
            },
            "label": "Sub county name"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/subcounty_code"
            },
            "label": "Sub county code"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/city_town"
            },
            "label": "City/town"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/city_town_code"
            },
            "label": "City/town code"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/estate_residential_name"
            },
            "label": "Estate/Residential"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/estate_residential_code"
            },
            "label": "Estate/Residential code"
          },
          {
            "$": {
              "ref": "/data/identification_particulars/app_population"
            },
            "label": "Approximate population"
          }
        ]
      }
    }
  };

  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFormElements = (group) => {
    if (!group || !group.input) return null;

    return group.input.map((inputField) => (
      <div key={inputField.label}>
        <label htmlFor={inputField.$.ref}>{inputField.label}</label>
        <input
          type="text"
          name={inputField.$.ref}
          value={formData[inputField.$.ref] || ''}
          onChange={handleFormChange}
        />
      </div>
    ));
  };

  useEffect(() => {
    console.log('Formulário renderizado');
  }, [formData]);

  return (
    <div className="App">
      <h1>Formulário</h1>
      <form>
        {jsonData && jsonData['h:body'] && jsonData['h:body'].group && renderFormElements(jsonData['h:body'].group)}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default App;
