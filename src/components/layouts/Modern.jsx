export default function Modern({ data }) {
  const { personal, experience, skills, education } = data;

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white min-h-full font-sans">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 bg-blue-50 p-6 rounded-lg">
          <div className="mb-6 pb-4 border-b border-blue-200">
            {personal.fullName && (
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {personal.fullName}
              </h1>
            )}
            {personal.jobTitle && (
              <p className="text-lg text-gray-700 font-medium">
                {personal.jobTitle}
              </p>
            )}
          </div>

          {personal.email && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-2">
                Contact
              </h3>
              <p className="text-sm text-gray-700">{personal.email}</p>
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">
                Skills
              </h3>
              <div className="flex flex-col gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(education.institution ||
            education.degree ||
            education.graduationYear) && (
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">
                Education
              </h3>
              <div className="space-y-1">
                {education.degree && (
                  <p className="text-sm font-semibold text-gray-900">
                    {education.degree}
                  </p>
                )}
                {education.institution && (
                  <p className="text-sm text-gray-700">
                    {education.institution}
                  </p>
                )}
                {education.graduationYear && (
                  <p className="text-xs text-gray-600">
                    {education.graduationYear}
                  </p>
                )}
              </div>
            </div>
          )}
        </aside>

        <main className="md:col-span-2">
          {personal.summary && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-blue-600 pb-2">
                Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {personal.summary}
              </p>
            </section>
          )}

          {experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">
                Experience
              </h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index} className="mb-6">
                    <div className="mb-2">
                      {exp.role && (
                        <h3 className="text-xl font-bold text-gray-900">
                          {exp.role}
                        </h3>
                      )}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 mb-1">
                        {exp.company && (
                          <span className="text-lg text-blue-600 font-semibold">
                            {exp.company}
                          </span>
                        )}
                        {exp.duration && (
                          <span className="text-sm text-gray-500">
                            {exp.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    {exp.description && (
                      <p className="text-gray-700 leading-relaxed mt-2 whitespace-pre-line">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
