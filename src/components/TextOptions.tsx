const TextOptions = () => {
  return (
    <div>
      <fieldset>
        <div>
          <input type="checkbox" name="spaces" id="spaces" />
          <label htmlFor="spaces">Exclude Spaces</label>
        </div>
        <div>
          <input type="checkbox" name="char-limit" id="char-limit" />
          <label htmlFor="char-limit">Set Character Limit</label>
          <div>
            <label htmlFor="char-limit-amount" />
            <input type="number" name="char-limit-amount" id="char-limit-amount" />
          </div>
        </div>
      </fieldset>
      <span>Approx. reading time: &gt; 1 min</span>
    </div>
  );
};

export { TextOptions };
