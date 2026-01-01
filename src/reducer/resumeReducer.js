export const initialState = {
  personal: {
    fullName: "",
    email: "",
    jobTitle: "",
    summary: "",
  },
  experience: [],
  skills: [],
  education: {
    institution: "",
    degree: "",
    graduationYear: "",
  },
  layout: "classic",
};

export function resumeReducer(state, action) {
  switch (action.type) {
    case "UPDATE_PERSONAL":
      return {
        ...state,
        personal: { ...state.personal, [action.field]: action.value },
      };

    case "ADD_EXPERIENCE":
      return {
        ...state,
        experience: [
          ...state.experience,
          { company: "", role: "", duration: "", description: "" },
        ],
      };

    case "UPDATE_EXPERIENCE":
      const updatedExp = [...state.experience];
      updatedExp[action.index][action.field] = action.value;
      return { ...state, experience: updatedExp };

    case "REMOVE_EXPERIENCE":
      return {
        ...state,
        experience: state.experience.filter((_, i) => i !== action.index),
      };

    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.skill] };

    case "REMOVE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((_, i) => i !== action.index),
      };

    case "UPDATE_EDUCATION":
      return {
        ...state,
        education: { ...state.education, [action.field]: action.value },
      };

    case "TOGGLE_LAYOUT":
      return { ...state, layout: action.layout };

    case "LOAD_DATA":
      return action.data;

    default:
      return state;
  }
}
