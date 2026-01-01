import ControlPanel from "./components/ControlPanel";
import Preview from "./components/Preview";
import { ResumeProvider } from "./context/resumeReducer";
import { DarkModeProvider } from "./context/DarkMode";

export default function App() {
  return (
    <DarkModeProvider>
      <ResumeProvider>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-screen lg:overflow-hidden bg-gray-100 dark:bg-gray-900">
          <ControlPanel />
          <div className="border-l border-gray-300 dark:border-gray-700">
            <Preview />
          </div>
        </div>
      </ResumeProvider>
    </DarkModeProvider>
  );
}
