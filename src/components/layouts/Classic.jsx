export default function Classic({ data }) {
  const { personal, experience, skills, education } = data;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white min-h-full font-serif">
      <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
        {personal.fullName && (
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {personal.fullName}
          </h1>
        )}
        {personal.jobTitle && (
          <p className="text-xl text-gray-700 italic mb-2">
            {personal.jobTitle}
          </p>
        )}
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          {personal.email && <span>{personal.email}</span>}
        </div>
      </div>

      {personal.summary && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{personal.summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="mb-2">
                  {exp.role && (
                    <h3 className="text-xl font-semibold text-gray-900">
                      {exp.role}
                    </h3>
                  )}
                  {exp.company && (
                    <p className="text-lg text-gray-700 italic">
                      {exp.company}
                    </p>
                  )}
                  {exp.duration && (
                    <p className="text-sm text-gray-600">{exp.duration}</p>
                  )}
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

      {skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {(education.institution ||
        education.degree ||
        education.graduationYear) && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-1">
            Education
          </h2>
          <div>
            {education.degree && (
              <h3 className="text-xl font-semibold text-gray-900">
                {education.degree}
              </h3>
            )}
            {education.institution && (
              <p className="text-lg text-gray-700 italic">
                {education.institution}
              </p>
            )}
            {education.graduationYear && (
              <p className="text-sm text-gray-600">
                {education.graduationYear}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
