const TextAnalyzer = () => {
  return (
    <>
      <div className="w-full px-4 py-3 md:px-8">
        <form>
          <label htmlFor="text-analyzer" />
          <textarea
            id="text-analyzer"
            maxLength={300}
            name="text-analyzer"
            placeholder="Start typing here... (or paste your text)"
            className="w-full min-h-50 p-5 text-xl text-gunmetal dark:text-bright-gray tracking-tight placeholder:tracking-tight rounded-xl border-2 border-bright-gray dark:border-dark-gunmetal bg-antiflash-white dark:bg-gunmetal placeholder:text-gunmetal dark:placeholder:text-bright-gray"
          ></textarea>
        </form>
        <div></div>
      </div>
    </>
  );
};

export { TextAnalyzer };
