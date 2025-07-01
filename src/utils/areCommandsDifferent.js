const areChoicesDifferent = (existingChoices = [], localChoices = []) => {
  if (existingChoices.length !== localChoices.length) return true;

  const existingChoicesMap = new Map(
    existingChoices.map((choice) => [choice.name, choice.value])
  );
  for (const localChoice of localChoices) {
    if (existingChoicesMap.get(localChoice.name) !== localChoice.value) {
      return true;
    }
  }
  return false;
};

const areOptionsDifferent = (existingOptions = [], localOptions = []) => {
  if (existingOptions.length !== localOptions.length) return true;

  const existingOptionsMap = new Map(
    existingOptions.map((option) => [option.name, option])
  );
  for (const localOption of localOptions) {
    const existingOption = existingOptionsMap.get(localOption.name);
    if (!existingOption) return true;

    if (
      localOption.description !== existingOption.description ||
      localOption.type !== existingOption.type ||
      (localOption.required || false) !== existingOption.required ||
      (localOption.choices?.length || 0) !==
        (existingOption.choices?.length || 0) ||
      areChoicesDifferent(localOption.choices, existingOption.choices)
    ) {
      return true;
    }
  }
  return false;
};

module.exports = (existingCommand, localCommand) => {
  if (
    existingCommand.description !== localCommand.description ||
    areOptionsDifferent(existingCommand.options, localCommand.options)
  ) {
    return true;
  }

  return false;
};
