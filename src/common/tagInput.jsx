import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";

const TagInput = ({ setFormData, formData, value }) => {
  const [selected, setSelected] = useState(value || []);

  const handleChange = (val) => {
    const modifyTags = val.map((item) => {
      return { name: item };
    });
    setSelected(val);
    setFormData({ ...formData, tags_in: modifyTags });
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
      const modifyTags = value.map((item) => {
        return { name: item };
      });
      setFormData({ ...formData, tags_in: modifyTags });
    }
  }, []);

  return (
    <div className="font-weight-bold">
      <TagsInput
        value={selected}
        onChange={(val) => handleChange(val)}
        name="tags"
        placeHolder="Enter tags"
        seprators={["Enter", "Space", "Tab"]}
      />
      <em>press enter or comma to add new tag</em>
    </div>
  );
};

export default TagInput;
