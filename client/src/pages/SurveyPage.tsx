import React, { useState } from "react";
import { Button } from "../components/Button";
import "./SurveyPage.css";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { AutocompleteChips } from "../components/AutocompleteChips";
import { initialFormData } from "../components/variables/initialFormData";
import { countries } from "../components/variables/countries";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/submit-survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Thank you for sending the survey!");
    } catch (err) {
      alert("Failed to submit the survey. Please try again.");
    }
  };
  // TODO:
  // replace location with a dropdown with a list of cities and nationalities
  // add a 'is vaccinated' yes/no question
  // add a timestamp to sql
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main>
        <h4 className="text">Epidemiology survey</h4>
        <p className="text">
          Please complete a short survey regarding your health. The data will
          help us monitor the spread of infectious disease in the region.
        </p>
        <form className="survey-form" onSubmit={handleSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="name"
              placeholder="Name (required)"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-item"
            />
            <input
              type="text"
              name="surname"
              placeholder="Surname (required)"
              required
              value={formData.surname}
              onChange={handleChange}
              className="input-item"
            />
            <input
              type="number"
              name="age"
              placeholder="Age (required)"
              required
              value={formData.age}
              onChange={handleChange}
              className="input-item"
              min={1}
              max={120}
            />
            <select
              name="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              className="input-item"
            >
              <option value="" disabled hidden>
                Gender (required)
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Pokemon</option>
            </select>
          </div>

          <div className="input-row">
            <input
              type="text"
              name="contact"
              placeholder="Contact (phone or email)"
              value={formData.contact}
              onChange={handleChange}
              className="input-item"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="input-item"
            />
            <select
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              className="input-item"
            >
              <option value="" disabled hidden>
                Country (required)
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="input-row">
            <div className="input-item-chips">
              <AutocompleteChips
                value={formData.symptoms}
                onChange={(newSymptoms) =>
                  setFormData((prev) => ({ ...prev, symptoms: newSymptoms }))
                }
              />
            </div>
            <select
              name="vaccination"
              required
              value={formData.vaccination}
              onChange={handleChange}
              className="input-item"
            >
              <option value="" disabled hidden>
                Are you vaccinated? (required)
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="not sure">Not sure</option>
            </select>
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

          <div className="buttons">
            <Button text="Send survey" type="submit" />
            <Button text="Clear survey" type="button" onClick={handleClear} />
          </div>
        </form>
      </main>
    </>
  );
};
