import React, { useState } from "react";
import { Button } from "../components/Button";
import "./SurveyPage.css";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { AutocompleteChips } from "../components/AutocompleteChips";
import { initialFormData } from "../components/variables/initialFormData";

export const SurveyPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the survey?")) {
      setFormData(initialFormData);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Wysłano dane ankiety:", formData);
    alert("Dziękujemy za wypełnienie ankiety!");
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="survey-container">
        <h2>Epidemiology Survey</h2>
        <p>
          Please complete a short survey regarding your health. The data will
          help us monitor the spread of infectious disease in the region.
        </p>

        <form className="survey-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-item"
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              required
              value={formData.surname}
              onChange={handleChange}
              className="input-item"
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              value={formData.age}
              onChange={handleChange}
              className="input-item"
            />
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="input-item"
            >
              <option value="" disabled hidden>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Pokemon</option>
            </select>
          </div>
          <div className="input-row">
            <input
              type="text"
              name="location"
              placeholder="Miejsce zamieszkania"
              required
              value={formData.location}
              onChange={handleChange}
              className="input-item"
            />
          </div>
          <div className="input-row">
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="input-item"
            />
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-item"
            />
          </div>

          <div className="input-row input-item-chips">
            <AutocompleteChips
              value={formData.symptoms}
              onChange={(newSymptoms) =>
                setFormData((prev) => ({ ...prev, symptoms: newSymptoms }))
              }
            />
          </div>
          <div className="input-row">
            <textarea
              name="additionalInfo"
              placeholder="Additonal information"
              value={formData.additionalInfo}
              onChange={handleChange}
              className="input-item"
            />
          </div>
          <Button text="Send survey" type="submit" />
          <Button text="Clear survey" type="button" onClick={handleClear} />
        </form>
      </main>
    </>
  );
};
