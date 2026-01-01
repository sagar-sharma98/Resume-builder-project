import { useState } from "react";
import { useResume } from "../context/resumeContext";
import { useDarkMode } from "../context/DarkMode";
import { exportPDF } from "../utils/exportPDF";
import { FiDownload, FiX, FiMoon, FiSun } from "react-icons/fi";

export default function ControlPanel() {
  const {
    state,
    updatePersonal,
    addExperience,
    updateExperience,
    removeExperience,
    addSkill,
    removeSkill,
    updateEducation,
    toggleLayout,
  } = useResume();
  const { isDark, toggleDarkMode } = useDarkMode();
  const [skillInput, setSkillInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameInputTouched, setNameInputTouched] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    updatePersonal("email", email);
    if (email && !validateEmail(email))
      setEmailError("Please enter a valid email address");
    else setEmailError("");
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!state.skills.includes(skillInput.trim()))
        addSkill(skillInput.trim());
      setSkillInput("");
    }
  };

  const handleExportPDF = async () => {
    if (!state.personal.fullName.trim()) return;
    try {
      await exportPDF("resume-preview");
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const isExportDisabled = !state.personal.fullName.trim();

  return (
    <div className="lg:h-screen lg:overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-300">
            Resume Builder
          </h2>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
        </div>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 transition-colors duration-300">
            Personal Details
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`input ${
                nameInputTouched && !state.personal.fullName.trim()
                  ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                  : ""
              } transition-colors duration-300`}
              value={state.personal.fullName}
              onChange={(e) => updatePersonal("fullName", e.target.value)}
              onBlur={() => setNameInputTouched(true)} // mark as touched on blur
            />
            {nameInputTouched && !state.personal?.fullName.trim() && (
              <p className="text-red-500 text-xs mt-1">Full Name is required</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Email address"
              className={`input ${
                emailError
                  ? "border-red-300 dark:border-red-600 focus:ring-red-500"
                  : ""
              } transition-colors duration-300`}
              value={state.personal.email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Job title"
              className="input transition-colors duration-300"
              value={state.personal.jobTitle}
              onChange={(e) => updatePersonal("jobTitle", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Short Summary
            </label>
            <textarea
              placeholder="Summary of your professional background..."
              className="input min-h-[100px] resize-y transition-colors duration-300"
              value={state.personal.summary}
              onChange={(e) => updatePersonal("summary", e.target.value)}
            />
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">
              Experience
            </h3>
            <button
              onClick={addExperience}
              className="btn text-sm py-1.5 px-3 transition-colors duration-300"
            >
              + Add Experience
            </button>
          </div>

          {state.experience.map((exp, index) => (
            <div
              key={index}
              className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-md font-medium text-gray-700 dark:text-gray-200 transition-colors duration-300">
                  Experience #{index + 1}
                </h4>
                <button
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm flex items-center gap-1 transition-colors duration-300"
                >
                  <FiX /> Remove
                </button>
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Company name."
                  className="input transition-colors duration-300"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Role
                </label>
                <input
                  type="text"
                  placeholder="Enter your role"
                  className="input transition-colors duration-300"
                  value={exp.role}
                  onChange={(e) =>
                    updateExperience(index, "role", e.target.value)
                  }
                />
              </div>

              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Duration
                </label>
                <input
                  type="text"
                  placeholder="Jan 2020 - Present"
                  className="input transition-colors duration-300"
                  value={exp.duration}
                  onChange={(e) =>
                    updateExperience(index, "duration", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
                  Description
                </label>
                <textarea
                  placeholder="Describe your responsibilities and achievements..."
                  className="input min-h-[80px] resize-y transition-colors duration-300"
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {state.experience.length === 0 && (
            <p className="text-gray-400 dark:text-gray-500 text-sm italic transition-colors duration-300">
              No experience added yet. Click "Add Experience" to get started.
            </p>
          )}
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 transition-colors duration-300">
            Skills
          </h3>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Type a skill and press Enter"
              className="input transition-colors duration-300"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleSkillKeyDown}
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-300">
              Press Enter to add a skill
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {state.skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm transition-colors duration-300"
              >
                {skill}
                <button
                  onClick={() => removeSkill(index)}
                  className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors duration-300"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          {state.skills.length === 0 && (
            <p className="text-gray-400 dark:text-gray-500 text-sm italic mt-2 transition-colors duration-300">
              No skills added yet. Type a skill and press Enter.
            </p>
          )}
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 transition-colors duration-300">
            Education
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Institution Name
            </label>
            <input
              type="text"
              placeholder="University Name"
              className="input transition-colors duration-300"
              value={state.education.institution}
              onChange={(e) => updateEducation("institution", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Degree
            </label>
            <input
              type="text"
              placeholder="Enter your degree"
              className="input transition-colors duration-300"
              value={state.education.degree}
              onChange={(e) => updateEducation("degree", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors duration-300">
              Graduation Year
            </label>
            <input
              type="text"
              placeholder="2020"
              className="input transition-colors duration-300"
              value={state.education.graduationYear}
              onChange={(e) =>
                updateEducation("graduationYear", e.target.value)
              }
            />
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
          <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 transition-colors duration-300">
            Layout
          </h3>

          <div className="flex gap-4">
            <button
              onClick={() => toggleLayout("classic")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors duration-300 ${
                state.layout === "classic"
                  ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => toggleLayout("modern")}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors duration-300 ${
                state.layout === "modern"
                  ? "border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold"
                  : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              }`}
            >
              Modern
            </button>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-300">
          <button
            onClick={handleExportPDF}
            disabled={isExportDisabled}
            className={`w-full btn flex items-center justify-center gap-2 transition-colors duration-300 ${
              isExportDisabled
                ? "bg-gray-400 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-600"
                : ""
            }`}
          >
            <FiDownload />
            Export as PDF
          </button>
          {isExportDisabled && (
            <p className="text-red-500 dark:text-red-400 text-xs mt-2 text-center transition-colors duration-300">
              Please enter your Full Name to export PDF
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
