import { useResume } from "../context/resumeContext";
import Classic from "./layouts/ClassicView";
import Modern from "./layouts/ModernView";

export default function Preview() {
  const { state } = useResume();
  const { personal, experience, skills, education } = state;

  const hasData =
    personal.fullName.trim() ||
    personal.email.trim() ||
    personal.jobTitle.trim() ||
    personal.summary.trim() ||
    experience.length > 0 ||
    skills.length > 0 ||
    education.institution.trim() ||
    education.degree.trim() ||
    education.graduationYear.trim();

  return (
    <div className="bg-gray-100 min-h-screen lg:h-screen lg:overflow-y-auto">
      <div
        id="resume-preview"
        className={`min-h-screen ${
          !hasData ? "flex items-center justify-center" : ""
        }`}
      >
        {!hasData ? (
          <div className="flex flex-col items-center text-center gap-4 animate-fadeIn px-6">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                />
              </svg>
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              Your Resume Will Appear Here
            </h2>

            <p className="text-gray-400 max-w-sm">
              Start typing to see your resume
            </p>
          </div>
        ) : state.layout === "classic" ? (
          <Classic data={state} />
        ) : (
          <Modern data={state} />
        )}
      </div>
    </div>
  );
}
