import { TextProvider } from './context/TextContext';
import { Header } from './components/header/Header';
import { TextAnalyzer } from './components/text-input/TextAnalyzer';
import { TextMetrics } from './components/text-stats/TextMetrics';
import { LetterFrequency } from './components/text-stats/LetterFrequency';

function App() {
  return (
    <>
      <Header />
      <TextProvider>
        <main className="flex flex-col items-center justify-start gap-6 pb-8 md:w-full md:max-w-4-half-xl">
          <h1 className="pt-10 px-4 pb-3 text-4xxl font-bold text-center tracking-tight text-dark-black dark:text-antiflash-white md:max-w-xl md:px-8 md:text-6xxl">
            Analyze your text in real-time.
          </h1>
          <TextAnalyzer />
          <TextMetrics />
          <LetterFrequency />
        </main>
      </TextProvider>
    </>
  );
}

export default App;
