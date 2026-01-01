import { createContext, useContext, useReducer, useEffect } from "react";
import { initialState, resumeReducer } from "../reducer/resumeReducer";

const ResumeContext = createContext();

const STORAGE_KEY = "resume-data";

const loadFromStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Error loading data from localStorage:", error);
  }
  return null;
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
};

export const ResumeProvider = ({ children }) => {
  const savedData = loadFromStorage();
  const [state, dispatch] = useReducer(
    resumeReducer,
    savedData || initialState
  );

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const updatePersonal = (field, value) => {
    dispatch({ type: "UPDATE_PERSONAL", field, value });
  };

  const addExperience = () => {
    dispatch({ type: "ADD_EXPERIENCE" });
  };

  const updateExperience = (index, field, value) => {
    dispatch({ type: "UPDATE_EXPERIENCE", index, field, value });
  };

  const removeExperience = (index) => {
    dispatch({ type: "REMOVE_EXPERIENCE", index });
  };

  const addSkill = (skill) => {
    dispatch({ type: "ADD_SKILL", skill });
  };

  const removeSkill = (index) => {
    dispatch({ type: "REMOVE_SKILL", index });
  };

  const updateEducation = (field, value) => {
    dispatch({ type: "UPDATE_EDUCATION", field, value });
  };

  const toggleLayout = (layout) => {
    dispatch({ type: "TOGGLE_LAYOUT", layout });
  };

  const loadData = (data) => {
    dispatch({ type: "LOAD_DATA", data });
  };

  return (
    <ResumeContext.Provider
      value={{
        state,
        dispatch,
        updatePersonal,
        addExperience,
        updateExperience,
        removeExperience,
        addSkill,
        removeSkill,
        updateEducation,
        toggleLayout,
        loadData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
