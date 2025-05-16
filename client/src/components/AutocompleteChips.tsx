import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
import { allSymptoms } from "./variables/symptoms";

interface Props {
  onChange: (symptoms: string[]) => void;
  value: string[];
}

export const AutocompleteChips: React.FC<Props> = ({ onChange, value }) => {
  return (
    <Autocomplete
      multiple
      options={allSymptoms}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip label={option} {...getTagProps({ index })} key={option} />
        ))
      }
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label="Symptoms" />
      )}
    />
  );
};
