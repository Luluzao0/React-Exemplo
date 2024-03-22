import React, { useState, useEffect } from 'react';

const Form = ({ jsonData }) => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderFormElements = (groups) => {
    if (!groups) return null;

    return groups.map((group) => (
      <div key={group.label}>
        <h3>{group.label}</h3>
        {group.input && group.input.map((inputField) => (
          <div key={inputField.label}>
            <label htmlFor={inputField.$?.ref}>{inputField.label}</label>
            <input
              type="text"
              name={inputField.$?.ref}
              value={formData[inputField.$?.ref] || ''}
              onChange={handleFormChange}
            />
          </div>
        ))}
        {group.select1 && (
          <div key={group.select1.$.ref}>
            <label htmlFor={group.select1.$.ref}>{group.select1.label}</label>
            <select
              name={group.select1.$.ref}
              value={formData[group.select1.$.ref] || ''}
              onChange={handleFormChange}
            >
              {group.select1.itemset.item.map((option) => (
                <option key={option.$?.value} value={option.$?.value}>
                  {option.label.$?.ref}
                </option>
              ))}
            </select>
          </div>
        )}
        {group.select && (
          <div key={group.select.$.ref}>
            <label htmlFor={group.select.$.ref}>{group.select.label}</label>
            <select
              name={group.select.$.ref}
              value={formData[group.select.$.ref] || ''}
              onChange={handleFormChange}
            >
              {group.select.itemset.item.map((option) => (
                <option key={option.$?.value} value={option.$?.value}>
                  {option.label.$?.ref}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    console.log('Formulário renderizado');
  }, [formData]);

  return (
    <form>
      {jsonData && jsonData.h.body.group && renderFormElements(jsonData.h.body.group)}
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Form;
